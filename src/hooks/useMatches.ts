
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserMatch {
  id: string;
  user: {
    id: string;
    full_name: string;
    age: number;
    location: string;
    profession: string;
    photos: string[];
    verified: boolean;
  };
  matchedAt: string;
  lastMessageAt?: string;
  lastMessage?: string;
  status: string;
}

export const useMatches = () => {
  const [matches, setMatches] = useState<UserMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const channelRef = useRef<any>(null);

  const fetchMatches = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          id,
          matched_at,
          last_message_at,
          status,
          user1_id,
          user2_id
        `)
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .eq('status', 'active')
        .order('matched_at', { ascending: false });

      if (error) throw error;

      // Get the other user's profile for each match
      const matchesWithProfiles = await Promise.all(
        (data || []).map(async (match) => {
          const otherUserId = match.user1_id === user.id ? match.user2_id : match.user1_id;
          
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, full_name, age, location, profession, photos, verified')
            .eq('id', otherUserId)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            return null;
          }

          // Get last message if exists
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('content, created_at')
            .eq('match_id', match.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          return {
            id: match.id,
            user: profile,
            matchedAt: match.matched_at,
            lastMessageAt: lastMessage?.created_at || match.last_message_at,
            lastMessage: lastMessage?.content,
            status: match.status
          };
        })
      );

      setMatches(matchesWithProfiles.filter(Boolean) as UserMatch[]);
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();

    if (!user) return;

    // Clean up any existing channel first
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    // Set up real-time subscription for match updates with unique channel name
    const channelName = `matches-updates-${user.id}-${Date.now()}`;
    channelRef.current = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'matches'
        },
        (payload) => {
          const newMatch = payload.new;
          const isUserInvolved = newMatch.user1_id === user.id || newMatch.user2_id === user.id;
          
          if (isUserInvolved) {
            // Refetch matches to include the new one
            fetchMatches();
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'matches'
        },
        (payload) => {
          const updatedMatch = payload.new;
          const isUserInvolved = updatedMatch.user1_id === user.id || updatedMatch.user2_id === user.id;
          
          if (isUserInvolved) {
            fetchMatches();
          }
        }
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [user]);

  return {
    matches,
    loading,
    error,
    refetch: fetchMatches
  };
};
