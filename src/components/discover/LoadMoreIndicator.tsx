
import React from 'react';

interface LoadMoreIndicatorProps {
  hasProfiles: boolean;
}

const LoadMoreIndicator: React.FC<LoadMoreIndicatorProps> = ({ hasProfiles }) => {
  if (!hasProfiles) return null;

  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center space-x-2 text-gray-500">
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
        <span className="text-sm">Scroll for more profiles</span>
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadMoreIndicator;
