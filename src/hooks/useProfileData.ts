
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useProfileData = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

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
  }, [user?.id]);

  const updateProfile = useCallback(async (profilePayload: any) => {
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profilePayload)
      .select()
      .single();

    if (error) {
      console.error('Profile save error:', error);
      throw error;
    }

    console.log('Profile saved successfully:', data);
    return data;
  }, [user?.id]);

  return {
    getProfile,
    updateProfile,
    loading,
  };
};
