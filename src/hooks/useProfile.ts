
import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileData } from '@/types/profile';
import { prepareProfilePayload } from '@/utils/profileTransformation';
import { useProfileData } from './useProfileData';
import { usePhotoManagement } from './usePhotoManagement';

export const useProfile = () => {
  const { user } = useAuth();
  const { getProfile, updateProfile, loading: dataLoading } = useProfileData();
  const { uploadPhotos, replaceMainProfilePhoto, loading: photoLoading } = usePhotoManagement();

  const saveProfile = useCallback(async (profileData: ProfileData) => {
    if (!user) throw new Error('User not authenticated');
    
    console.log('Saving profile data:', profileData);
    
    try {
      // 1. Handle Photo Uploads
      const existingPhotoUrls = profileData.photoPreviews.filter(url => url.startsWith('https://'));
      const newPhotoUrls = profileData.photos.length > 0 ? await uploadPhotos(profileData.photos) : [];
      const finalPhotoUrls = [...existingPhotoUrls, ...newPhotoUrls];

      // 2. Prepare profile data for database
      const profilePayload = prepareProfilePayload(profileData, user.id, finalPhotoUrls);

      // 3. Save to database
      return await updateProfile(profilePayload);
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }, [user?.id, uploadPhotos, updateProfile]);

  const loading = dataLoading || photoLoading;

  return {
    saveProfile,
    getProfile,
    loading,
    replaceMainProfilePhoto,
  };
};
