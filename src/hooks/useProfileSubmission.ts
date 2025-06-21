
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { ProfileData } from '@/types/profile';
import { toast } from '@/components/ui/use-toast';
import { sanitizeProfileData } from '@/utils/profileValidation';
import { logSecurityEvent } from '@/utils/authSecurity';

export const useProfileSubmission = (
  isEditMode: boolean,
  currentStep: number,
  validateStep: (step: number) => boolean,
  setIsSubmitting: (loading: boolean) => void
) => {
  const navigate = useNavigate();
  const { saveProfile, loading } = useProfile();

  const handleSubmit = useCallback(async (profileData: ProfileData) => {
    console.log('🚀 Starting profile submission process');
    
    if (currentStep !== 6 || !validateStep(6)) {
      console.log('❌ Final step validation failed');
      toast({
        title: "Validation Error",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize all profile data before submission
      const sanitizedData = sanitizeProfileData(profileData);
      
      console.log('💾 Saving sanitized profile data...');
      await saveProfile(sanitizedData);
      
      // Log security event
      await logSecurityEvent(isEditMode ? 'profile_updated' : 'profile_created', {
        hasPhotos: sanitizedData.photos.length > 0 || sanitizedData.photoPreviews.length > 0,
        completedSteps: 6
      });

      toast({
        title: isEditMode ? "Profile Updated!" : "Profile Created!",
        description: isEditMode 
          ? "Your profile has been successfully updated." 
          : "Welcome! Your profile has been created successfully.",
      });

      console.log('✅ Profile submission completed successfully');
      
      // Navigate based on mode
      if (isEditMode) {
        navigate('/profile', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('❌ Profile submission error:', error);
      
      // Log security event for failed submission
      await logSecurityEvent('profile_submission_failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        isEditMode
      });
      
      toast({
        title: "Submission Failed",
        description: error instanceof Error 
          ? error.message 
          : "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, validateStep, saveProfile, isEditMode, navigate, setIsSubmitting]);

  return {
    handleSubmit,
    loading
  };
};
