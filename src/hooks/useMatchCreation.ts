
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useMatchCreation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useAuth();

  const createMatch = async (targetUserId: string) => {
    if (!user || user.id === targetUserId) {
      throw new Error('Invalid user or target user');
    }

    setIsCreating(true);
    try {
      // First check if match already exists
      const { data: existingMatch } = await supabase
        .from('matches')
        .select('id')
        .or(`and(user1_id.eq.${user.id},user2_id.eq.${targetUserId}),and(user1_id.eq.${targetUserId},user2_id.eq.${user.id})`)
        .eq('status', 'active')
        .maybeSingle();

      if (existingMatch) {
        return existingMatch.id;
      }

      // Create new match
      const { data: newMatch, error } = await supabase
        .from('matches')
        .insert({
          user1_id: user.id,
          user2_id: targetUserId,
          status: 'active',
          matched_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (error) {
        throw error;
      }

      return newMatch.id;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createMatch,
    isCreating
  };
};
