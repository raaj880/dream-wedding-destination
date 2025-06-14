
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProfileData } from '@/types/profile';
import { Lock } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import ProfileSummary from './ProfileSummary';
import ProfileAbout from './ProfileAbout';
import ProfilePreferences from './ProfilePreferences';
import ProfileGallery from './ProfileGallery';
import PhotoLightbox from './PhotoLightbox';
import ProfileActions from './ProfileActions';

interface ProfileScreenProps {
  profileData: ProfileData;
  onEditProfile: () => void;
  onSettings: () => void;
  onPhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ profileData, onEditProfile, onSettings, onPhotoChange }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProfileHeader profileData={profileData} onPhotoChange={onPhotoChange} />

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 px-6 pb-24">
        <div className="space-y-6">
          <ProfileSummary profileData={profileData} />
          <ProfileAbout bio={profileData.bio} />
          <ProfilePreferences profileData={profileData} />
          <ProfileGallery 
            photoPreviews={profileData.photoPreviews}
            onPhotoSelect={setSelectedPhotoIndex} 
          />

          {/* Trust & Privacy */}
          <Card className="shadow-md border-0 bg-soft-pink/10 dark:bg-deep-blue/10 border-soft-pink/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Your data is safe. Only visible to matching profiles.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <ProfileActions onEditProfile={onEditProfile} onSettings={onSettings} />

      <PhotoLightbox 
        photos={profileData.photoPreviews}
        selectedIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
      />
    </div>
  );
};

export default ProfileScreen;
