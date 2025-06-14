
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProfileData } from '@/types/profile';
import { User, MapPin, Briefcase, Ruler, Church, Users, MessageCircle, GraduationCap, Heart, Settings, Edit, Lock, Eye } from 'lucide-react';
import { differenceInYears } from 'date-fns';
import { cn } from '@/lib/utils';

interface ProfileScreenProps {
  profileData: ProfileData;
  onEditProfile: () => void;
  onSettings: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ profileData, onEditProfile, onSettings }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const getAge = (dob?: Date) => {
    if (!dob) return 'N/A';
    return differenceInYears(new Date(), dob);
  };

  const getMarriageTimeframe = (timeframe: string) => {
    switch (timeframe) {
      case '6m': return 'Within 6 months';
      case '1y': return 'Within 1 year';
      case '2y': return 'Within 2 years';
      case 'norush': return 'No rush';
      default: return 'Not specified';
    }
  };

  const getVisibilityText = (visibility: string) => {
    switch (visibility) {
      case 'everyone': return 'Everyone';
      case 'matches': return 'Matches Only';
      case 'match_family': return 'Matches & Their Family';
      default: return 'Not specified';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section with Background */}
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
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl ring-2 ring-soft-pink/50">
                <AvatarImage src={profileData.photoPreviews[0]} alt={profileData.fullName} />
                <AvatarFallback className="bg-gray-200 text-2xl font-semibold text-deep-blue">
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
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

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 px-6 pb-24">
        <div className="space-y-6">
          {/* Quick Summary Card */}
          <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white">
                Quick Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {profileData.profession && (
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-deep-blue dark:text-soft-pink" />
                    <span className="text-gray-700 dark:text-gray-300">{profileData.profession}</span>
                  </div>
                )}
                
                {profileData.height && (
                  <div className="flex items-center space-x-3">
                    <Ruler className="w-5 h-5 text-deep-blue dark:text-soft-pink" />
                    <span className="text-gray-700 dark:text-gray-300">{profileData.height}</span>
                  </div>
                )}
                
                {profileData.religion && (
                  <div className="flex items-center space-x-3">
                    <Church className="w-5 h-5 text-deep-blue dark:text-soft-pink" />
                    <span className="text-gray-700 dark:text-gray-300">{profileData.religion}</span>
                  </div>
                )}
                
                {profileData.community && (
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-deep-blue dark:text-soft-pink" />
                    <span className="text-gray-700 dark:text-gray-300">{profileData.community}</span>
                  </div>
                )}
                
                {profileData.languages && (
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-deep-blue dark:text-soft-pink" />
                    <span className="text-gray-700 dark:text-gray-300">{profileData.languages}</span>
                  </div>
                )}
                
                {profileData.education && (
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-deep-blue dark:text-soft-pink" />
                    <span className="text-gray-700 dark:text-gray-300">{profileData.education}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* About Me Section */}
          {profileData.bio && (
            <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white">
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {profileData.bio}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Marriage Preferences */}
          <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Marriage Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {profileData.marryTimeframe && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Looking to Marry:</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {getMarriageTimeframe(profileData.marryTimeframe)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Age Preference:</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {profileData.partnerAgeRange[0]}–{profileData.partnerAgeRange[1]} years
                  </span>
                </div>
                
                {profileData.partnerLocation && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Preferred Location:</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {profileData.partnerLocation}
                    </span>
                  </div>
                )}
                
                {profileData.profileVisibility && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Visibility Mode:</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {getVisibilityText(profileData.profileVisibility)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Photo Gallery */}
          {profileData.photoPreviews.length > 1 && (
            <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white">
                  Photo Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {profileData.photoPreviews.map((photo, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-deep-blue transition-all"
                      onClick={() => setSelectedPhotoIndex(index)}
                    >
                      <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

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

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <Button 
          onClick={onEditProfile}
          className="w-full bg-deep-blue text-white hover:bg-deep-blue/90 rounded-full py-3 font-medium"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit My Profile
        </Button>
        
        <Button 
          onClick={onSettings}
          variant="outline"
          className="w-full border-soft-pink text-deep-blue hover:bg-soft-pink/10 rounded-full py-3 dark:border-deep-blue dark:text-soft-pink dark:hover:bg-deep-blue/10"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Photo Lightbox */}
      {selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div className="relative max-w-lg w-full">
            <img 
              src={profileData.photoPreviews[selectedPhotoIndex]} 
              alt={`Photo ${selectedPhotoIndex + 1}`}
              className="w-full h-auto rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
