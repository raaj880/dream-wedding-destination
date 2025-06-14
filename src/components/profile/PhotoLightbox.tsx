
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProfileData } from '@/types/profile';

interface PhotoLightboxProps {
  photos: ProfileData['photoPreviews'];
  selectedIndex: number | null;
  onClose: () => void;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photos, selectedIndex, onClose }) => {
  if (selectedIndex === null) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-lg w-full">
        <img 
          src={photos[selectedIndex]} 
          alt={`Photo ${selectedIndex + 1}`}
          className="w-full h-auto rounded-lg"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
          onClick={onClose}
        >
          ✕
        </Button>
      </div>
    </div>
  );
};

export default PhotoLightbox;
