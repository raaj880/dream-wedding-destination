
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileData } from '@/types/profile';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { useProfileViewing } from '@/hooks/useProfileViewing';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { transformRawProfile } from '@/utils/profileTransformer';

export const useProfilePageLogic = () => {
  const navigate = useNavigate();
  const { id: profileId } = useParams();
  const { user } = useAuth();
  const { getProfile, loading, replaceMainProfilePhoto } = useProfile();
  const { recordProfileView } = useProfileViewing();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          let rawProfile;
          
          if (profileId && profileId !== user.id) {
            // Viewing someone else's profile
            console.log('🔍 Fetching profile for user:', profileId);
            setIsOwnProfile(false);
            
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', profileId)
              .single();
              
            if (error) {
              console.error('❌ Error fetching other user profile:', error);
              toast({
                title: "Profile Not Found",
                description: "Could not load the requested profile.",
                variant: "destructive",
              });
              navigate('/dashboard');
              return;
            }
            
            rawProfile = data;
            
            // Record the profile view
            await recordProfileView(profileId);
          } else {
            // Viewing own profile
            console.log('🔍 Fetching own profile for user:', user.id);
            setIsOwnProfile(true);
            rawProfile = await getProfile();
          }
          
          if (rawProfile) {
            // Store verification status
            setIsVerified(rawProfile.is_verified || false);
            
            const transformedProfile = transformRawProfile(rawProfile);
            console.log('✅ Profile transformed successfully:', transformedProfile);
            setProfileData(transformedProfile);
          } else if (isOwnProfile) {
            console.log('❌ No profile found, redirecting to setup');
            // If no profile exists, redirect to setup
            navigate('/profile-setup', { replace: true });
          }
        } catch (error) {
          console.error('❌ Error fetching profile:', error);
          toast({
            title: "Error Loading Profile",
            description: "Could not load the profile. Please try again.",
            variant: "destructive",
          });
        }
      }
    };
    fetchProfile();
  }, [user, profileId, getProfile, navigate, recordProfileView, isOwnProfile]);

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOwnProfile) return; // Only allow photo changes on own profile
    
    if (event.target.files && event.target.files[0] && profileData) {
      const file = event.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      try {
        const updatedRawProfile = await replaceMainProfilePhoto(file, profileData.photoPreviews);
        if (updatedRawProfile) {
          const transformedProfile = transformRawProfile(updatedRawProfile);
          setProfileData(transformedProfile);
          toast({
            title: "Profile Photo Updated!",
            description: "Your new photo is now your main profile picture.",
          });
        }
      } catch (error) {
        console.error('❌ Error updating photo:', error);
        toast({
          title: "Photo Update Failed",
          description: "Could not update your profile photo. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditProfile = () => {
    if (!isOwnProfile) return; // Only allow editing own profile
    
    console.log('🔧 Edit profile clicked, current profile data:', profileData);
    
    if (profileData) {
      // Navigate to profile setup with current profile data
      navigate('/profile-setup', { 
        state: { profileData },
        replace: false 
      });
    } else {
      console.error('❌ No profile data available for editing');
      toast({
        title: "Could Not Edit Profile",
        description: "Your profile data is not available at the moment. Please try again.",
        variant: "destructive",
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
