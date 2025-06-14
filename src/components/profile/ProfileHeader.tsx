
import React from 'react';
import { ProfileData } from '@/types/profile';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Edit } from 'lucide-react';
import { differenceInYears } from 'date-fns';

interface ProfileHeaderProps {
  profileData: ProfileData;
  onPhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const getAge = (dob?: Date) => {
  if (!dob) return 'N/A';
  return differenceInYears(new Date(), dob);
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profileData, onPhotoChange }) => {
  return (
    <div className="relative">
      {/* Background Banner */}
      <div className="h-48 bg-gradient-to-br from-deep-blue via-deep-blue/90 to-deep-blue/80 relative overflow-hidden">
        {profileData.photoPreviews[0] && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
            style={{ backgroundImage: `url(${profileData.photoPreviews[0]})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Profile Picture & Basic Info */}
      <div className="relative -mt-16 px-6 pb-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
             <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPhotoChange}
            />
            <label htmlFor="avatar-upload" className="cursor-pointer group relative block">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl ring-2 ring-soft-pink/50">
                <AvatarImage src={profileData.photoPreviews[0]} alt={profileData.fullName} />
                <AvatarFallback className="bg-gray-200 text-2xl font-semibold text-deep-blue">
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Edit className="w-8 h-8 text-white" />
              </div>
            </label>

            <div className="absolute -bottom-2 -right-2">
              <Badge className="bg-green-500 text-white px-2 py-1 text-xs font-medium">
                ✅ Verified
              </Badge>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-deep-blue dark:text-white mb-1">
              {profileData.fullName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {getAge(profileData.dob)} years old
            </p>
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{profileData.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
