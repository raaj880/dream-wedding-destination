
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { type ChatMessage } from '@/types/chat';
import { type UserProfile } from '@/types/match';

const fetchMatchParticipant = async (matchId: string, currentUserId: string) => {
  const { data: match, error: matchError } = await supabase
    .from('matches')
    .select('user1_id, user2_id')
    .eq('id', matchId)
    .single();

  if (matchError) throw new Error(matchError.message);
  if (!match) throw new Error('Match not found');

  const otherUserId = match.user1_id === currentUserId ? match.user2_id : match.user1_id;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', otherUserId)
    .single();
  
  if (profileError) throw new Error(profileError.message);
  
  // This is a rough mapping. You might need to adjust based on the exact structure of your UserProfile type.
  return {
      id: profile.id,
      fullName: profile.full_name,
      age: profile.age,
      photos: profile.photos,
      isOnline: profile.is_online,
      lastSeen: profile.last_seen ? new Date(profile.last_seen) : new Date(),
      // These fields might not exist on the profile table and are given default values.
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
        receiverId: '', // The DB schema doesn't have a receiver_id, which the ChatMessage type expects.
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

export const useChat = (matchId: string) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: participant, isLoading: isLoadingParticipant } = useQuery({
        queryKey: ['chatParticipant', matchId],
        queryFn: () => fetchMatchParticipant(matchId, user!.id),
        enabled: !!user,
    });

    const { data: messages, isLoading: isLoadingMessages } = useQuery({
        queryKey: ['messages', matchId],
        queryFn: () => fetchMessages(matchId),
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
                    const newMessage = {
                        id: payload.new.id,
                        chatId: payload.new.match_id,
                        senderId: payload.new.sender_id,
                        receiverId: '',
                        content: payload.new.content,
                        type: payload.new.message_type as 'text' | 'image' | 'system',
                        timestamp: new Date(payload.new.created_at),
                        status: payload.new.read_at ? 'read' : 'delivered',
                    };
                    queryClient.setQueryData(['messages', matchId], (oldData: any) => {
                        return oldData ? [...oldData, newMessage] : [newMessage];
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
        isLoading: isLoadingParticipant || isLoadingMessages,
        sendMessage: (content: string) => {
            if (!user) return;
            mutation.mutate({ matchId, content, senderId: user.id });
        },
    };
};
