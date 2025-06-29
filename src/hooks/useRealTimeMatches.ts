import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface RealTimeMatch {
  id: string;
  matchedUserId: string;
  matchedUserName: string;
  matchedUserPhoto: string;
  matchedAt: string;
}

export const useRealTimeMatches = () => {
  const [newMatches, setNewMatches] = useState<RealTimeMatch[]>([]);
  const [isListening, setIsListening] = useState(false);
  const { user } = useAuth();
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!user) {
      setIsListening(false);
      return;
    }

    setIsListening(true);

    // Clean up any existing channel first
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    // Create new channel with a unique identifier
    const channelName = `realtime-matches-${user.id}-${Date.now()}`;
    channelRef.current = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'matches'
        },
        async (payload) => {
          console.log('New match detected:', payload);
          
          // Check if this match involves the current user
          const newMatch = payload.new;
          const isUserInvolved = newMatch.user1_id === user.id || newMatch.user2_id === user.id;
          
          if (isUserInvolved) {
            // Get the other user's profile
            const otherUserId = newMatch.user1_id === user.id ? newMatch.user2_id : newMatch.user1_id;
            
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('full_name, photos')
              .eq('id', otherUserId)
              .single();

            if (!error && profile) {
              const matchData: RealTimeMatch = {
                id: newMatch.id,
                matchedUserId: otherUserId,
                matchedUserName: profile.full_name || 'Someone',
                matchedUserPhoto: profile.photos?.[0] || '',
                matchedAt: newMatch.matched_at
              };

              setNewMatches(prev => [...prev, matchData]);

              // Trigger browser notification if permission granted
              if (Notification.permission === 'granted') {
                new Notification('New Match!', {
                  body: `You and ${profile.full_name} liked each other!`,
                  icon: profile.photos?.[0] || '/placeholder.svg'
                });
              }
            }
          }
        }
      )
      .subscribe();

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      setIsListening(false);
    };
  }, [user]);

  const clearNewMatches = () => {
    setNewMatches([]);
  };

  const removeNewMatch = (matchId: string) => {
    setNewMatches(prev => prev.filter(match => match.id !== matchId));
  };

  return {
    newMatches,
    isListening,
    clearNewMatches,
    removeNewMatch
  };
};
