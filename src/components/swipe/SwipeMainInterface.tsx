
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from '@/components/swipe/ProfileCard';
import SwipeTips from '@/components/swipe/SwipeTips';
import FilterSummary from '@/components/swipe/FilterSummary';
import SwipeHeader from '@/components/swipe/SwipeHeader';
import SwipeStatsBar from '@/components/swipe/SwipeStatsBar';
import SwipeControls from '@/components/swipe/SwipeControls';
import SwipeProgress from '@/components/swipe/SwipeProgress';
import DiscoverStats from '@/components/discover/DiscoverStats';
import { PotentialMatch } from '@/hooks/usePotentialMatches';
import { FilterOptions } from '@/types/filters';

interface SwipeMainInterfaceProps {
  currentProfile: PotentialMatch | undefined;
  filteredMatches: PotentialMatch[];
  currentIndex: number;
  remainingProfiles: number;
  showStats: boolean;
  swipeStats: {
    likes: number;
    passes: number;
    superlikes: number;
    streak: number;
  };
  filteredCount: number;
  totalCount: number;
  appliedFilters: FilterOptions;
  isFilterActive: boolean;
  isRefreshing: boolean;
  onSwipeAction: (action: 'like' | 'pass' | 'superlike') => void;
  onToggleStats: () => void;
  onRefresh: () => void;
  onClearFilter: (key: keyof FilterOptions) => void;
  onClearAllFilters: () => void;
}

const SwipeMainInterface: React.FC<SwipeMainInterfaceProps> = ({
  currentProfile,
  filteredMatches,
  currentIndex,
  remainingProfiles,
  showStats,
  swipeStats,
  filteredCount,
  totalCount,
  appliedFilters,
  isFilterActive,
  isRefreshing,
  onSwipeAction,
  onToggleStats,
  onRefresh,
  onClearFilter,
  onClearAllFilters
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SwipeHeader
        isFilterActive={isFilterActive}
        showStats={showStats}
        onToggleStats={onToggleStats}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
      />

      <DiscoverStats showStats={showStats} stats={swipeStats} />

      <SwipeStatsBar
        remainingProfiles={remainingProfiles}
        isFilterActive={isFilterActive}
        filteredCount={filteredCount}
        totalCount={totalCount}
        swipeStats={swipeStats}
      />

      {/* Container */}
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Swipe Tips */}
        <div className="mb-4">
          <SwipeTips />
        </div>

        {/* Filter Summary */}
        {isFilterActive && (
          <div className="mb-4">
            <FilterSummary 
              filters={appliedFilters} 
              onClearFilter={onClearFilter}
              onClearAll={onClearAllFilters}
            />
          </div>
        )}

        {/* Profile Cards */}
        <div className="relative h-[600px]">
          <AnimatePresence mode="wait">
            {currentProfile && (
              <ProfileCard
                key={currentProfile.id}
                profile={currentProfile}
                onSwipe={onSwipeAction}
                isVisible={true}
                index={0}
              />
            )}
          </AnimatePresence>

          {/* Next profile preview */}
          {filteredMatches[currentIndex + 1] && (
            <div className="absolute inset-0 -z-10 scale-95 opacity-50 pointer-events-none">
              <ProfileCard
                profile={filteredMatches[currentIndex + 1]}
                onSwipe={() => {}}
                isVisible={true}
                index={1}
              />
            </div>
          )}
        </div>

        {/* Enhanced Instructions */}
        <div className="mt-6 space-y-4">
          <SwipeControls
            onPass={() => onSwipeAction('pass')}
            onLike={() => onSwipeAction('like')}
            onSuperLike={() => onSwipeAction('superlike')}
            disabled={!currentProfile}
          />
          <SwipeProgress
            currentIndex={currentIndex}
            totalProfiles={filteredMatches.length}
            remainingProfiles={remainingProfiles}
            streak={swipeStats.streak}
          />
        </div>
      </div>
    </div>
  );
};

export default SwipeMainInterface;
