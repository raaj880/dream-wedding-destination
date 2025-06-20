
import { useState, useCallback } from 'react';
import { ProfileData, initialProfileData } from '@/types/profile';
import { convertDatabaseToFormData } from '@/utils/profileDataConverter';
import { validateProfileStep } from '@/utils/profileValidation';

export const useProfileSetupState = (totalSteps: number, initialData?: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    console.log('🏗️ Initializing profile setup with data:', initialData);
    return initialData ? convertDatabaseToFormData(initialData) : initialProfileData;
  });
  
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData;

  console.log('🔧 useProfileSetupState initialized:', {
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
    const newErrors = validateProfileStep(step, profileData, isEditMode);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log(`✅ Step ${step} validation:`, { isValid, errors: newErrors, isEditMode });
    return isValid;
  }, [profileData, isEditMode]);

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

  const triggerValidation = useCallback(() => validateStep(currentStep), [currentStep, validateStep]);

  return {
    currentStep,
    profileData,
    errors,
    isSubmitting,
    setIsSubmitting,
    isEditMode,
    updateData,
    nextStep,
    prevStep,
    triggerValidation,
    validateStep,
  };
};
