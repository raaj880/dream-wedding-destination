
import { useState, useCallback, useEffect } from 'react';
import { ProfileData, initialProfileData } from '@/types/profile';
import { convertDatabaseToFormData } from '@/utils/profileDataConverter';
import { validateProfileStep } from '@/utils/profileValidation';

export const useProfileSetupState = (totalSteps: number, initialData?: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDataInitialized, setIsDataInitialized] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData;

  console.log('🔧 useProfileSetupState - Initial setup:', {
    isEditMode,
    hasInitialData: !!initialData,
    isDataInitialized,
    initialDataType: typeof initialData
  });

  // Initialize profile data when initialData changes
  useEffect(() => {
    if (initialData && !isDataInitialized) {
      console.log('🏗️ Initializing profile data with:', initialData);
      try {
        const convertedData = convertDatabaseToFormData(initialData);
        console.log('✅ Converted data for form:', convertedData);
        setProfileData(convertedData);
        setIsDataInitialized(true);
      } catch (error) {
        console.error('❌ Error converting database data:', error);
        // Fallback to default data if conversion fails
        setProfileData(initialProfileData);
        setIsDataInitialized(true);
      }
    } else if (!initialData && !isDataInitialized) {
      console.log('🆕 No initial data, using default profile data');
      setProfileData(initialProfileData);
      setIsDataInitialized(true);
    }
  }, [initialData, isDataInitialized]);

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
    isDataInitialized,
  };
};
