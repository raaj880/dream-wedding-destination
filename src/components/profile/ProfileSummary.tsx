
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Ruler, Church, Users, MessageCircle, GraduationCap } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface ProfileSummaryProps {
  profileData: ProfileData;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ profileData }) => {
  return (
    <Card className="shadow-md border-0 bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Quick Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {profileData.profession && (
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">{profileData.profession}</span>
            </div>
          )}
          
          {profileData.height && (
            <div className="flex items-center space-x-3">
              <Ruler className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">{profileData.height}</span>
            </div>
          )}
          
          {profileData.religion && (
            <div className="flex items-center space-x-3">
              <Church className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">{profileData.religion}</span>
            </div>
          )}
          
          {profileData.community && (
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">{profileData.community}</span>
            </div>
          )}
          
          {profileData.languages && (
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">{profileData.languages}</span>
            </div>
          )}
          
          {profileData.education && (
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">{profileData.education}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
