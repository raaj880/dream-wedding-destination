
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ProfileData } from '@/types/profile';
import ProfileHeader from './ProfileHeader';
import ProfileGallery from './ProfileGallery';
import ProfileSummary from './ProfileSummary';
import ProfileAbout from './ProfileAbout';
import ProfileJathaka from './ProfileJathaka';
import ProfilePreferences from './ProfilePreferences';

interface ProfileScreenProps {
  profileData: ProfileData;
  onEditProfile?: () => void;
  onSettings?: () => void;
  onPhotoChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isOwnProfile?: boolean;
  isVerified?: boolean;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  profileData, 
  onEditProfile, 
  onSettings, 
  onPhotoChange, 
  isOwnProfile = false,
  isVerified = false 
}) => {
  const navigate = useNavigate();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleBack = () => {
    if (isOwnProfile) {
      navigate('/dashboard');
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="ml-3 text-lg font-semibold text-foreground">
            {isOwnProfile ? 'My Profile' : 'Profile'}
          </h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pb-6">
        <ProfileHeader 
          profileData={profileData}
          onEditProfile={onEditProfile}
          onSettings={onSettings}
          onPhotoChange={onPhotoChange}
          isOwnProfile={isOwnProfile}
          isVerified={isVerified}
        />

        <div className="px-6 space-y-6 mt-6">
          <ProfileGallery 
            photoPreviews={profileData.photoPreviews}
            onPhotoSelect={(index) => setSelectedPhotoIndex(index)}
          />
          
          <ProfileSummary profileData={profileData} />
          
          <ProfileAbout bio={profileData.bio} />
          
          <ProfileJathaka profileData={profileData} />
          
          <ProfilePreferences profileData={profileData} />
        </div>
      </div>

      {/* Photo Lightbox */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={profileData.photoPreviews[selectedPhotoIndex]}
              alt={`Photo ${selectedPhotoIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
