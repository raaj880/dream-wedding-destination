
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface LikedProfile {
  id: string;
  full_name: string;
  age: number;
  location: string;
  photos: string[];
  profession?: string;
  interaction_type: string;
  created_at: string;
}

export const useLikedProfiles = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getLikedProfiles = async (): Promise<LikedProfile[]> => {
    if (!user) return [];

    setLoading(true);
    try {
      console.log('🔍 Fetching liked profiles for user:', user.id);

      const { data, error } = await supabase
        .from('user_interactions')
        .select(`
          interaction_type,
          created_at,
          target_user_id,
          profiles!user_interactions_target_user_id_fkey (
            id,
            full_name,
            age,
            location,
            photos,
            profession
          )
        `)
        .eq('user_id', user.id)
        .in('interaction_type', ['like', 'superlike'])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching liked profiles:', error);
        throw error;
      }

      console.log('✅ Raw liked profiles data:', data);

      const likedProfiles: LikedProfile[] = data
        .filter(interaction => interaction.profiles)
        .map(interaction => ({
          id: interaction.profiles.id,
          full_name: interaction.profiles.full_name || 'Unknown',
          age: interaction.profiles.age || 0,
          location: interaction.profiles.location || 'Location not specified',
          photos: interaction.profiles.photos || [],
          profession: interaction.profiles.profession,
          interaction_type: interaction.interaction_type,
          created_at: interaction.created_at
        }));

      console.log('✅ Processed liked profiles:', likedProfiles);
      return likedProfiles;

    } catch (error) {
      console.error('❌ Error in getLikedProfiles:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    getLikedProfiles,
    loading
  };
};
