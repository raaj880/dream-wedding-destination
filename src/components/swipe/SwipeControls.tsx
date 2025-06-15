
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, X, Star } from 'lucide-react';

interface SwipeControlsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperLike: () => void;
  disabled?: boolean;
}

const SwipeControls: React.FC<SwipeControlsProps> = ({
  onPass,
  onLike,
  onSuperLike,
  disabled = false
}) => {
  return (
    <div className="flex justify-center items-center gap-4 py-6">
      <Button
        onClick={onPass}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="rounded-full w-16 h-16 border-2 border-destructive hover:border-destructive/80 hover:bg-destructive/10 transition-colors bg-card"
      >
        <X className="w-8 h-8 text-destructive" />
      </Button>
      
      <Button
        onClick={onSuperLike}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="rounded-full w-14 h-14 border-2 border-primary hover:border-primary/80 hover:bg-primary/10 transition-colors bg-card"
      >
        <Star className="w-6 h-6 text-primary" />
      </Button>
      
      <Button
        onClick={onLike}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="rounded-full w-16 h-16 border-2 border-secondary hover:border-secondary/80 hover:bg-secondary/10 transition-colors bg-card"
      >
        <Heart className="w-8 h-8 text-secondary" />
      </Button>
    </div>
  );
};

export default SwipeControls;
