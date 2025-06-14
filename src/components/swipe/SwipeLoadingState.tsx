
import React from 'react';

interface SwipeLoadingStateProps {
  isRefreshing: boolean;
}

const SwipeLoadingState: React.FC<SwipeLoadingStateProps> = ({ isRefreshing }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deep-blue mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">
          {isRefreshing ? 'Refreshing profiles...' : 'Finding perfect matches...'}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          This may take a moment
        </p>
      </div>
    </div>
  );
};

export default SwipeLoadingState;
