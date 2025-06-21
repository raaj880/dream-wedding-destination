
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { transformRawProfile } from '@/utils/profileTransformer';
import { toast } from '@/components/ui/use-toast';

export const useProfilePageLogic = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getProfile, replaceMainProfilePhoto } = useProfile();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      setLoading(true);
      try {
        console.log('🔄 Fetching profile data for user:', user.id);
        const rawProfile = await getProfile();
        
        if (rawProfile) {
          console.log('✅ Raw profile data received:', rawProfile);
          const transformedProfile = transformRawProfile(rawProfile);
          console.log('✅ Transformed profile data:', transformedProfile);
          setProfileData(transformedProfile);
          setIsVerified(rawProfile.is_verified || false);
        } else {
          console.log('⚠️ No profile found, redirecting to setup');
          navigate('/profile-setup');
        }
      } catch (error) {
        console.error('❌ Error fetching profile:', error);
        toast({
          title: "Error Loading Profile",
          description: "Failed to load your profile data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, getProfile, navigate]);

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profileData) return;

    try {
      setLoading(true);
      console.log('🔄 Uploading new profile photo...');
      
      const updatedProfile = await replaceMainProfilePhoto(file, profileData.photoPreviews);
      
      if (updatedProfile) {
        const transformedProfile = transformRawProfile(updatedProfile);
        setProfileData(transformedProfile);
        toast({
          title: "Photo Updated",
          description: "Your profile photo has been updated successfully.",
        });
      }
    } catch (error) {
      console.error('❌ Error updating photo:', error);
      toast({
        title: "Photo Update Failed",
        description: "Failed to update your profile photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    if (profileData) {
      console.log('🔧 Navigating to edit profile with data:', profileData);
      navigate('/profile-setup/edit', { 
        state: { 
          profileData: profileData,
          isEditMode: true 
        } 
      });
    }
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return {
    profileData,
    isOwnProfile,
    isVerified,
    loading,
    handlePhotoChange,
    handleEditProfile,
    handleSettings,
  };
};
