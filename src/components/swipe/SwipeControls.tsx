
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
        className="rounded-full w-16 h-16 border-2 border-red-500 hover:border-red-400 hover:bg-red-50 transition-colors bg-black"
      >
        <X className="w-8 h-8 text-red-500" />
      </Button>
      
      <Button
        onClick={onSuperLike}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="rounded-full w-14 h-14 border-2 border-blue-500 hover:border-blue-400 hover:bg-blue-50 transition-colors bg-black"
      >
        <Star className="w-6 h-6 text-blue-500" />
      </Button>
      
      <Button
        onClick={onLike}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="rounded-full w-16 h-16 border-2 border-green-500 hover:border-green-400 hover:bg-green-50 transition-colors bg-black"
      >
        <Heart className="w-8 h-8 text-green-500" />
      </Button>
    </div>
  );
};

export default SwipeControls;
