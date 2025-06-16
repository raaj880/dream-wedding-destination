
import React from 'react';
import { Heart, Lock, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MatchRequiredCardProps {
  userName?: string;
  onClose?: () => void;
}

const MatchRequiredCard: React.FC<MatchRequiredCardProps> = ({ 
  userName = "this person", 
  onClose 
}) => {
  return (
    <Card className="max-w-md mx-auto border-primary/20">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">
          Match Required
        </h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          You need to mutually like each other before you can start messaging. 
          Like {userName}'s profile and wait for them to like you back to unlock messaging!
        </p>
        
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="flex items-center space-x-1 text-primary">
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm">You like them</span>
          </div>
          <div className="text-muted-foreground">+</div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Heart className="w-4 h-4" />
            <span className="text-sm">They like you</span>
          </div>
          <div className="text-muted-foreground">=</div>
          <div className="flex items-center space-x-1 text-secondary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Match!</span>
          </div>
        </div>
        
        {onClose && (
          <Button variant="outline" onClick={onClose} className="w-full">
            Got it
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchRequiredCard;
