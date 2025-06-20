
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Clock, MapPin } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface ProfileJathakaProps {
  profileData: Pick<ProfileData, 'timeOfBirth' | 'placeOfBirth' | 'rashi' | 'nakshatra' | 'gothra' | 'dosha'>;
}

const ProfileJathaka: React.FC<ProfileJathakaProps> = ({ profileData }) => {
  // Don't show if no Jathaka data is available
  if (!profileData.rashi && !profileData.nakshatra && !profileData.gothra) {
    return null;
  }

  return (
    <Card className="shadow-md border-0 bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center">
          <Star className="w-5 h-5 mr-2 text-primary" />
          Jathaka Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Birth Information */}
          {(profileData.timeOfBirth || profileData.placeOfBirth) && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground text-sm border-b border-border pb-1">
                Birth Information
              </h4>
              {profileData.timeOfBirth && (
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground mr-2">Time:</span>
                  <span className="text-foreground font-medium">
                    {new Date(`2000-01-01T${profileData.timeOfBirth}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
              )}
              {profileData.placeOfBirth && (
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground mr-2">Place:</span>
                  <span className="text-foreground font-medium">{profileData.placeOfBirth}</span>
                </div>
              )}
            </div>
          )}

          {/* Astrological Details */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground text-sm border-b border-border pb-1">
              Astrological Details
            </h4>
            {profileData.rashi && (
              <div className="flex items-start text-sm">
                <span className="text-muted-foreground mr-2 min-w-[60px]">Rashi:</span>
                <span className="text-foreground font-medium">{profileData.rashi}</span>
              </div>
            )}
            {profileData.nakshatra && (
              <div className="flex items-start text-sm">
                <span className="text-muted-foreground mr-2 min-w-[60px]">Nakshatra:</span>
                <span className="text-foreground font-medium">{profileData.nakshatra}</span>
              </div>
            )}
            {profileData.gothra && (
              <div className="flex items-start text-sm">
                <span className="text-muted-foreground mr-2 min-w-[60px]">Gothra:</span>
                <span className="text-foreground font-medium">{profileData.gothra}</span>
              </div>
            )}
            {profileData.dosha && (
              <div className="flex items-start text-sm">
                <span className="text-muted-foreground mr-2 min-w-[60px]">Dosha:</span>
                <span className={`font-medium ${
                  profileData.dosha === 'None' ? 'text-green-600' : 
                  profileData.dosha === 'Unknown' ? 'text-yellow-600' : 
                  'text-orange-600'
                }`}>
                  {profileData.dosha}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileJathaka;
