
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileData } from '@/types/profile';
import { differenceInYears } from 'date-fns';

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const saveProfile = useCallback(async (profileData: ProfileData) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    console.log('Saving profile data:', profileData);
    
    try {
      // Calculate age from date of birth
      const age = profileData.dob ? differenceInYears(new Date(), profileData.dob) : null;
      
      // Convert languages string to array
      const languagesArray = profileData.languages 
        ? profileData.languages.split(',').map(lang => lang.trim())
        : [];

      // Prepare profile data for database
      const profilePayload = {
        id: user.id,
        full_name: profileData.fullName,
        age,
        date_of_birth: profileData.dob?.toISOString().split('T')[0] || null,
        gender: profileData.gender || null,
        location: profileData.location,
        religion: profileData.religion,
        community: profileData.community,
        languages: languagesArray,
        profession: profileData.profession,
        education: profileData.education,
        height: profileData.height,
        marry_timeframe: profileData.marryTimeframe,
        bio: profileData.bio,
        photos: [], // TODO: Handle photo uploads separately
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profilePayload)
        .select();

      if (error) {
        console.error('Profile save error:', error);
        throw error;
      }

      console.log('Profile saved successfully:', data);
      return data;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user?.id]); // Only depend on user.id

  const getProfile = useCallback(async () => {
    if (!user) return null;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user?.id]); // Only depend on user.id

  return {
    saveProfile,
    getProfile,
    loading,
  };
};
