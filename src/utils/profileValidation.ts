
import { ProfileData } from '@/types/profile';

export const validateProfileStep = (step: number, data: ProfileData): Record<string, string> => {
  const errors: Record<string, string> = {};

  switch (step) {
    case 1: // Photos
      if (data.photos.length === 0 && data.photoPreviews.length === 0) {
        errors.photos = 'Please upload at least one photo';
      }
      break;

    case 2: // Basic Details
      if (!data.fullName.trim()) {
        errors.fullName = 'Full name is required';
      }
      if (!data.dob) {
        errors.dob = 'Date of birth is required';
      }
      if (!data.gender) {
        errors.gender = 'Gender is required';
      }
      if (!data.location.trim()) {
        errors.location = 'Location is required';
      }
      break;

    case 3: // Lifestyle
      if (!data.religion.trim()) {
        errors.religion = 'Religion is required';
      }
      if (!data.profession.trim()) {
        errors.profession = 'Profession is required';
      }
      if (!data.education.trim()) {
        errors.education = 'Education is required';
      }
      if (!data.height.trim()) {
        errors.height = 'Height is required';
      }
      // Community is optional, so no validation needed
      break;

    case 4: // Jathaka Details
      if (!data.placeOfBirth.trim()) {
        errors.placeOfBirth = 'Place of birth is required';
      }
      // Make Jathaka fields optional for now to avoid blocking users
      break;

    case 5: // Preferences
      if (!data.marryTimeframe) {
        errors.marryTimeframe = 'Marriage timeframe is required';
      }
      if (!data.partnerLocation.trim()) {
        errors.partnerLocation = 'Partner location preference is required';
      }
      if (!data.profileVisibility) {
        errors.profileVisibility = 'Profile visibility setting is required';
      }
      break;

    case 6: // Bio Preview
      if (!data.bio.trim()) {
        errors.bio = 'Bio is required';
      }
      if (data.bio.length < 30) {
        errors.bio = 'Bio should be at least 30 characters long';
      }
      break;
  }

  return errors;
};
