
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileScreen from '@/components/profile/ProfileScreen';
import { ProfileData } from '@/types/profile';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { useProfileViewing } from '@/hooks/useProfileViewing';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { id: profileId } = useParams();
  const { user } = useAuth();
  const { getProfile, loading, replaceMainProfilePhoto } = useProfile();
  const { recordProfileView } = useProfileViewing();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(true);

  const transformRawProfile = (rawProfile: Tables<'profiles'>): ProfileData => {
    console.log('🔄 Transforming raw profile:', rawProfile);
    
    // Improved date parsing to handle timezone issues
    let dobDate: Date | undefined = undefined;
    if (rawProfile.date_of_birth) {
      try {
        // Parse the date string more carefully
        const dateStr = rawProfile.date_of_birth;
        dobDate = new Date(dateStr + 'T12:00:00'); // Add noon time to avoid timezone issues
      } catch (error) {
        console.warn('Date parsing error:', error);
      }
    }
    
    return {
      fullName: rawProfile.full_name || '',
      dob: dobDate,
      gender: (rawProfile.gender as ProfileData['gender']) || '',
      location: rawProfile.location || '',
      religion: rawProfile.religion || '',
      community: rawProfile.community || '',
      languages: rawProfile.languages?.join(', ') || '',
      profession: rawProfile.profession || '',
      education: rawProfile.education || '',
      height: rawProfile.height || '',
      marryTimeframe: (rawProfile.marry_timeframe as ProfileData['marryTimeframe']) || '',
      // Ensure valid age range with proper bounds
      partnerAgeRange: [
        Math.max(18, rawProfile.partner_age_range_min || 20), 
        Math.min(100, rawProfile.partner_age_range_max || 40)
      ],
      partnerLocation: rawProfile.partner_location || '',
      profileVisibility: (rawProfile.profile_visibility as ProfileData['profileVisibility']) || 'everyone',
      bio: rawProfile.bio || '',
      photos: [], // Always empty for existing profiles since these are File objects
      photoPreviews: rawProfile.photos || [], // URLs from database
    };
  };

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

  if (loading || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProfileScreen 
      profileData={profileData}
      onEditProfile={isOwnProfile ? handleEditProfile : undefined}
      onSettings={isOwnProfile ? handleSettings : undefined}
      onPhotoChange={isOwnProfile ? handlePhotoChange : undefined}
      isOwnProfile={isOwnProfile}
    />
  );
};

export default ProfilePage;
