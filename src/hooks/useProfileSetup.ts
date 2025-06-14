
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileData, initialProfileData } from '@/types/profile';
import { toast } from '@/components/ui/use-toast';
import { useProfile } from '@/hooks/useProfile';

export const useProfileSetup = (totalSteps: number, initialData?: ProfileData) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    console.log('🏗️ Initializing profile setup with data:', initialData);
    return initialData || initialProfileData;
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { saveProfile, loading } = useProfile();
  const isEditMode = !!initialData;

  console.log('🔧 useProfileSetup initialized:', {
    isEditMode,
    hasInitialData: !!initialData,
    currentProfileData: profileData
  });

  const updateData = useCallback((newData: Partial<ProfileData>) => {
    console.log('📝 Updating profile data:', newData);
    setProfileData(prev => {
      const updated = { ...prev, ...newData };
      console.log('📋 Updated profile data:', updated);
      return updated;
    });
    // Clear errors for updated fields
    const updatedFields = Object.keys(newData);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => delete newErrors[field]);
      return newErrors;
    });
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string | undefined> = {};

    switch (step) {
      case 1:
        if (profileData.photoPreviews.length === 0) {
          newErrors.photos = 'Please upload at least one photo';
        }
        break;
      case 2:
        if (!profileData.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        if (!profileData.dob) {
          newErrors.dob = 'Date of birth is required';
        }
        if (!profileData.gender) {
          newErrors.gender = 'Gender is required';
        }
        if (!profileData.location.trim()) {
          newErrors.location = 'Location is required';
        }
        break;
      case 3:
        if (!profileData.religion) {
          newErrors.religion = 'Religion is required';
        }
        if (!profileData.languages.trim()) {
          newErrors.languages = 'At least one language is required';
        }
        if (!profileData.profession.trim()) {
          newErrors.profession = 'Profession is required';
        }
        if (!profileData.education) {
          newErrors.education = 'Education is required';
        }
        if (!profileData.height.trim()) {
          newErrors.height = 'Height is required';
        }
        break;
      case 4:
        if (!profileData.marryTimeframe) {
          newErrors.marryTimeframe = 'Marriage timeframe is required';
        }
        if (!profileData.partnerLocation) {
          newErrors.partnerLocation = 'Partner location preference is required';
        }
        if (!profileData.profileVisibility) {
          newErrors.profileVisibility = 'Profile visibility setting is required';
        }
        break;
      case 5:
        if (!profileData.bio.trim()) {
          newErrors.bio = 'Bio is required';
        }
        if (profileData.bio.length < 50) {
          newErrors.bio = 'Bio should be at least 50 characters';
        }
        break;
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log(`✅ Step ${step} validation:`, { isValid, errors: newErrors });
    return isValid;
  }, [profileData]);

  const nextStep = useCallback(() => {
    console.log(`➡️ Attempting to go to next step from ${currentStep}`);
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  }, [currentStep, totalSteps, validateStep]);

  const prevStep = useCallback(() => {
    console.log(`⬅️ Going to previous step from ${currentStep}`);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    console.log('🚀 Submitting profile:', { isEditMode, profileData });
    
    if (!validateStep(currentStep)) {
      console.log('❌ Validation failed, not submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveProfile(profileData);
      
      toast({
        title: isEditMode ? "Profile Updated! 🎉" : "Profile Created Successfully! 🎉",
        description: isEditMode ? "Your changes have been saved." : "Welcome to Wedder! Your profile is now live.",
      });

      // Navigate to profile page after edit, or dashboard after creation
      navigate(isEditMode ? '/profile' : '/dashboard', { replace: true });
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      toast({
        title: isEditMode ? "Update Failed" : "Profile Save Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, validateStep, saveProfile, profileData, navigate, isEditMode]);

  const triggerValidation = useCallback(() => validateStep(currentStep), [currentStep, validateStep]);

  return {
    currentStep,
    profileData,
    errors,
    isSubmitting,
    loading,
    updateData,
    nextStep,
    prevStep,
    handleSubmit,
    triggerValidation,
    isEditMode,
  };
};
