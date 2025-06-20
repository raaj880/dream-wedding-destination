
import { ProfileData } from '@/types/profile';
import { Tables } from '@/integrations/supabase/types';

export const transformRawProfile = (rawProfile: Tables<'profiles'>): ProfileData => {
  console.log('🔄 Transforming raw profile:', rawProfile);
  
  // Improved date parsing to handle timezone issues
  let dobDate: Date | undefined = undefined;
  if (rawProfile.date_of_birth) {
    try {
      // Parse the date string more carefully
      const dateStr = rawProfile.date_of_birth;
      dobDate = new Date(dateStr + 'T12:00:00'); // Add noon time to avoid timezone issues
    } catch (error) {
      console.warn('Date parsing error:', error);
    }
  }
  
  return {
    fullName: rawProfile.full_name || '',
    dob: dobDate,
    timeOfBirth: rawProfile.time_of_birth || '',
    placeOfBirth: rawProfile.place_of_birth || '',
    gender: (rawProfile.gender as ProfileData['gender']) || '',
    location: rawProfile.location || '',
    religion: rawProfile.religion || '',
    community: rawProfile.community || '',
    languages: rawProfile.languages?.join(', ') || '',
    profession: rawProfile.profession || '',
    education: rawProfile.education || '',
    height: rawProfile.height || '',
    marryTimeframe: (rawProfile.marry_timeframe as ProfileData['marryTimeframe']) || '',
    // Ensure valid age range with proper bounds
    partnerAgeRange: [
      Math.max(18, rawProfile.partner_age_range_min || 20), 
      Math.min(100, rawProfile.partner_age_range_max || 40)
    ],
    partnerLocation: rawProfile.partner_location || '',
    profileVisibility: (rawProfile.profile_visibility as ProfileData['profileVisibility']) || 'everyone',
    bio: rawProfile.bio || '',
    photos: [], // Always empty for existing profiles since these are File objects
    photoPreviews: rawProfile.photos || [], // URLs from database
    // Jathaka/Horoscope fields
    rashi: rawProfile.rashi || '',
    nakshatra: rawProfile.nakshatra || '',
    gothra: rawProfile.gothra || '',
    dosha: rawProfile.dosha || '',
    jathakamUrl: rawProfile.jathakam_url || '',
  };
};
