
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useProfileSetup } from '@/hooks/useProfileSetup';

// Step components
import Step1Photos from '@/components/profile-setup/Step1Photos';
import Step2BasicDetails from '@/components/profile-setup/Step2BasicDetails';
import Step3Lifestyle from '@/components/profile-setup/Step3Lifestyle';
import Step4JathakaDetails from '@/components/profile-setup/Step4JathakaDetails';
import Step5Preferences from '@/components/profile-setup/Step5Preferences';
import Step6BioPreview from '@/components/profile-setup/Step6BioPreview';
import ProgressBar from '@/components/profile-setup/ProgressBar';
import TrustNote from '@/components/profile-setup/TrustNote';

const ProfileSetupWizard: React.FC = () => {
  const totalSteps = 6; // Updated to 6 steps
  const location = useLocation();
  const existingProfileData = location.state?.profileData;
  
  console.log('🔍 ProfileSetupWizard loaded with existing data:', existingProfileData);
  
  const {
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
  } = useProfileSetup(totalSteps, existingProfileData);

  console.log('🔧 ProfileSetup hook state:', {
    currentStep,
    isEditMode,
    hasProfileData: !!profileData,
    profileDataKeys: profileData ? Object.keys(profileData) : []
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Photos data={profileData} updateData={updateData} triggerValidation={triggerValidation} />;
      case 2:
        return <Step2BasicDetails data={profileData} updateData={updateData} errors={errors} />;
      case 3:
        return <Step3Lifestyle data={profileData} updateData={updateData} errors={errors} />;
      case 4:
        return <Step4JathakaDetails data={profileData} updateData={updateData} errors={errors} />;
      case 5:
        return <Step5Preferences data={profileData} updateData={updateData} errors={errors} />;
      case 6:
        return <Step6BioPreview data={profileData} updateData={updateData} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-card-charcoal text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-premium bg-card-dark-gray border border-card-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-card-gold mb-2">
              {isEditMode ? 'Edit Your Profile' : 'Complete Your Profile'}
            </CardTitle>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}
            
            <div className="flex justify-between pt-6 border-t border-card-gold/20">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center text-card-gold border-card-gold/50 hover:bg-card-gold/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="bg-card-gold hover:bg-card-gold/90 text-card-black font-semibold flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || loading}
                  className="bg-card-gold hover:bg-card-gold/90 text-card-black font-semibold flex items-center"
                >
                  {isSubmitting || loading ? (
                    isEditMode ? 'Saving Changes...' : 'Creating Profile...'
                  ) : (
                    <>
                      {isEditMode ? 'Update Profile' : 'Complete Profile'}
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
