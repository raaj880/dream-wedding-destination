
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Settings } from 'lucide-react';

interface ProfileActionsProps {
  onEditProfile?: () => void;
  onSettings?: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onEditProfile, onSettings }) => {
  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-card-charcoal/90 border-t border-card-gold/20 p-4 space-y-3 z-10 backdrop-blur-sm safe-area-pb">
      <Button 
        onClick={onEditProfile}
        className="w-full gold-gradient text-black rounded-full py-3 font-medium text-base"
      >
        <Edit className="w-4 h-4 mr-2" />
        Edit My Profile
      </Button>
      
      <Button 
        onClick={onSettings}
        variant="outline"
        className="w-full border-card-gold text-card-gold hover:bg-card-gold/10 rounded-full py-3 text-base font-medium hover:text-white"
      >
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </Button>
    </div>
  );
};

export default ProfileActions;
