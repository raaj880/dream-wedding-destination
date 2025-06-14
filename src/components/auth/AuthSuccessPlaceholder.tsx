
import React from 'react';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';

interface AuthSuccessPlaceholderProps {
  onSetupProfile: () => void;
}

const AuthSuccessPlaceholder: React.FC<AuthSuccessPlaceholderProps> = ({ onSetupProfile }) => {
  return (
    <div className="text-center p-8 max-w-md mx-auto">
      <PartyPopper className="w-16 h-16 text-deep-blue mx-auto mb-6" />
      <h2 className="text-2xl font-semibold text-deep-blue mb-3">Welcome to Wedder!</h2>
      <p className="text-gray-600 mb-8">Let’s build your profile and find your perfect match.</p>
      <Button 
        onClick={onSetupProfile}
        className="w-full bg-deep-blue text-white hover:bg-deep-blue/90 rounded-full"
      >
        Start Profile Setup
      </Button>
    </div>
  );
};

export default AuthSuccessPlaceholder;
