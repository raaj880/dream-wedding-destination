
import React from 'react';
import { Button } from '@/components/ui/button';
import { Chrome, Smartphone } from 'lucide-react';

interface SocialAuthButtonsProps {
  actionText?: string;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ actionText = "Continue" }) => {
  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full h-12 border-card-gold/30 bg-transparent text-white hover:bg-card-gold/10 hover:border-card-gold/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm rounded-xl font-medium"
      >
        <Chrome className="mr-3 h-5 w-5 text-card-gold" />
        {actionText} with Google
      </Button>
      <Button 
        variant="outline" 
        className="w-full h-12 bg-white text-black hover:bg-gray-100 border-white hover:border-gray-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm rounded-xl font-medium"
      >
        <Smartphone className="mr-3 h-5 w-5" />
        {actionText} with Apple
      </Button>
    </div>
  );
};

export default SocialAuthButtons;
