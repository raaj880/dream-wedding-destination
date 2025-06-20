
import { ProfileData, initialProfileData } from '@/types/profile';

export const convertDatabaseToFormData = (databaseData: any): ProfileData => {
  console.log('🔄 Converting database data to form format:', databaseData);
  
  // Helper function to convert community value back to display format
  const convertCommunityFromDb = (communityValue: string) => {
    if (!communityValue) return '';
    
    const communityMap: Record<string, string> = {
      'lingayat': 'Lingayat',
      'brahmin': 'Brahmin',
      'kuruba': 'Kuruba',
      'sc-st': 'SC/ST',
      'others': 'Others',
      'prefer-not-to-say': 'Prefer not to say'
    };
    
    return communityMap[communityValue] || communityValue;
  };

  const convertedData: ProfileData = {
    ...initialProfileData,
    fullName: databaseData.full_name || '',
    dob: databaseData.date_of_birth ? new Date(databaseData.date_of_birth + 'T12:00:00') : undefined,
    timeOfBirth: databaseData.time_of_birth || '',
    placeOfBirth: databaseData.place_of_birth || '',
    gender: databaseData.gender || '',
    location: databaseData.location || '',
    religion: databaseData.religion || '',
    community: convertCommunityFromDb(databaseData.community || ''),
    languages: Array.isArray(databaseData.languages) 
      ? databaseData.languages.join(', ') 
      : databaseData.languages || '',
    profession: databaseData.profession || '',
    education: databaseData.education || '',
    height: databaseData.height || '',
    marryTimeframe: databaseData.marry_timeframe || '',
    partnerAgeRange: [
      Math.max(18, databaseData.partner_age_range_min || 20),
      Math.min(100, databaseData.partner_age_range_max || 40)
    ],
    partnerLocation: databaseData.partner_location || '',
    profileVisibility: databaseData.profile_visibility || 'everyone',
    bio: databaseData.bio || '',
    photos: [], // New files to upload
    photoPreviews: databaseData.photos || [], // Existing photo URLs
    // Jathaka/Horoscope fields
    rashi: databaseData.rashi || '',
    nakshatra: databaseData.nakshatra || '',
    gothra: databaseData.gothra || '',
    dosha: databaseData.dosha || '',
    jathakamUrl: databaseData.jathakam_url || '',
  };
  
  console.log('✅ Converted data for editing:', convertedData);
  return convertedData;
};
