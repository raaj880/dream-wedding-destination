
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useProfile } from '@/hooks/useProfile';
import { ProfileData } from '@/types/profile';

export const useProfileSubmission = (
  isEditMode: boolean,
  currentStep: number,
  validateStep: (step: number) => boolean,
  setIsSubmitting: (value: boolean) => void
) => {
  const navigate = useNavigate();
  const { saveProfile, loading } = useProfile();

  const handleSubmit = useCallback(async (profileData: ProfileData) => {
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
  }, [currentStep, validateStep, saveProfile, navigate, isEditMode, setIsSubmitting]);

  return {
    handleSubmit,
    loading,
  };
};
