
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Settings } from 'lucide-react';

interface ProfileActionsProps {
  onEditProfile?: () => void;
  onSettings?: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onEditProfile, onSettings }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 space-y-3 z-10">
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
  );
};

export default ProfileActions;
