
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useProfileSetup } from '@/hooks/useProfileSetup';
import { useProfile } from '@/hooks/useProfile';
import { Skeleton } from '@/components/ui/skeleton';

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
  const totalSteps = 6;
  const location = useLocation();
  const [initialProfileData, setInitialProfileData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [dataInitialized, setDataInitialized] = useState(false);
  const { getProfile } = useProfile();
  
  // Check if we're in edit mode (coming from profile page or have existing data)
  const isEditMode = location.pathname.includes('edit') || location.state?.profileData || location.state?.isEditMode;
  
  console.log('🔍 ProfileSetupWizard loaded:', { 
    isEditMode, 
    hasStateData: !!location.state?.profileData,
    pathname: location.pathname,
    locationState: location.state
  });

  // Fetch existing profile data if in edit mode and no data passed via state
  useEffect(() => {
    const fetchExistingProfile = async () => {
      if (isEditMode && !location.state?.profileData && !dataInitialized) {
        setIsLoadingProfile(true);
        try {
          console.log('🔄 Fetching existing profile data for edit...');
          const existingProfile = await getProfile();
          if (existingProfile) {
            console.log('✅ Found existing profile:', existingProfile);
            setInitialProfileData(existingProfile);
          } else {
            console.log('⚠️ No existing profile found');
          }
        } catch (error) {
          console.error('❌ Error fetching profile:', error);
        } finally {
          setIsLoadingProfile(false);
          setDataInitialized(true);
        }
      } else if (location.state?.profileData && !dataInitialized) {
        console.log('📋 Using profile data from state');
        setInitialProfileData(location.state.profileData);
        setDataInitialized(true);
      } else if (!isEditMode && !dataInitialized) {
        console.log('🆕 New profile setup - no data to fetch');
        setDataInitialized(true);
      }
    };

    fetchExistingProfile();
  }, [isEditMode, location.state?.profileData, getProfile, dataInitialized]);
  
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
    isDataInitialized,
  } = useProfileSetup(totalSteps, initialProfileData);

  console.log('🔧 ProfileSetup hook state:', {
    currentStep,
    isEditMode,
    hasProfileData: !!profileData,
    profileDataKeys: profileData ? Object.keys(profileData) : [],
    isLoadingProfile,
    isDataInitialized,
    dataInitialized
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Photos data={profileData} updateData={updateData} triggerValidation={triggerValidation} isEditMode={isEditMode} />;
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

  // Show loading state while fetching profile data or initializing
  if (isLoadingProfile || !dataInitialized || !isDataInitialized) {
    return (
      <div className="min-h-screen bg-card-charcoal text-white">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="shadow-premium bg-card-dark-gray border border-card-gold/20">
            <CardHeader className="text-center">
              <Skeleton className="h-8 w-64 mx-auto mb-4 bg-slate-700" />
              <Skeleton className="h-2 w-full bg-slate-700" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-card-gold mx-auto"></div>
                <p className="text-card-gold text-lg">
                  {isEditMode ? 'Loading your profile details...' : 'Preparing your profile setup...'}
                </p>
                <p className="text-gray-400 text-sm">
                  {isEditMode ? 'We\'re fetching your current information so you can make updates' : 'Please wait while we set everything up for you'}
                </p>
              </div>
              
              {/* Loading skeleton for form fields */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-32 bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
                <Skeleton className="h-4 w-32 bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
                <Skeleton className="h-4 w-32 bg-slate-700" />
                <Skeleton className="h-20 w-full bg-slate-700" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-card-charcoal text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-premium bg-card-dark-gray border border-card-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-card-gold mb-2">
              {isEditMode ? 'Edit Your Profile' : 'Complete Your Profile'}
            </CardTitle>
            {isEditMode && (
              <p className="text-gray-400 text-sm mb-4">
                Your current information is pre-filled. Update any fields you'd like to change.
              </p>
            )}
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
