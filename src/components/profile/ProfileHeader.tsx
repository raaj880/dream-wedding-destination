
import React from 'react';
import { ProfileData } from '@/types/profile';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Edit, Settings, Check, Shield } from 'lucide-react';
import { differenceInYears } from 'date-fns';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  profileData: ProfileData;
  onPhotoChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onSettings?: () => void;
  isVerified?: boolean;
}

const getAge = (dob?: Date) => {
  if (!dob) return 'N/A';
  return differenceInYears(new Date(), dob);
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profileData, 
  onPhotoChange, 
  isOwnProfile, 
  onEditProfile, 
  onSettings, 
  isVerified = false 
}) => {
  return (
    <div className="relative">
      {isOwnProfile && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            onClick={onSettings}
            variant="ghost"
            size="icon"
            title="Settings"
            className="w-10 h-10 hover:bg-white/10 rounded-full text-foreground border border-border"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Background Banner */}
      <div className="h-48 bg-gradient-to-b from-card to-background relative overflow-hidden">
        {profileData.photoPreviews[0] && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 blur-md"
            style={{ backgroundImage: `url(${profileData.photoPreviews[0]})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
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
              disabled={!isOwnProfile}
            />
            <label htmlFor="avatar-upload" className={`${isOwnProfile ? 'cursor-pointer group' : ''} relative block`}>
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl ring-2 ring-primary/50">
                <AvatarImage src={profileData.photoPreviews[0]} alt={profileData.fullName} />
                <AvatarFallback className="bg-muted text-2xl font-semibold text-muted-foreground">
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Edit className="w-8 h-8 text-white" />
                </div>
              )}
            </label>

            <div className="absolute -bottom-2 -right-2">
              <Badge variant="highlight" className="h-8 w-8 p-0 flex items-center justify-center rounded-full border-2 border-background">
                <Check className="w-5 h-5" />
              </Badge>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-foreground">
                {profileData.fullName}
              </h1>
              {isVerified && (
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-primary fill-current" />
                </div>
              )}
            </div>
            <p className="text-subtle mb-2">
              {getAge(profileData.dob)} years old
            </p>
            <div className="flex items-center justify-center text-subtle">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{profileData.location}</span>
            </div>
          </div>

          {isOwnProfile && (
            <div className="mt-6 w-full max-w-xs">
              <Button
                onClick={onEditProfile}
                className="w-full bg-primary text-primary-foreground rounded-full py-3 font-medium text-base"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit My Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
