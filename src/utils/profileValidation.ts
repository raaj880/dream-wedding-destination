
import { ProfileData } from '@/types/profile';

export const validateProfileStep = (step: number, profileData: ProfileData): Record<string, string | undefined> => {
  const errors: Record<string, string | undefined> = {};

  switch (step) {
    case 1:
      // In edit mode, allow proceeding even without new photos if there are existing ones
      if (profileData.photoPreviews.length === 0 && profileData.photos.length === 0) {
        errors.photos = 'Please upload at least one photo';
      }
      break;
      
    case 2:
      if (!profileData.fullName.trim()) {
        errors.fullName = 'Full name is required';
      }
      if (!profileData.dob) {
        errors.dob = 'Date of birth is required';
      } else {
        // Validate age (must be at least 18)
        const age = new Date().getFullYear() - profileData.dob.getFullYear();
        if (age < 18) {
          errors.dob = 'You must be at least 18 years old';
        }
      }
      if (!profileData.gender) {
        errors.gender = 'Gender is required';
      }
      if (!profileData.location.trim()) {
        errors.location = 'Location is required';
      }
      break;
      
    case 3:
      if (!profileData.religion) {
        errors.religion = 'Religion is required';
      }
      if (!profileData.languages.trim()) {
        errors.languages = 'At least one language is required';
      }
      if (!profileData.profession.trim()) {
        errors.profession = 'Profession is required';
      }
      if (!profileData.education) {
        errors.education = 'Education is required';
      }
      if (!profileData.height.trim()) {
        errors.height = 'Height is required';
      }
      break;
      
    case 4:
      if (!profileData.marryTimeframe) {
        errors.marryTimeframe = 'Marriage timeframe is required';
      }
      if (!profileData.partnerLocation) {
        errors.partnerLocation = 'Partner location preference is required';
      }
      if (!profileData.profileVisibility) {
        errors.profileVisibility = 'Profile visibility setting is required';
      }
      // Validate partner age range
      if (profileData.partnerAgeRange[0] >= profileData.partnerAgeRange[1]) {
        errors.partnerAgeRange = 'Invalid age range: minimum must be less than maximum';
      }
      break;
      
    case 5:
      if (!profileData.bio.trim()) {
        errors.bio = 'Bio is required';
      } else if (profileData.bio.length < 50) {
        errors.bio = 'Bio should be at least 50 characters';
      } else if (profileData.bio.length > 500) {
        errors.bio = 'Bio should not exceed 500 characters';
      }
      break;
  }

  return errors;
};
