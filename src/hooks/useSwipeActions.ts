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
    
    if (import.meta.env.DEV) {
      console.log('Recording interaction:', action);
    }
    
    setLoading(true);
    try {
      // Record the interaction using the original action
      const { data: interactionData, error: interactionError } = await supabase
        .from('user_interactions')
        .upsert({
          user_id: user.id,
          target_user_id: targetUserId,
          interaction_type: action
        })
        .select()
        .single();

      if (interactionError) {
        console.error('Error recording interaction:', interactionError.message);
        throw interactionError;
      }

      if (import.meta.env.DEV) {
        console.log('Interaction recorded successfully');
      }

      // Check for mutual like to create a match
      if (action === 'like' || action === 'superlike') {
        if (import.meta.env.DEV) {
          console.log('Checking for mutual like...');
        }
        
        const { data: mutualInteractions, error: checkError } = await supabase
          .from('user_interactions')
          .select('id')
          .eq('user_id', targetUserId)
          .eq('target_user_id', user.id)
          .in('interaction_type', ['like', 'superlike']);

        if (checkError) {
          console.error('Error checking mutual like:', checkError.message);
          throw checkError;
        }

        if (import.meta.env.DEV) {
          console.log('Mutual like check completed');
        }

        // If a mutual like or superlike exists, create a match
        if (mutualInteractions && mutualInteractions.length > 0) {
          if (import.meta.env.DEV) {
            console.log('Creating match...');
          }
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
            // It's possible the match already exists, which would violate the unique constraint.
            // We can ignore this specific error and assume the match is there.
            if (matchError.code !== '23505') { // 23505 is unique_violation
                 console.error('Error creating match:', matchError.message);
                 throw matchError;
            } else if (import.meta.env.DEV) {
                 console.log('Match already exists');
            }
          }

          if (import.meta.env.DEV) {
            console.log('Match created successfully');
          }
          // Even if match existed, we return true.
          return { isMatch: true, matchId: match?.id };
        } else if (import.meta.env.DEV) {
          console.log('No mutual like found yet');
        }
      }

      return { isMatch: false };
    } catch (error) {
      console.error('❌ Error in swipe action:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getSwipedUserIds = async (): Promise<string[]> => {
    if (!user) return [];

    try {
      if (import.meta.env.DEV) {
        console.log('Fetching swiped user IDs');
      }
      
      const { data, error } = await supabase
        .from('user_interactions')
        .select('target_user_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching swiped users:', error.message);
        return [];
      }

      const swipedIds = data.map(interaction => interaction.target_user_id);
      if (import.meta.env.DEV) {
        console.log('Fetched', swipedIds.length, 'swiped users');
      }
      
      return swipedIds;
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
