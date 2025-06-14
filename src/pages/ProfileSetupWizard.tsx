
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useProfileSetup } from '@/hooks/useProfileSetup';

// Step components
import Step1Photos from '@/components/profile-setup/Step1Photos';
import Step2BasicDetails from '@/components/profile-setup/Step2BasicDetails';
import Step3Lifestyle from '@/components/profile-setup/Step3Lifestyle';
import Step4Preferences from '@/components/profile-setup/Step4Preferences';
import Step5BioPreview from '@/components/profile-setup/Step5BioPreview';
import ProgressBar from '@/components/profile-setup/ProgressBar';
import TrustNote from '@/components/profile-setup/TrustNote';

const ProfileSetupWizard: React.FC = () => {
  const totalSteps = 5;
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
  } = useProfileSetup(totalSteps);

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
