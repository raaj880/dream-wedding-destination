
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Sparkles, Heart, Users } from 'lucide-react';

interface AuthSuccessPlaceholderProps {
  onSetupProfile: () => void;
}

const AuthSuccessPlaceholder: React.FC<AuthSuccessPlaceholderProps> = ({ onSetupProfile }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="shadow-2xl rounded-3xl overflow-hidden border border-card-gold/30 bg-card-dark-gray/95 backdrop-blur-xl">
        <CardContent className="p-6 text-center space-y-4">
          {/* Success Icon with Animation */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-card-gold/20 to-card-accent/20 rounded-full animate-pulse"></div>
            </div>
            <CheckCircle className="w-12 h-12 text-card-gold relative z-10 animate-in zoom-in-50 duration-500 delay-200" />
          </div>

          {/* Welcome Message */}
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
            <h2 className="text-2xl font-bold text-white">
              Welcome to <span className="bg-gradient-to-r from-card-gold to-card-accent bg-clip-text text-transparent">Wedder!</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Your account has been successfully created. Let's set up your profile to find your perfect match.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-4 py-2 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-400">
            <div className="flex flex-col items-center space-y-1.5">
              <Heart className="w-7 h-7 text-card-gold/80" />
              <span className="text-xs text-gray-400">Find Love</span>
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <Users className="w-7 h-7 text-card-gold/80" />
              <span className="text-xs text-gray-400">Connect</span>
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <Sparkles className="w-7 h-7 text-card-gold/80" />
              <span className="text-xs text-gray-400">Discover</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-500">
            <Button 
              onClick={onSetupProfile}
              className="w-full bg-gradient-to-r from-card-gold to-card-accent text-black hover:from-card-gold/90 hover:to-card-accent/90 rounded-lg py-3 text-base font-semibold transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg shadow-card-gold/20"
            >
              Start Building Your Profile
            </Button>
            <p className="text-xs text-gray-500">
              It takes just 2-3 minutes to complete your profile
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthSuccessPlaceholder;
