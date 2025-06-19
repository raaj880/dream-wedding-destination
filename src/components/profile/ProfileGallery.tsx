
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileData } from '@/types/profile';
import { ImageIcon } from 'lucide-react';

interface ProfileGalleryProps {
  photoPreviews: ProfileData['photoPreviews'];
  onPhotoSelect: (index: number) => void;
}

const ProfileGallery: React.FC<ProfileGalleryProps> = ({ photoPreviews, onPhotoSelect }) => {
  // Don't show gallery if there are no photos or only one photo
  if (photoPreviews.length <= 1) return null;

  return (
    <Card className="shadow-md border-0 bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center">
          <ImageIcon className="w-5 h-5 mr-2" />
          Photo Gallery ({photoPreviews.length} photos)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {photoPreviews.map((photo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all duration-200 hover:scale-105"
              onClick={() => onPhotoSelect(index)}
            >
              <img 
                src={photo} 
                alt={`Photo ${index + 1}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileGallery;
