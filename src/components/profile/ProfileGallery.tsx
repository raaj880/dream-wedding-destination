
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileData } from '@/types/profile';

interface ProfileGalleryProps {
  photoPreviews: ProfileData['photoPreviews'];
  onPhotoSelect: (index: number) => void;
}

const ProfileGallery: React.FC<ProfileGalleryProps> = ({ photoPreviews, onPhotoSelect }) => {
  if (photoPreviews.length <= 1) return null;

  return (
    <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white">
          Photo Gallery
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {photoPreviews.map((photo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-deep-blue transition-all"
              onClick={() => onPhotoSelect(index)}
            >
              <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileGallery;
