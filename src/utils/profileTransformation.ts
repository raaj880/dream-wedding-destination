
import { ProfileData } from '@/types/profile';
import { differenceInYears } from 'date-fns';

export const prepareProfilePayload = (profileData: ProfileData, userId: string, finalPhotoUrls: string[]) => {
  // Calculate age from date of birth
  const age = profileData.dob ? differenceInYears(new Date(), profileData.dob) : null;
  
  // Convert languages string to array
  const languagesArray = profileData.languages 
    ? profileData.languages.split(',').map(lang => lang.trim())
    : [];

  return {
    id: userId,
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
};
