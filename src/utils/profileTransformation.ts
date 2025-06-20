
import { ProfileData } from '@/types/profile';
import { differenceInYears } from 'date-fns';

export const prepareProfilePayload = (profileData: ProfileData, userId: string, finalPhotoUrls: string[]) => {
  // Calculate age from date of birth
  const age = profileData.dob ? differenceInYears(new Date(), profileData.dob) : null;
  
  // Convert languages string to array
  const languagesArray = profileData.languages 
    ? profileData.languages.split(',').map(lang => lang.trim()).filter(lang => lang)
    : [];

  // Helper function to convert community display value to database format
  const convertCommunityToDb = (communityValue: string) => {
    if (!communityValue) return null;
    
    const communityMap: Record<string, string> = {
      'Lingayat': 'lingayat',
      'Brahmin': 'brahmin',
      'Kuruba': 'kuruba',
      'SC/ST': 'sc-st',
      'Others': 'others',
      'Prefer not to say': 'prefer-not-to-say'
    };
    
    return communityMap[communityValue] || communityValue.toLowerCase().replace(/\s+/g, '-');
  };

  return {
    id: userId,
    full_name: profileData.fullName || null,
    age,
    date_of_birth: profileData.dob?.toISOString().split('T')[0] || null,
    time_of_birth: profileData.timeOfBirth || null,
    place_of_birth: profileData.placeOfBirth || null,
    gender: profileData.gender || null,
    location: profileData.location || null,
    religion: profileData.religion || null,
    community: convertCommunityToDb(profileData.community),
    languages: languagesArray.length > 0 ? languagesArray : null,
    profession: profileData.profession || null,
    education: profileData.education || null,
    height: profileData.height || null,
    marry_timeframe: profileData.marryTimeframe || null,
    bio: profileData.bio || null,
    photos: finalPhotoUrls.length > 0 ? finalPhotoUrls : null,
    updated_at: new Date().toISOString(),
    partner_age_range_min: profileData.partnerAgeRange[0],
    partner_age_range_max: profileData.partnerAgeRange[1],
    partner_location: profileData.partnerLocation || null,
    profile_visibility: profileData.profileVisibility || 'everyone',
    // Jathaka/Horoscope fields
    rashi: profileData.rashi || null,
    nakshatra: profileData.nakshatra || null,
    gothra: profileData.gothra || null,
    dosha: profileData.dosha || null,
    jathakam_url: profileData.jathakamUrl || null,
  };
};
