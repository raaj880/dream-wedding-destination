
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { ProfileData, initialProfileData } from '@/types/profile';
import { toast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';

// Step components
import Step1Photos from '@/components/profile-setup/Step1Photos';
import Step2BasicDetails from '@/components/profile-setup/Step2BasicDetails';
import Step3Lifestyle from '@/components/profile-setup/Step3Lifestyle';
import Step4Preferences from '@/components/profile-setup/Step4Preferences';
import Step5BioPreview from '@/components/profile-setup/Step5BioPreview';
import ProgressBar from '@/components/profile-setup/ProgressBar';
import TrustNote from '@/components/profile-setup/TrustNote';

const ProfileSetupWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { saveProfile, loading } = useProfile();

  const totalSteps = 5;

  const updateData = (newData: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...newData }));
    // Clear errors for updated fields
    const updatedFields = Object.keys(newData);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => delete newErrors[field]);
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string | undefined> = {};

    switch (step) {
      case 1:
        if (profileData.photos.length === 0) {
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
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      await saveProfile(profileData);
      
      toast({
        title: "Profile Created Successfully! 🎉",
        description: "Welcome to Wedder! Your profile is now live.",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Profile Save Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerValidation = () => validateStep(currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Photos data={profileData} updateData={updateData} triggerValidation={triggerValidation} />;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/10 via-white to-white dark:from-deep-blue/10 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-deep-blue dark:text-white mb-2">
              Complete Your Profile
            </CardTitle>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}
            
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="bg-deep-blue hover:bg-deep-blue/90 text-white flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || loading}
                  className="bg-soft-pink hover:bg-soft-pink/90 text-deep-blue flex items-center"
                >
                  {isSubmitting || loading ? (
                    'Creating Profile...'
                  ) : (
                    <>
                      Complete Profile
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        <TrustNote />
      </div>
    </div>
  );
};

export default ProfileSetupWizard;
