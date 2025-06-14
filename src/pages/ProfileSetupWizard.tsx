
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileData, initialProfileData } from '@/types/profile';
import ProgressBar from '@/components/profile-setup/ProgressBar';
import NavigationButtons from '@/components/profile-setup/NavigationButtons';
import TrustNote from '@/components/profile-setup/TrustNote';
import Step1Photos from '@/components/profile-setup/Step1Photos';
import Step2BasicDetails from '@/components/profile-setup/Step2BasicDetails';
import Step3Lifestyle from '@/components/profile-setup/Step3Lifestyle';
import Step4Preferences from '@/components/profile-setup/Step4Preferences';
import Step5BioPreview from '@/components/profile-setup/Step5BioPreview';
import { toast } from "sonner";

const TOTAL_STEPS = 5;

const ProfileSetupWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isCurrentStepValidating, setIsCurrentStepValidating] = useState(false);
  const navigate = useNavigate();

  const updateData = (newData: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...newData }));
    // Clear errors for fields being updated
    const newErrors = { ...errors };
    Object.keys(newData).forEach(key => {
      if (newErrors[key]) delete newErrors[key];
    });
    setErrors(newErrors);
    setIsCurrentStepValidating(false); // Reset validation trigger on data change
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string | undefined> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (profileData.photos.length === 0) {
        newErrors.photos = "Please upload at least one photo.";
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!profileData.fullName.trim()) newErrors.fullName = "Full name is required.";
      if (!profileData.dob) newErrors.dob = "Date of birth is required.";
      if (!profileData.gender) newErrors.gender = "Gender is required.";
      if (!profileData.location.trim()) newErrors.location = "Location is required.";
      if (Object.keys(newErrors).length > 0) isValid = false;
    } else if (currentStep === 3) {
      if (!profileData.religion) newErrors.religion = "Religion is required.";
      if (!profileData.languages.trim()) newErrors.languages = "At least one language is required.";
      if (!profileData.profession.trim()) newErrors.profession = "Profession is required.";
      if (!profileData.education) newErrors.education = "Education is required.";
      if (!profileData.height.trim()) newErrors.height = "Height is required.";
      if (Object.keys(newErrors).length > 0) isValid = false;
    } else if (currentStep === 4) {
      if (!profileData.marryTimeframe) newErrors.marryTimeframe = "Marriage timeframe is required.";
      if (!profileData.partnerLocation) newErrors.partnerLocation = "Partner location preference is required.";
      if (!profileData.profileVisibility) newErrors.profileVisibility = "Profile visibility is required.";
      // Age range has defaults, so usually valid unless specific rules are needed
      if (Object.keys(newErrors).length > 0) isValid = false;
    } else if (currentStep === 5) {
      if (!profileData.bio.trim()) newErrors.bio = "Bio is required.";
      else if (profileData.bio.trim().length < 50) newErrors.bio = "Bio must be at least 50 characters.";
      if (Object.keys(newErrors).length > 0) isValid = false;
    }
    
    setErrors(newErrors);
    setIsCurrentStepValidating(true); // Mark that validation has been attempted for current step
    return isValid;
  };
  
  const handleTriggerValidation = () => {
    // This function is called by Step1Photos to signal a change that might affect validation
    // We only care if validation has already been attempted (isCurrentStepValidating is true)
    // If so, re-validate.
    if (isCurrentStepValidating) {
      validateStep();
    }
    return isCurrentStepValidating && !!errors.photos; // For Step1Photos to show its own error
  };


  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
        setIsCurrentStepValidating(false); // Reset for next step
        window.scrollTo(0, 0); // Scroll to top on step change
      }
    } else {
       toast.error("Please fill in all required fields for this step.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setIsCurrentStepValidating(false); // Reset validation trigger
      setErrors({}); // Clear errors when going back
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    if (validateStep()) {
      console.log("Profile Data Submitted:", profileData);
      toast.success("Profile Created Successfully! Redirecting...");
      // Placeholder: In a real app, submit data to backend then navigate
      setTimeout(() => {
        navigate('/'); // Navigate to dashboard or home after completion
      }, 2000);
    } else {
       toast.error("Please fill in all required fields for this step.");
    }
  };
  
  const isNextDisabled = () => {
    // Simple check if validation has been triggered and there are errors
    // More sophisticated logic could be added if needed.
    if (!isCurrentStepValidating) return false; // Don't disable if validation hasn't run yet for the current view
    return Object.keys(errors).length > 0;
  };


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Photos data={profileData} updateData={updateData} triggerValidation={handleTriggerValidation} />;
      case 2:
        return <Step2BasicDetails data={profileData} updateData={updateData} errors={errors} />;
      case 3:
        return <Step3Lifestyle data={profileData} updateData={updateData} errors={errors} />;
      case 4:
        return <Step4Preferences data={profileData} updateData={updateData} errors={errors} />;
      case 5:
        return <Step5BioPreview data={profileData} updateData={updateData} errors={errors} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // When currentStep changes, reset isCurrentStepValidating and errors for the new step
    // This prevents old errors from showing or next button being disabled prematurely
    setIsCurrentStepValidating(false);
    setErrors({});
  }, [currentStep]);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black font-sans">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      <main className="flex-grow container mx-auto max-w-2xl py-8 px-4">
        <div className="flex flex-col min-h-[calc(100vh-200px)]"> {/* Ensure content pushes TrustNote down */}
           <div className="flex-grow">
            {renderStep()}
           </div>
          <TrustNote />
        </div>
      </main>
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 shadow-md_dark"> {/* shadow-md_dark is a placeholder for dark mode shadow */}
         <NavigationButtons
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onBack={handleBack}
            onNext={handleNext}
            isNextDisabled={isNextDisabled()}
            onComplete={handleComplete}
          />
      </div>
    </div>
  );
};

export default ProfileSetupWizard;
