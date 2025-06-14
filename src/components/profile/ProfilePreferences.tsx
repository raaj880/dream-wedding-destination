
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileData } from '@/types/profile';
import { Heart, Eye } from 'lucide-react';

interface ProfilePreferencesProps {
  profileData: ProfileData;
}

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

const ProfilePreferences: React.FC<ProfilePreferencesProps> = ({ profileData }) => {
  return (
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
  );
};

export default ProfilePreferences;
