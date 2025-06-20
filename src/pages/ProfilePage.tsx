
import React from 'react';
import ProfileScreen from '@/components/profile/ProfileScreen';
import { useProfilePageLogic } from '@/hooks/useProfilePageLogic';

const ProfilePage: React.FC = () => {
  const {
    profileData,
    isOwnProfile,
    isVerified,
    loading,
    handlePhotoChange,
    handleEditProfile,
    handleSettings,
  } = useProfilePageLogic();

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
      isVerified={isVerified}
    />
  );
};

export default ProfilePage;
