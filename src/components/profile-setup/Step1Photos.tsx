
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Image as ImageIcon, XCircle } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface Step1PhotosProps {
  data: ProfileData;
  updateData: (newData: Partial<ProfileData>) => void;
  triggerValidation: () => boolean;
}

const MAX_PHOTOS = 3;

const Step1Photos: React.FC<Step1PhotosProps> = ({ data, updateData, triggerValidation }) => {
  const [localPhotoPreviews, setLocalPhotoPreviews] = useState<string[]>(data.photoPreviews);
  const [localPhotos, setLocalPhotos] = useState<File[]>(data.photos);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newPhotos: File[] = [];
      const newPreviews: string[] = [];

      filesArray.slice(0, MAX_PHOTOS - localPhotos.length).forEach(file => {
        newPhotos.push(file);
        newPreviews.push(URL.createObjectURL(file));
      });

      const updatedPhotos = [...localPhotos, ...newPhotos];
      const updatedPreviews = [...localPhotoPreviews, ...newPreviews];
      
      setLocalPhotos(updatedPhotos);
      setLocalPhotoPreviews(updatedPreviews);
      updateData({ photos: updatedPhotos, photoPreviews: updatedPreviews });
      triggerValidation();
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = localPhotos.filter((_, i) => i !== index);
    const updatedPreviews = localPhotoPreviews.filter((_, i) => i !== index);
    
    updatedPreviews.forEach(preview => {
      if (localPhotoPreviews.includes(preview) && !updatedPreviews.includes(preview)) {
        URL.revokeObjectURL(preview);
      }
    });

    setLocalPhotos(updatedPhotos);
    setLocalPhotoPreviews(updatedPreviews);
    updateData({ photos: updatedPhotos, photoPreviews: updatedPreviews });
    triggerValidation();
  };
  
  // Clean up object URLs on component unmount
  React.useEffect(() => {
    return () => {
      localPhotoPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [localPhotoPreviews]);

  return (
    <Card className="w-full animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-deep-blue dark:text-white flex items-center">
          Add Your Best Photos <span className="ml-2">📸</span>
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Profiles with photos get 7x more matches! Upload 1-3 photos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-deep-blue dark:hover:border-soft-pink transition-colors">
          <label htmlFor="photo-upload" className="cursor-pointer">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drag & drop your photos here, or{' '}
              <span className="font-semibold text-deep-blue dark:text-soft-pink">click to browse</span>.
            </p>
            <Input
              id="photo-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={localPhotos.length >= MAX_PHOTOS}
            />
          </label>
        </div>

        {localPhotoPreviews.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Uploaded Photos:</h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {localPhotoPreviews.map((previewUrl, index) => (
                <div key={index} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden shadow">
                  <img src={previewUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 bg-black/50 text-white hover:bg-black/70 w-6 h-6"
                    onClick={() => removePhoto(index)}
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
         {localPhotos.length < MAX_PHOTOS && (
          <Button
            variant="outline"
            className="w-full border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-deep-blue dark:border-deep-blue dark:text-deep-blue dark:hover:bg-deep-blue dark:hover:text-soft-pink"
            onClick={() => document.getElementById('photo-upload')?.click()}
            disabled={localPhotos.length >= MAX_PHOTOS}
          >
            <ImageIcon className="mr-2 h-4 w-4" /> Add Photo ({localPhotos.length}/{MAX_PHOTOS})
          </Button>
        )}
        {data.photos.length === 0 && triggerValidation() && <p className="text-sm text-red-500">Please upload at least one photo.</p>}
      </CardContent>
    </Card>
  );
};

export default Step1Photos;
