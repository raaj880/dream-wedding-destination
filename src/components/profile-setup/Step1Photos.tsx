
import React from 'react';
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
  // Use a ref to keep track of blob URLs for cleanup, avoiding stale closures.
  const blobUrlsRef = React.useRef<string[]>([]);
  blobUrlsRef.current = data.photoPreviews.filter(p => p.startsWith('blob:'));

  const hasExistingPhotos = data.photoPreviews.some(url => !url.startsWith('blob:'));
  const totalPhotos = data.photoPreviews.length;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const filesToAdd = filesArray.slice(0, MAX_PHOTOS - totalPhotos);

      if (filesToAdd.length === 0) return;

      const newBlobPreviews = filesToAdd.map(file => URL.createObjectURL(file));
      const updatedPreviews = [...data.photoPreviews, ...newBlobPreviews];
      const updatedNewFiles = [...data.photos, ...filesToAdd];
      
      updateData({ photos: updatedNewFiles, photoPreviews: updatedPreviews });
      // Use a microtask to allow state to update before validation
      queueMicrotask(triggerValidation);
    }
  };

  const removePhoto = (index: number) => {
    const urlToRemove = data.photoPreviews[index];
    const updatedPreviews = data.photoPreviews.filter((_, i) => i !== index);
    let updatedPhotos = [...data.photos];

    if (urlToRemove.startsWith('blob:')) {
      // Find the index of the blob URL among all blob URLs to safely remove the corresponding file.
      const allBlobPreviews = data.photoPreviews.filter(p => p.startsWith('blob:'));
      const indexAmongBlobs = allBlobPreviews.indexOf(urlToRemove);

      if (indexAmongBlobs > -1) {
        updatedPhotos.splice(indexAmongBlobs, 1);
      }
      
      URL.revokeObjectURL(urlToRemove);
    }
    
    updateData({ photos: updatedPhotos, photoPreviews: updatedPreviews });
    queueMicrotask(triggerValidation);
  };
  
  // Clean up any created object URLs when the component unmounts.
  React.useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <Card className="w-full animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-semibold text-card-gold flex items-center">
          {hasExistingPhotos ? 'Manage Your Photos' : 'Add Your Best Photos'} <span className="ml-2">📸</span>
        </CardTitle>
        <CardDescription className="text-gray-400">
          {hasExistingPhotos 
            ? 'You can add more photos or remove existing ones. Your profile looks great!'
            : 'Profiles with photos get 7x more matches! Upload 1-3 photos.'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        {totalPhotos < MAX_PHOTOS && (
          <div className="border-2 border-dashed border-card-gold/30 rounded-xl p-6 text-center cursor-pointer hover:border-card-gold transition-colors">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <UploadCloud className="mx-auto h-12 w-12 text-card-gold/70 mb-2" />
              <p className="text-sm text-gray-400">
                Drag & drop your photos here, or{' '}
                <span className="font-semibold text-card-gold">click to browse</span>.
              </p>
              <Input
                id="photo-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={totalPhotos >= MAX_PHOTOS}
              />
            </label>
          </div>
        )}

        {totalPhotos > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              {hasExistingPhotos ? 'Your Photos:' : 'Uploaded Photos:'}
            </h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {data.photoPreviews.map((previewUrl, index) => (
                <div key={index} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden shadow-md border border-card-gold/20">
                  <img src={previewUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 bg-black/60 text-white hover:bg-black/80 w-6 h-6 rounded-full"
                    onClick={() => removePhoto(index)}
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-1 py-0.5 text-center font-semibold">
                      Main
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {totalPhotos < MAX_PHOTOS && (
          <Button
            variant="outline"
            className="w-full border-card-gold text-card-gold hover:bg-card-gold hover:text-card-black font-semibold"
            onClick={() => document.getElementById('photo-upload')?.click()}
            disabled={totalPhotos >= MAX_PHOTOS}
          >
            <ImageIcon className="mr-2 h-4 w-4" /> 
            {hasExistingPhotos ? 'Add More Photos' : 'Add Photo'} ({totalPhotos}/{MAX_PHOTOS})
          </Button>
        )}
        
        {totalPhotos === 0 && (
          <p className="text-sm text-red-500 text-center pt-2">Please upload at least one photo to continue.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Step1Photos;
