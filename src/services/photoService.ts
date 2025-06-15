
import { supabase } from '@/integrations/supabase/client';

export const uploadPhoto = async (userId: string, file: File): Promise<string> => {
  const filePath = `${userId}/${Date.now()}-${file.name}`;
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
};

export const deletePhoto = async (photoUrl: string): Promise<void> => {
  if (!photoUrl.includes('profile-photos')) return;
  
  try {
    const bucketName = 'profile-photos';
    const urlParts = photoUrl.split('/');
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
};

export const uploadMultiplePhotos = async (userId: string, files: File[]): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadPhoto(userId, file));
  return await Promise.all(uploadPromises);
};
