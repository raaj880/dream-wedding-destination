
import React from 'react';
import { Button } from '@/components/ui/button';
import { icons } from 'lucide-react';

// Corrected: Use lowercase 'google' and 'apple' as per lucide-react-icons context
const GoogleIcon = icons['google'];
const AppleIcon = icons['apple'];

interface SocialAuthButtonsProps {
  actionText?: string;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ actionText = "Continue" }) => {
  return (
    <div className="space-y-3">
      <Button variant="outline" className="w-full transition-transform duration-200 hover:scale-[1.02] hover:shadow-sm">
        {GoogleIcon && <GoogleIcon className="mr-2 h-5 w-5" />}
        {actionText} with Google
      </Button>
      <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800 hover:text-white transition-transform duration-200 hover:scale-[1.02] hover:shadow-sm">
        {AppleIcon && <AppleIcon className="mr-2 h-5 w-5" />}
        {actionText} with Apple
      </Button>
    </div>
  );
};

export default SocialAuthButtons;
