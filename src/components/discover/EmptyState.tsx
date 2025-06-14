
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Filter, RotateCcw, Heart, Settings } from 'lucide-react';

interface EmptyStateProps {
  isFilterActive: boolean;
  totalCount: number;
  onRefresh: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isFilterActive, totalCount, onRefresh }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">
          {isFilterActive ? '🔍' : '🎯'}
        </div>
        <h2 className="text-2xl font-bold text-deep-blue mb-4">
          {isFilterActive ? 'No matches found' : 'No more profiles to show'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isFilterActive 
            ? `No profiles match your current filters. Try adjusting them to see more people.`
            : 'You\'ve seen all available profiles. Check back later for new members or adjust your filters!'
          }
        </p>
        {isFilterActive && totalCount > 0 && (
          <p className="text-sm text-gray-500 mb-6">
            {totalCount} total profiles available
          </p>
        )}
        <div className="space-y-3">
          <Button className="w-full bg-deep-blue text-white" asChild>
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
  );
};

export default EmptyState;
