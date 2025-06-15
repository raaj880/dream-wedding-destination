
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from './ProfileHeader';
import ProfileGallery from './ProfileGallery';
import ProfileSummary from './ProfileSummary';
import ProfileAbout from './ProfileAbout';
import ProfilePreferences from './ProfilePreferences';
import ProfileActions from './ProfileActions';
import PhotoLightbox from './PhotoLightbox';
import { ProfileData } from '@/types/profile';

interface ProfileScreenProps {
  profileData: ProfileData;
  onEditProfile?: () => void;
  onSettings?: () => void;
  onPhotoChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isOwnProfile?: boolean;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profileData,
  onEditProfile,
  onSettings,
  onPhotoChange,
  isOwnProfile = true
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  // Ensure we have proper photo previews for display
  const displayPhotos = profileData.photoPreviews && profileData.photoPreviews.length > 0 
    ? profileData.photoPreviews 
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProfileHeader 
        profileData={profileData}
        onPhotoChange={isOwnProfile ? onPhotoChange : undefined}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileGallery 
            photoPreviews={displayPhotos} 
            onPhotoSelect={openLightbox}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ProfileSummary profileData={profileData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProfileAbout bio={profileData.bio} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ProfilePreferences profileData={profileData} />
        </motion.div>

        {isOwnProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ProfileActions 
              onEditProfile={onEditProfile}
              onSettings={onSettings}
            />
          </motion.div>
        )}
      </div>

      {selectedPhotoIndex !== null && displayPhotos.length > 0 && (
        <PhotoLightbox
          photos={displayPhotos}
          selectedIndex={selectedPhotoIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
};

export default ProfileScreen;
