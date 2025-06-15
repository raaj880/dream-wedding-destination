
import { ProfileData, initialProfileData } from '@/types/profile';

export const convertDatabaseToFormData = (databaseData: any): ProfileData => {
  console.log('🔄 Converting database data to form format:', databaseData);
  
  const convertedData: ProfileData = {
    ...initialProfileData,
    fullName: databaseData.full_name || '',
    dob: databaseData.date_of_birth ? new Date(databaseData.date_of_birth) : undefined,
    gender: databaseData.gender || '',
    location: databaseData.location || '',
    religion: databaseData.religion || '',
    community: databaseData.community || '',
    languages: Array.isArray(databaseData.languages) 
      ? databaseData.languages.join(', ') 
      : databaseData.languages || '',
    profession: databaseData.profession || '',
    education: databaseData.education || '',
    height: databaseData.height || '',
    marryTimeframe: databaseData.marry_timeframe || '',
    partnerAgeRange: [
      databaseData.partner_age_range_min || 20,
      databaseData.partner_age_range_max || 40
    ],
    partnerLocation: databaseData.partner_location || '',
    profileVisibility: databaseData.profile_visibility || '',
    bio: databaseData.bio || '',
    photos: [], // New files to upload
    photoPreviews: databaseData.photos || [], // Existing photo URLs
  };
  
  console.log('✅ Converted data for editing:', convertedData);
  return convertedData;
};
