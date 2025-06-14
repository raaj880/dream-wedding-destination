
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useProfileViewing = () => {
  const { user } = useAuth();

  const recordProfileView = useCallback(async (targetUserId: string) => {
    if (!user || user.id === targetUserId) {
      return; // Don't record self-views
    }

    try {
      console.log('📊 Recording profile view:', { viewer: user.id, target: targetUserId });
      
      // Check if we already recorded a view for this user today to avoid spam
      const today = new Date().toISOString().split('T')[0];
      const { data: existingView } = await supabase
        .from('user_interactions')
        .select('id')
        .eq('user_id', user.id)
        .eq('target_user_id', targetUserId)
        .eq('interaction_type', 'view')
        .gte('created_at', today)
        .limit(1)
        .maybeSingle();

      if (existingView) {
        console.log('📊 Profile view already recorded today');
        return;
      }

      // Record the profile view
      const { error } = await supabase
        .from('user_interactions')
        .insert({
          user_id: user.id,
          target_user_id: targetUserId,
          interaction_type: 'view'
        });

      if (error) {
        console.error('❌ Error recording profile view:', error);
      } else {
        console.log('✅ Profile view recorded successfully');
      }
    } catch (error) {
      console.error('❌ Error in recordProfileView:', error);
    }
  }, [user]);

  return {
    recordProfileView
  };
};
