
import React from 'react';
import { Button } from '@/components/ui/button';
import SwipeHeader from '@/components/swipe/SwipeHeader';

interface SwipeErrorStateProps {
  error: string;
  isFilterActive: boolean;
  showStats: boolean;
  onToggleStats: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const SwipeErrorState: React.FC<SwipeErrorStateProps> = ({
  error,
  isFilterActive,
  showStats,
  onToggleStats,
  onRefresh,
  isRefreshing
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SwipeHeader
        isFilterActive={isFilterActive}
        showStats={showStats}
        onToggleStats={onToggleStats}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
      />

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-deep-blue mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button className="w-full bg-deep-blue text-white" onClick={onRefresh}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwipeErrorState;
