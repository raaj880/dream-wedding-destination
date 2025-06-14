
import React from 'react';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';

interface AuthSuccessPlaceholderProps {
  onSetupProfile: () => void;
}

const AuthSuccessPlaceholder: React.FC<AuthSuccessPlaceholderProps> = ({ onSetupProfile }) => {
  return (
    <div className="text-center p-8 max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500 ease-out">
      <PartyPopper className="w-16 h-16 text-deep-blue mx-auto mb-6 animate-in fade-in-0 zoom-in-50 delay-200 duration-500" />
      <h2 className="text-2xl font-semibold text-deep-blue mb-3 animate-in fade-in-0 slide-in-from-bottom-3 delay-300 duration-500">Welcome to Wedder!</h2>
      <p className="text-gray-600 mb-8 animate-in fade-in-0 slide-in-from-bottom-3 delay-400 duration-500">Let’s build your profile and find your perfect match.</p>
      <Button 
        onClick={onSetupProfile}
        className="w-full bg-deep-blue text-white hover:bg-deep-blue/90 rounded-full transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-md active:scale-[0.98] animate-in fade-in-0 slide-in-from-bottom-3 delay-500 duration-500"
      >
        Start Profile Setup
      </Button>
    </div>
  );
};

export default AuthSuccessPlaceholder;
