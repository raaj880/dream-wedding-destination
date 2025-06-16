
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useMutualMatch = (targetUserId?: string) => {
  const [isMutualMatch, setIsMutualMatch] = useState(false);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !targetUserId || user.id === targetUserId) {
      setIsMutualMatch(false);
      setMatchId(null);
      return;
    }

    const checkMutualMatch = async () => {
      setLoading(true);
      try {
        // Check if mutual match exists using the database function
        const { data: mutualMatch, error: mutualError } = await supabase
          .rpc('check_mutual_match', {
            user1_uuid: user.id,
            user2_uuid: targetUserId
          });

        if (mutualError) {
          console.error('Error checking mutual match:', mutualError);
          setIsMutualMatch(false);
          setMatchId(null);
          return;
        }

        setIsMutualMatch(mutualMatch || false);

        // If it's a mutual match, get the match ID
        if (mutualMatch) {
          const { data: matchIdData, error: matchIdError } = await supabase
            .rpc('get_match_id', {
              user1_uuid: user.id,
              user2_uuid: targetUserId
            });

          if (matchIdError) {
            console.error('Error getting match ID:', matchIdError);
            setMatchId(null);
          } else {
            setMatchId(matchIdData);
          }
        } else {
          setMatchId(null);
        }
      } catch (error) {
        console.error('Error in mutual match check:', error);
        setIsMutualMatch(false);
        setMatchId(null);
      } finally {
        setLoading(false);
      }
    };

    checkMutualMatch();
  }, [user, targetUserId]);

  return {
    isMutualMatch,
    matchId,
    loading
  };
};
