
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface LoadMoreIndicatorProps {
  hasProfiles: boolean;
}

const LoadMoreIndicator: React.FC<LoadMoreIndicatorProps> = ({ hasProfiles }) => {
  if (!hasProfiles) return null;

  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center space-x-3 text-gray-500">
        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Scroll for more profiles</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <p className="text-xs text-gray-400 mt-2">New profiles are being loaded automatically</p>
    </div>
  );
};

export default LoadMoreIndicator;
