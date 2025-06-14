
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface PotentialMatch {
  id: string;
  full_name: string;
  age: number;
  location: string;
  profession: string;
  religion: string;
  bio: string;
  photos: string[];
  verified: boolean;
}

export const usePotentialMatches = () => {
  const [matches, setMatches] = useState<PotentialMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPotentialMatches = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Get users that the current user hasn't swiped on yet
      const { data: swipedUsers, error: swipedError } = await supabase
        .from('user_interactions')
        .select('target_user_id')
        .eq('user_id', user.id);

      if (swipedError) throw swipedError;

      const swipedUserIds = swipedUsers?.map(s => s.target_user_id) || [];
      
      // Fetch potential matches excluding current user and already swiped users
      let query = supabase
        .from('profiles')
        .select('id, full_name, age, location, profession, religion, bio, photos, verified')
        .neq('id', user.id)
        .not('full_name', 'is', null)
        .not('age', 'is', null)
        .not('bio', 'is', null);

      if (swipedUserIds.length > 0) {
        query = query.not('id', 'in', `(${swipedUserIds.join(',')})`);
      }

      const { data, error } = await query.limit(20);

      if (error) throw error;

      setMatches(data || []);
    } catch (err) {
      console.error('Error fetching potential matches:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPotentialMatches();
  }, [user]);

  return {
    matches,
    loading,
    error,
    refetch: fetchPotentialMatches
  };
};
