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
      // 1. Handle Photo Uploads
      const existingPhotoUrls = profileData.photoPreviews.filter(url => url.startsWith('https://'));
      
      const uploadPromises = profileData.photos.map(async (file) => {
        const filePath = `${user.id}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('profile-photos')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('Error uploading photo:', uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('profile-photos')
          .getPublicUrl(filePath);
        
        return publicUrl;
      });

      const newPhotoUrls = await Promise.all(uploadPromises);
      const finalPhotoUrls = [...existingPhotoUrls, ...newPhotoUrls];

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
        photos: finalPhotoUrls,
        updated_at: new Date().toISOString(),
        partner_age_range_min: profileData.partnerAgeRange[0],
        partner_age_range_max: profileData.partnerAgeRange[1],
        partner_location: profileData.partnerLocation,
        profile_visibility: profileData.profileVisibility,
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
  }, [user?.id]);

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

  const replaceMainProfilePhoto = useCallback(async (file: File, currentPhotoUrls: string[]) => {
    if (!user) throw new Error('User not authenticated');
    setLoading(true);
    
    try {
      // 1. Upload new photo
      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, file, { 
          cacheControl: '3600', 
          upsert: false 
        });
        
      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(filePath);

      // 2. Prepare new photos array, replacing the old primary photo
      const oldPrimaryUrl = currentPhotoUrls.length > 0 ? currentPhotoUrls[0] : null;
      const otherPhotos = currentPhotoUrls.length > 0 ? currentPhotoUrls.slice(1) : [];
      const newPhotoUrls = [publicUrl, ...otherPhotos];

      // 3. Update profile in the database
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          photos: newPhotoUrls, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }

      // 4. Delete the old photo from storage if it exists
      if (oldPrimaryUrl && oldPrimaryUrl.includes('profile-photos')) {
        try {
          const bucketName = 'profile-photos';
          const urlParts = oldPrimaryUrl.split('/');
          const bucketIndex = urlParts.findIndex(part => part === bucketName);
          
          if (bucketIndex > -1 && bucketIndex + 1 < urlParts.length) {
            const oldPhotoPath = urlParts.slice(bucketIndex + 1).join('/');
            if (oldPhotoPath) {
              const { error: deleteError } = await supabase.storage
                .from(bucketName)
                .remove([oldPhotoPath]);
              
              if (deleteError) {
                console.warn('Could not delete old photo:', deleteError);
              }
            }
          }
        } catch (e) {
          console.warn("Could not parse old photo URL or delete from storage:", e);
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error replacing main profile photo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  return {
    saveProfile,
    getProfile,
    loading,
    replaceMainProfilePhoto,
  };
};
