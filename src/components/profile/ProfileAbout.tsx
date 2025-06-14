
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileData } from '@/types/profile';

interface ProfileAboutProps {
  bio: ProfileData['bio'];
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({ bio }) => {
  if (!bio) return null;

  return (
    <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white">
          About Me
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {bio}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProfileAbout;
