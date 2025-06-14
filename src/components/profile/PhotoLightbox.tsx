
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProfileData } from '@/types/profile';
import { X } from 'lucide-react';

interface PhotoLightboxProps {
  photos: ProfileData['photoPreviews'];
  selectedIndex: number | null;
  onClose: () => void;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photos, selectedIndex, onClose }) => {
  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex, onClose]);

  if (selectedIndex === null || !photos[selectedIndex]) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full max-h-full" onClick={(e) => e.stopPropagation()}>
        <img 
          src={photos[selectedIndex]} 
          alt={`Photo ${selectedIndex + 1}`}
          className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          loading="eager"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 rounded-full"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
        
        {/* Photo counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {selectedIndex + 1} of {photos.length}
        </div>
      </div>
    </div>
  );
};

export default PhotoLightbox;
