
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
  education?: string;
  community?: string;
  languages?: string[];
  height?: string;
  marry_timeframe?: string;
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
        .select(`
          id, 
          full_name, 
          age, 
          location, 
          profession, 
          religion, 
          bio, 
          photos, 
          verified,
          education,
          community,
          languages,
          height,
          marry_timeframe
        `)
        .neq('id', user.id)
        .not('full_name', 'is', null)
        .not('age', 'is', null);

      if (swipedUserIds.length > 0) {
        query = query.not('id', 'in', `(${swipedUserIds.join(',')})`);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(50); // Increased limit for better user experience

      if (error) throw error;

      // Filter out profiles with missing essential information
      const validProfiles = (data || []).filter(profile => 
        profile.full_name && 
        profile.age && 
        profile.location &&
        (profile.photos && profile.photos.length > 0)
      );

      setMatches(validProfiles);
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
