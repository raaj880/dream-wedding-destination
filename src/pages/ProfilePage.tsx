
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileScreen from '@/components/profile/ProfileScreen';
import { ProfileData } from '@/types/profile';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/components/ui/use-toast';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProfile, loading, replaceMainProfilePhoto } = useProfile();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const transformRawProfile = (rawProfile: Tables<'profiles'>): ProfileData => {
    return {
      fullName: rawProfile.full_name || '',
      // Fix date parsing to avoid timezone issues
      dob: rawProfile.date_of_birth ? new Date(`${rawProfile.date_of_birth}T00:00:00`) : undefined,
      gender: (rawProfile.gender as ProfileData['gender']) || '',
      location: rawProfile.location || '',
      religion: rawProfile.religion || '',
      community: rawProfile.community || '',
      languages: rawProfile.languages?.join(', ') || '',
      profession: rawProfile.profession || '',
      education: rawProfile.education || '',
      height: rawProfile.height || '',
      marryTimeframe: (rawProfile.marry_timeframe as ProfileData['marryTimeframe']) || '',
      // Fix partner age range with proper defaults
      partnerAgeRange: [
        rawProfile.partner_age_range_min || 20, 
        rawProfile.partner_age_range_max || 40
      ],
      partnerLocation: rawProfile.partner_location || '',
      profileVisibility: (rawProfile.profile_visibility as ProfileData['profileVisibility']) || 'everyone',
      bio: rawProfile.bio || '',
      photos: [], // Files are not fetched, only URLs
      photoPreviews: rawProfile.photos || [],
    };
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const rawProfile = await getProfile();
          if (rawProfile) {
            const transformedProfile = transformRawProfile(rawProfile);
            setProfileData(transformedProfile);
          } else {
            // If no profile exists, redirect to setup
            navigate('/profile-setup', { replace: true });
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: "Error Loading Profile",
            description: "Could not load your profile. Please try again.",
            variant: "destructive",
          });
        }
      }
    };
    fetchProfile();
  }, [user, getProfile, navigate]);

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        console.error('Error updating photo:', error);
        toast({
          title: "Photo Update Failed",
          description: "Could not update your profile photo. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditProfile = () => {
    if (profileData) {
      navigate('/profile-setup', { state: { profileData } });
    } else {
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

  if (loading || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-deep-blue dark:border-soft-pink"></div>
      </div>
    );
  }

  return (
    <ProfileScreen 
      profileData={profileData}
      onEditProfile={handleEditProfile}
      onSettings={handleSettings}
      onPhotoChange={handlePhotoChange}
    />
  );
};

export default ProfilePage;
