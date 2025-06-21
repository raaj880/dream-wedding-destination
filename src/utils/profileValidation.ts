
import { ProfileData } from '@/types/profile';
import { sanitizeHtml, validateName, validateAge, validateBio } from './inputValidation';

export const validateProfileStep = (step: number, data: ProfileData, isEditMode: boolean = false): Record<string, string> => {
  const errors: Record<string, string> = {};

  switch (step) {
    case 1: // Photos
      // Make photos optional for edit mode, but required for new profiles
      if (!isEditMode && data.photos.length === 0 && data.photoPreviews.length === 0) {
        errors.photos = 'Please upload at least one photo';
      }
      break;

    case 2: // Basic Details
      // Validate and sanitize full name
      const sanitizedName = sanitizeHtml(data.fullName);
      if (!validateName(sanitizedName)) {
        errors.fullName = 'Full name must be 2-50 characters and contain only letters and spaces';
      }
      
      if (!data.dob) {
        errors.dob = 'Date of birth is required';
      } else {
        // Validate age
        const age = new Date().getFullYear() - data.dob.getFullYear();
        if (!validateAge(age)) {
          errors.dob = 'You must be between 18 and 100 years old';
        }
      }
      
      if (!data.gender) {
        errors.gender = 'Gender is required';
      }
      
      // Validate location
      const sanitizedLocation = sanitizeHtml(data.location);
      if (!sanitizedLocation || sanitizedLocation.length < 2) {
        errors.location = 'Location is required and must be at least 2 characters';
      }
      break;

    case 3: // Lifestyle
      // Validate religion
      const sanitizedReligion = sanitizeHtml(data.religion);
      if (!sanitizedReligion || sanitizedReligion.length < 2) {
        errors.religion = 'Religion is required';
      }
      
      // Validate profession
      const sanitizedProfession = sanitizeHtml(data.profession);
      if (!sanitizedProfession || sanitizedProfession.length < 2) {
        errors.profession = 'Profession is required';
      }
      
      // Validate education
      const sanitizedEducation = sanitizeHtml(data.education);
      if (!sanitizedEducation || sanitizedEducation.length < 2) {
        errors.education = 'Education is required';
      }
      
      if (!data.height.trim()) {
        errors.height = 'Height is required';
      }
      break;

    case 4: // Jathaka Details
      // Validate place of birth
      const sanitizedPlace = sanitizeHtml(data.placeOfBirth);
      if (!sanitizedPlace || sanitizedPlace.length < 2) {
        errors.placeOfBirth = 'Place of birth is required';
      }
      
      // Validate time of birth format if provided
      if (data.timeOfBirth && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.timeOfBirth)) {
        errors.timeOfBirth = 'Please enter time in HH:MM format';
      }
      break;

    case 5: // Preferences
      if (!data.marryTimeframe) {
        errors.marryTimeframe = 'Marriage timeframe is required';
      }
      
      // Validate partner age range
      if (data.partnerAgeRange[0] < 18 || data.partnerAgeRange[1] > 100) {
        errors.partnerAgeRange = 'Partner age range must be between 18 and 100';
      }
      
      if (data.partnerAgeRange[0] > data.partnerAgeRange[1]) {
        errors.partnerAgeRange = 'Minimum age cannot be greater than maximum age';
      }
      
      // Validate partner location
      const sanitizedPartnerLocation = sanitizeHtml(data.partnerLocation);
      if (!sanitizedPartnerLocation || sanitizedPartnerLocation.length < 2) {
        errors.partnerLocation = 'Partner location preference is required';
      }
      
      if (!data.profileVisibility) {
        errors.profileVisibility = 'Profile visibility setting is required';
      }
      break;

    case 6: // Bio Preview
      if (!validateBio(data.bio)) {
        errors.bio = 'Bio must be 10-1000 characters long';
      }
      break;
  }

  return errors;
};

// Sanitize profile data before submission
export const sanitizeProfileData = (data: ProfileData): ProfileData => {
  return {
    ...data,
    fullName: sanitizeHtml(data.fullName),
    location: sanitizeHtml(data.location),
    religion: sanitizeHtml(data.religion),
    community: data.community ? sanitizeHtml(data.community) : '',
    profession: sanitizeHtml(data.profession),
    education: sanitizeHtml(data.education),
    bio: sanitizeHtml(data.bio),
    placeOfBirth: sanitizeHtml(data.placeOfBirth),
    partnerLocation: sanitizeHtml(data.partnerLocation),
    languages: data.languages ? sanitizeHtml(data.languages) : '',
    rashi: data.rashi ? sanitizeHtml(data.rashi) : '',
    nakshatra: data.nakshatra ? sanitizeHtml(data.nakshatra) : '',
    gothra: data.gothra ? sanitizeHtml(data.gothra) : '',
    dosha: data.dosha ? sanitizeHtml(data.dosha) : '',
  };
};
