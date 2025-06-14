
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileScreen from '@/components/profile/ProfileScreen';
import { ProfileData, initialProfileData } from '@/types/profile';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { Tables } from '@/integrations/supabase/types';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProfile, loading } = useProfile();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const transformRawProfile = (rawProfile: Tables<'profiles'>['Row']): ProfileData => {
    return {
      fullName: rawProfile.full_name || '',
      dob: rawProfile.date_of_birth ? new Date(rawProfile.date_of_birth) : undefined,
      gender: (rawProfile.gender as ProfileData['gender']) || '',
      location: rawProfile.location || '',
      religion: rawProfile.religion || '',
      community: rawProfile.community || '',
      languages: rawProfile.languages?.join(', ') || '',
      profession: rawProfile.profession || '',
      education: rawProfile.education || '',
      height: rawProfile.height || '',
      marryTimeframe: (rawProfile.marry_timeframe as ProfileData['marryTimeframe']) || '',
      partnerAgeRange: [rawProfile.partner_age_range_min || 20, rawProfile.partner_age_range_max || 40],
      partnerLocation: rawProfile.partner_location || '',
      profileVisibility: (rawProfile.profile_visibility as ProfileData['profileVisibility']) || '',
      bio: rawProfile.bio || '',
      photos: [], // Files are not fetched, only URLs
      photoPreviews: rawProfile.photos || [],
    };
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const rawProfile = await getProfile();
        if (rawProfile) {
          const transformedProfile = transformRawProfile(rawProfile);
          setProfileData(transformedProfile);
        } else {
          // If no profile exists, redirect to setup
          navigate('/profile-setup', { replace: true });
        }
      }
    };
    fetchProfile();
  }, [user, getProfile, navigate]);

  const handleEditProfile = () => {
    navigate('/profile-setup', { state: { profileData } });
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
    />
  );
};

export default ProfilePage;
