
import React from 'react';
import { Users, Filter } from 'lucide-react';

interface SwipeStatsBarProps {
  remainingProfiles: number;
  isFilterActive: boolean;
  filteredCount: number;
  totalCount: number;
  swipeStats: {
    likes: number;
    superlikes: number;
  };
}

const SwipeStatsBar: React.FC<SwipeStatsBarProps> = ({
  remainingProfiles,
  isFilterActive,
  filteredCount,
  totalCount,
  swipeStats
}) => {
  return (
    <div className="bg-white border-b border-gray-100 px-4 py-2">
      <div className="flex items-center justify-between max-w-md mx-auto text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {remainingProfiles} left
          </span>
          {isFilterActive && (
            <span className="text-blue-600 flex items-center">
              <Filter className="w-3 h-3 mr-1" />
              {filteredCount}/{totalCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-green-600">❤️ {swipeStats.likes}</span>
          <span className="text-blue-600">⭐ {swipeStats.superlikes}</span>
        </div>
      </div>
    </div>
  );
};

export default SwipeStatsBar;
