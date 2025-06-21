
import { useProfileSetupState } from '@/hooks/useProfileSetupState';
import { useProfileSubmission } from '@/hooks/useProfileSubmission';

export const useProfileSetup = (totalSteps: number, initialData?: any) => {
  const {
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
  } = useProfileSetupState(totalSteps, initialData);

  const { handleSubmit, loading } = useProfileSubmission(
    isEditMode,
    currentStep,
    validateStep,
    setIsSubmitting
  );

  return {
    currentStep,
    profileData,
    errors,
    isSubmitting,
    loading,
    updateData,
    nextStep,
    prevStep,
    handleSubmit: () => handleSubmit(profileData),
    triggerValidation,
    isEditMode,
    isDataInitialized,
  };
};
