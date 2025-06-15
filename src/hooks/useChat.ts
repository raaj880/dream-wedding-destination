
import { useState, useEffect } from 'react';
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

    // The current ChatMessage type does not match the DB. This is a temporary fix.
    // I will address this in a follow-up.
    return data.map(msg => ({
        id: msg.id,
        chatId: msg.match_id,
        senderId: msg.sender_id,
        content: msg.content,
        type: msg.message_type as 'text' | 'image' | 'system',
        timestamp: new Date(msg.created_at),
        status: msg.read_at ? 'read' : 'delivered',
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

export const useChat = (participantId: string) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: matchId, isLoading: isLoadingMatchId } = useQuery({
        queryKey: ['chatMatchId', participantId, user?.id],
        queryFn: async () => {
            if (!user) throw new Error("User not found");
            const { data, error } = await supabase
                .from('matches')
                .select('id')
                .or(`and(user1_id.eq.${user.id},user2_id.eq.${participantId}),and(user1_id.eq.${participantId},user2_id.eq.${user.id})`)
                .single();
            if (error) {
                console.error('Error fetching matchId:', error);
                throw new Error(error.message);
            }
            if (!data) {
                console.error('No match found for participantId:', participantId);
                throw new Error('Match not found');
            }
            return data.id;
        },
        enabled: !!user && !!participantId,
    });

    const { data: participant, isLoading: isLoadingParticipant } = useQuery({
        queryKey: ['chatParticipant', participantId],
        queryFn: () => fetchParticipantProfile(participantId),
        enabled: !!participantId,
    });

    const { data: messages, isLoading: isLoadingMessages } = useQuery({
        queryKey: ['messages', matchId],
        queryFn: () => fetchMessages(matchId!),
        enabled: !!matchId,
    });

    const mutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', matchId] });
        },
    });

    useEffect(() => {
        if (!matchId) return;

        const channel = supabase
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
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [matchId, queryClient]);

    return {
        participant,
        messages: messages || [],
        isLoading: isLoadingMatchId || isLoadingParticipant || isLoadingMessages,
        sendMessage: (content: string) => {
            if (!user || !matchId) return;
            mutation.mutate({ matchId, content, senderId: user.id });
        },
    };
};
