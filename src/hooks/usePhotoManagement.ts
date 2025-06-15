
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadMultiplePhotos, uploadPhoto, deletePhoto } from '@/services/photoService';
import { useProfileData } from './useProfileData';

export const usePhotoManagement = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { updateProfile } = useProfileData();

  const uploadPhotos = useCallback(async (files: File[]): Promise<string[]> => {
    if (!user) throw new Error('User not authenticated');
    return await uploadMultiplePhotos(user.id, files);
  }, [user?.id]);

  const replaceMainProfilePhoto = useCallback(async (file: File, currentPhotoUrls: string[]) => {
    if (!user) throw new Error('User not authenticated');
    setLoading(true);
    
    try {
      // 1. Upload new photo
      const newPhotoUrl = await uploadPhoto(user.id, file);

      // 2. Prepare new photos array, replacing the old primary photo
      const oldPrimaryUrl = currentPhotoUrls.length > 0 ? currentPhotoUrls[0] : null;
      const otherPhotos = currentPhotoUrls.length > 0 ? currentPhotoUrls.slice(1) : [];
      const newPhotoUrls = [newPhotoUrl, ...otherPhotos];

      // 3. Update profile in the database
      const data = await updateProfile({ 
        photos: newPhotoUrls, 
        updated_at: new Date().toISOString() 
      });

      // 4. Delete the old photo from storage if it exists
      if (oldPrimaryUrl) {
        await deletePhoto(oldPrimaryUrl);
      }
      
      return data;
    } catch (error) {
      console.error('Error replacing main profile photo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user?.id, updateProfile]);

  return {
    uploadPhotos,
    replaceMainProfilePhoto,
    loading,
  };
};
