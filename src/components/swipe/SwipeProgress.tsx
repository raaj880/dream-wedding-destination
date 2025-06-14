
import React from 'react';

interface SwipeProgressProps {
  currentIndex: number;
  totalProfiles: number;
  remainingProfiles: number;
  streak: number;
}

const SwipeProgress: React.FC<SwipeProgressProps> = ({
  currentIndex,
  totalProfiles,
  remainingProfiles,
  streak
}) => {
  return (
    <div className="text-center">
      <div className="bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
        <div 
          className="bg-gradient-to-r from-soft-pink to-deep-blue h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${totalProfiles > 0 ? (currentIndex / totalProfiles) * 100 : 0}%` 
          }}
        />
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-sm text-gray-600 font-medium">
          {remainingProfiles} profiles remaining
        </p>
        {streak > 2 && (
          <p className="text-xs text-purple-600">
            🔥 {streak} like streak!
          </p>
        )}
      </div>
    </div>
  );
};

export default SwipeProgress;
