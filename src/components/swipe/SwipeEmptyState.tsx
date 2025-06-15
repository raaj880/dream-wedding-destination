
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SwipeHeader from '@/components/swipe/SwipeHeader';
import { Filter, RotateCcw, Heart } from 'lucide-react';

interface SwipeEmptyStateProps {
  isFilterActive: boolean;
  showStats: boolean;
  totalCount: number;
  onToggleStats: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const SwipeEmptyState: React.FC<SwipeEmptyStateProps> = ({
  isFilterActive,
  showStats,
  totalCount,
  onToggleStats,
  onRefresh,
  isRefreshing
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SwipeHeader
        isFilterActive={isFilterActive}
        showStats={showStats}
        onToggleStats={onToggleStats}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
      />

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">
            {isFilterActive ? '🔍' : '🎯'}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {isFilterActive ? 'No matches found' : 'No more profiles to show'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isFilterActive 
              ? `No profiles match your current filters. Try adjusting them to see more people.`
              : 'You\'ve seen all available profiles. Check back later for new members or adjust your filters!'
            }
          </p>
          {isFilterActive && totalCount > 0 && (
            <p className="text-sm text-muted-foreground mb-6">
              {totalCount} total profiles available
            </p>
          )}
          <div className="space-y-3">
            <Button className="w-full bg-primary text-primary-foreground" asChild>
              <Link to="/filter">
                <Filter className="w-4 h-4 mr-2" />
                {isFilterActive ? 'Adjust Filters' : 'Set Filters'}
              </Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={onRefresh}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Refresh Profiles
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/matches">
                <Heart className="w-4 h-4 mr-2" />
                View Matches
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeEmptyState;
