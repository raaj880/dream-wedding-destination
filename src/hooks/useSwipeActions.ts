
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface SwipeResult {
  isMatch: boolean;
  matchId?: string;
}

export const useSwipeActions = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const recordInteraction = async (
    targetUserId: string, 
    action: 'like' | 'pass' | 'superlike' | 'block'
  ): Promise<SwipeResult> => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      // Record the interaction
      const { error: interactionError } = await supabase
        .from('user_interactions')
        .upsert({
          user_id: user.id,
          target_user_id: targetUserId,
          interaction_type: action
        });

      if (interactionError) {
        console.error('Error recording interaction:', interactionError);
        throw interactionError;
      }

      // Check for mutual like to create a match
      if (action === 'like' || action === 'superlike') {
        const { data: mutualLike, error: checkError } = await supabase
          .from('user_interactions')
          .select('*')
          .eq('user_id', targetUserId)
          .eq('target_user_id', user.id)
          .in('interaction_type', ['like', 'superlike'])
          .maybeSingle();

        if (checkError) {
          console.error('Error checking mutual like:', checkError);
          throw checkError;
        }

        // If mutual like exists, create a match
        if (mutualLike) {
          const user1Id = user.id < targetUserId ? user.id : targetUserId;
          const user2Id = user.id < targetUserId ? targetUserId : user.id;

          const { data: match, error: matchError } = await supabase
            .from('matches')
            .insert({
              user1_id: user1Id,
              user2_id: user2Id
            })
            .select()
            .single();

          if (matchError) {
            console.error('Error creating match:', matchError);
            throw matchError;
          }

          return { isMatch: true, matchId: match.id };
        }
      }

      return { isMatch: false };
    } catch (error) {
      console.error('Error in swipe action:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getSwipedUserIds = async (): Promise<string[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('user_interactions')
        .select('target_user_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching swiped users:', error);
        return [];
      }

      return data.map(interaction => interaction.target_user_id);
    } catch (error) {
      console.error('Error getting swiped user IDs:', error);
      return [];
    }
  };

  return {
    recordInteraction,
    getSwipedUserIds,
    loading
  };
};
