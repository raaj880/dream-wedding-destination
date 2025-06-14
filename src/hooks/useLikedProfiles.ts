
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

      // First get the user interactions
      const { data: interactions, error: interactionsError } = await supabase
        .from('user_interactions')
        .select('target_user_id, interaction_type, created_at')
        .eq('user_id', user.id)
        .in('interaction_type', ['like', 'superlike'])
        .order('created_at', { ascending: false });

      if (interactionsError) {
        console.error('❌ Error fetching interactions:', interactionsError);
        throw interactionsError;
      }

      console.log('✅ Raw interactions data:', interactions);

      if (!interactions || interactions.length === 0) {
        return [];
      }

      // Get the target user IDs
      const targetUserIds = interactions.map(interaction => interaction.target_user_id);

      // Fetch the profiles for these users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, age, location, photos, profession')
        .in('id', targetUserIds);

      if (profilesError) {
        console.error('❌ Error fetching profiles:', profilesError);
        throw profilesError;
      }

      console.log('✅ Profiles data:', profiles);

      // Combine the interaction data with profile data
      const likedProfiles: LikedProfile[] = interactions
        .map(interaction => {
          const profile = profiles?.find(p => p.id === interaction.target_user_id);
          if (!profile) return null;

          return {
            id: profile.id,
            full_name: profile.full_name || 'Unknown',
            age: profile.age || 0,
            location: profile.location || 'Location not specified',
            photos: profile.photos || [],
            profession: profile.profession,
            interaction_type: interaction.interaction_type,
            created_at: interaction.created_at
          };
        })
        .filter((profile): profile is LikedProfile => profile !== null);

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
