
import React from 'react';
import { Button } from '@/components/ui/button';
import { icons } from 'lucide-react'; // Using generic icons import

const GoogleIcon = icons['Google']; // Dynamically get Google icon
const AppleIcon = icons['Apple'];   // Dynamically get Apple icon


interface SocialAuthButtonsProps {
  actionText?: string;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ actionText = "Continue" }) => {
  return (
    <div className="space-y-3">
      <Button variant="outline" className="w-full">
        {GoogleIcon && <GoogleIcon className="mr-2 h-5 w-5" />}
        {actionText} with Google
      </Button>
      <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800 hover:text-white">
        {AppleIcon && <AppleIcon className="mr-2 h-5 w-5" />}
        {actionText} with Apple
      </Button>
    </div>
  );
};

export default SocialAuthButtons;
