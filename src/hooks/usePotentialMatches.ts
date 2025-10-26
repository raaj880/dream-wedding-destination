
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
  gender?: string;
}

export const usePotentialMatches = () => {
  const [matches, setMatches] = useState<PotentialMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPotentialMatches = async () => {
    if (!user) {
      console.log('❌ No user found for fetching potential matches');
      return;
    }

    console.log('🔍 Starting to fetch potential matches for user:', user.id);
    setLoading(true);
    setError(null);

    try {
      // First, get the current user's profile to understand their gender
      console.log('👤 Fetching current user profile...');
      const { data: currentUserProfile, error: profileError } = await supabase
        .from('profiles')
        .select('gender')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('❌ Error fetching current user profile:', profileError);
        throw profileError;
      }

      console.log('✅ Current user profile:', currentUserProfile);

      // Get users that the current user hasn't swiped on yet
      console.log('📋 Fetching already swiped users...');
      const { data: swipedUsers, error: swipedError } = await supabase
        .from('user_interactions')
        .select('target_user_id')
        .eq('user_id', user.id);

      if (swipedError) {
        console.error('❌ Error fetching swiped users:', swipedError);
        throw swipedError;
      }

      const swipedUserIds = swipedUsers?.map(s => s.target_user_id) || [];
      console.log('📝 Already swiped user IDs:', swipedUserIds);
      
      // Build the query
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
          marry_timeframe,
          gender
        `)
        .neq('id', user.id); // Exclude current user

      // Add gender filtering if current user has a gender set
      if (currentUserProfile?.gender) {
        const oppositeGender = currentUserProfile.gender === 'male' ? 'female' : 'male';
        console.log(`🎯 Filtering for ${oppositeGender} profiles (current user is ${currentUserProfile.gender})`);
        query = query.eq('gender', oppositeGender);
      } else {
        console.log('⚠️ Current user gender not set, showing all profiles');
      }

      // Exclude already swiped users
      if (swipedUserIds.length > 0) {
        query = query.not('id', 'in', `(${swipedUserIds.join(',')})`);
        console.log('🚫 Excluding already swiped users');
      }

      console.log('🔄 Executing query...');
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('❌ Error fetching potential matches:', error);
        throw error;
      }

      console.log('📊 Raw query results:', data?.length || 0, 'profiles found');
      console.log('📋 Sample profiles:', data?.slice(0, 3));

      // Filter profiles with more lenient requirements
      const validProfiles = (data || []).filter(profile => {
        const hasName = profile.full_name && profile.full_name.trim() !== '';
        const hasAge = profile.age && profile.age > 0;
        const hasLocation = profile.location && profile.location.trim() !== '';
        
        console.log(`🔍 Checking profile ${profile.id}:`, {
          hasName,
          hasAge, 
          hasLocation,
          hasPhotos: profile.photos && profile.photos.length > 0,
          name: profile.full_name,
          age: profile.age,
          location: profile.location,
          photoCount: profile.photos?.length || 0
        });

        // More lenient filtering - only require name and age
        return hasName && hasAge;
      });

      console.log('✅ Valid profiles after filtering:', validProfiles.length);
      console.log('📝 Final profiles to show:', validProfiles.map(p => ({
        id: p.id,
        name: p.full_name,
        age: p.age,
        location: p.location,
        photos: p.photos?.length || 0
      })));

      // Convert height to string for interface compatibility
      const mappedProfiles = validProfiles.map(p => ({
        ...p,
        height: p.height ? String(p.height) : undefined
      }));

      setMatches(mappedProfiles);
    } catch (err) {
      console.error('❌ Error in fetchPotentialMatches:', err);
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
