
import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { type ChatMessage } from '@/types/chat';
import { type UserProfile } from '@/types/match';

const fetchParticipantProfile = async (participantId: string): Promise<UserProfile> => {
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', participantId)
        .single();
    
    if (profileError) throw new Error(profileError.message);
    if (!profile) throw new Error("Participant profile not found");
    
    return {
        id: profile.id,
        fullName: profile.full_name,
        age: profile.age,
        photos: profile.photos,
        isOnline: profile.is_online,
        lastSeen: profile.last_seen ? new Date(profile.last_seen) : new Date(),
        location: profile.location || 'Unknown',
        profession: profile.profession || 'Unknown',
        religion: profile.religion || 'Unknown',
        verified: profile.verified || false,
        bio: profile.bio || '',
    } as UserProfile;
};

const fetchMessages = async (matchId: string): Promise<ChatMessage[]> => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('match_id', matchId)
        .order('created_at', { ascending: true });

    if (error) throw new Error(error.message);

    return data.map(msg => ({
        id: msg.id,
        chatId: msg.match_id,
        senderId: msg.sender_id,
        content: msg.content,
        type: msg.message_type as 'text' | 'image' | 'system',
        timestamp: new Date(msg.created_at),
        status: msg.read_at ? 'read' : 'delivered',
        readAt: msg.read_at ? new Date(msg.read_at) : undefined,
    }));
};

const sendMessage = async ({ matchId, content, senderId }: { matchId: string; content: string; senderId: string }) => {
    const { data, error } = await supabase
        .from('messages')
        .insert({
            match_id: matchId,
            content,
            sender_id: senderId,
            message_type: 'text',
        });

    if (error) throw new Error(error.message);
    return data;
};

const validateMatchAccess = async (matchId: string, userId: string): Promise<{ participant: UserProfile }> => {
    // First verify the user has access to this match
    const { data: match, error: matchError } = await supabase
        .from('matches')
        .select('user1_id, user2_id, status')
        .eq('id', matchId)
        .eq('status', 'active')
        .single();

    if (matchError || !match) {
        throw new Error('Match not found or access denied');
    }

    // Verify current user is part of this match
    if (match.user1_id !== userId && match.user2_id !== userId) {
        throw new Error('Access denied - not part of this match');
    }

    // Get the other participant's ID
    const participantId = match.user1_id === userId ? match.user2_id : match.user1_id;
    
    // Fetch participant profile
    const participant = await fetchParticipantProfile(participantId);
    
    return { participant };
};

export const useChat = (matchId: string) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isTyping, setIsTyping] = useState(false);
    const [isUserTyping, setIsUserTyping] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout>();
    const userTypingTimeoutRef = useRef<NodeJS.Timeout>();

    const { data: matchData, isLoading: isLoadingMatch, error: matchError } = useQuery({
        queryKey: ['chatAccess', matchId, user?.id],
        queryFn: async () => {
            if (!user) throw new Error("User not authenticated");
            return validateMatchAccess(matchId, user.id);
        },
        enabled: !!user && !!matchId,
    });

    const { data: messages, isLoading: isLoadingMessages } = useQuery({
        queryKey: ['messages', matchId],
        queryFn: () => fetchMessages(matchId),
        enabled: !!matchId && !!matchData,
    });

    const mutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', matchId] });
        },
    });

    // Mark messages as read
    const markMessagesAsRead = async (messageIds: string[]) => {
        if (!messageIds.length || !user) return;
        
        try {
            await supabase.rpc('mark_messages_as_read', {
                p_match_id: matchId,
                p_message_ids: messageIds
            });
            
            // Invalidate queries to refresh read status
            queryClient.invalidateQueries({ queryKey: ['messages', matchId] });
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    // Send typing indicator
    const sendTypingIndicator = (typing: boolean) => {
        if (!user || !matchData) return;
        
        const channel = supabase.channel(`typing-notifications:${matchId}`);
        channel.send({
            type: 'broadcast',
            event: 'typing',
            payload: {
                userId: user.id,
                isTyping: typing,
                timestamp: new Date().toISOString()
            }
        });
    };

    // Handle user typing
    const handleUserTyping = () => {
        if (!isUserTyping) {
            setIsUserTyping(true);
            sendTypingIndicator(true);
        }

        // Clear existing timeout
        if (userTypingTimeoutRef.current) {
            clearTimeout(userTypingTimeoutRef.current);
        }

        // Set timeout to stop typing indicator
        userTypingTimeoutRef.current = setTimeout(() => {
            setIsUserTyping(false);
            sendTypingIndicator(false);
        }, 2000);
    };

    useEffect(() => {
        if (!matchId || !matchData || !user) return;

        // Set up message channel for real-time updates
        const messageChannel = supabase
            .channel(`chat:${matchId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `match_id=eq.${matchId}`,
                },
                (payload) => {
                    const newMessage: ChatMessage = {
                        id: payload.new.id,
                        chatId: payload.new.match_id,
                        senderId: payload.new.sender_id,
                        content: payload.new.content,
                        type: payload.new.message_type as 'text' | 'image' | 'system',
                        timestamp: new Date(payload.new.created_at),
                        status: payload.new.read_at ? 'read' : 'delivered',
                        readAt: payload.new.read_at ? new Date(payload.new.read_at) : undefined,
                    };
                    
                    queryClient.setQueryData(['messages', matchId], (oldData: ChatMessage[] | undefined) => {
                        if (oldData) {
                            if (oldData.some(msg => msg.id === newMessage.id)) {
                                return oldData;
                            }
                            return [...oldData, newMessage];
                        }
                        return [newMessage];
                    });
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'messages',
                    filter: `match_id=eq.${matchId}`,
                },
                (payload) => {
                    queryClient.setQueryData(['messages', matchId], (oldData: ChatMessage[] | undefined) => {
                        if (!oldData) return oldData;
                        
                        return oldData.map(msg => {
                            if (msg.id === payload.new.id) {
                                return {
                                    ...msg,
                                    status: payload.new.read_at ? 'read' : 'delivered',
                                    readAt: payload.new.read_at ? new Date(payload.new.read_at) : undefined,
                                };
                            }
                            return msg;
                        });
                    });
                }
            )
            .subscribe();

        // Set up typing indicator channel
        const typingChannel = supabase
            .channel(`typing-notifications:${matchId}`)
            .on(
                'broadcast', 
                { event: 'typing' }, 
                (payload) => {
                    const { userId, isTyping: typing } = payload.payload;
                    
                    // Only show typing indicator for the other user
                    if (userId !== user.id) {
                        setIsTyping(typing);
                        
                        // Clear existing timeout
                        if (typingTimeoutRef.current) {
                            clearTimeout(typingTimeoutRef.current);
                        }
                        
                        // Auto-hide typing indicator after 3 seconds
                        if (typing) {
                            typingTimeoutRef.current = setTimeout(() => {
                                setIsTyping(false);
                            }, 3000);
                        }
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(messageChannel);
            supabase.removeChannel(typingChannel);
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            if (userTypingTimeoutRef.current) {
                clearTimeout(userTypingTimeoutRef.current);
            }
        };
    }, [matchId, queryClient, matchData, user]);

    // Mark unread messages as read when messages are loaded
    useEffect(() => {
        if (!messages || !user) return;
        
        const unreadMessages = messages.filter(
            msg => msg.senderId !== user.id && !msg.readAt
        );
        
        if (unreadMessages.length > 0) {
            const messageIds = unreadMessages.map(msg => msg.id);
            markMessagesAsRead(messageIds);
        }
    }, [messages, user]);

    // If there's a match error, show appropriate error
    if (matchError) {
        return {
            participant: null,
            messages: [],
            isLoading: false,
            error: matchError.message,
            isTyping: false,
            sendMessage: () => {},
            handleUserTyping: () => {},
        };
    }

    return {
        participant: matchData?.participant || null,
        messages: messages || [],
        isLoading: isLoadingMatch || isLoadingMessages,
        error: null,
        isTyping,
        sendMessage: (content: string) => {
            if (!user || !matchId) return;
            mutation.mutate({ matchId, content, senderId: user.id });
        },
        handleUserTyping,
    };
};
