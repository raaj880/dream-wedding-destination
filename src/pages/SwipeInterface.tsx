
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeInterfaceClassic } from '@/hooks/useSwipeInterfaceClassic';
import ProfileCard from '@/components/swipe/ProfileCard';
import SwipeTips from '@/components/swipe/SwipeTips';
import FilterSummary from '@/components/swipe/FilterSummary';
import SwipeFeedback from '@/components/swipe/SwipeFeedback';
import SwipeTutorial from '@/components/swipe/SwipeTutorial';
import MatchNotificationManager from '@/components/matches/MatchNotificationManager';
import SwipeHeader from '@/components/swipe/SwipeHeader';
import SwipeStatsBar from '@/components/swipe/SwipeStatsBar';
import SwipeControls from '@/components/swipe/SwipeControls';
import SwipeProgress from '@/components/swipe/SwipeProgress';
import DiscoverStats from '@/components/discover/DiscoverStats';
import { Filter, RotateCcw, Heart } from 'lucide-react';

const SwipeInterface: React.FC = () => {
  const {
    currentProfile,
    filteredMatches,
    currentIndex,
    remainingProfiles,
    loading,
    error,
    isRefreshing,
    showStats,
    swipeStats,
    feedbackAction,
    filteredCount,
    totalCount,
    appliedFilters,
    isFilterActive,
    showTutorial,
    handleSwipeAction,
    handleFeedbackComplete,
    resetSwipes,
    setShowStats,
    clearFilter,
    clearAllFilters,
    completeTutorial
  } = useSwipeInterfaceClassic();

  if (showTutorial) {
    return <SwipeTutorial onComplete={completeTutorial} />;
  }

  if (loading || isRefreshing) {
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
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SwipeHeader
          isFilterActive={isFilterActive}
          showStats={showStats}
          onToggleStats={() => setShowStats(!showStats)}
          onRefresh={resetSwipes}
          isRefreshing={isRefreshing}
        />

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-deep-blue mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button className="w-full bg-deep-blue text-white" onClick={resetSwipes}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProfile && filteredMatches.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SwipeHeader
          isFilterActive={isFilterActive}
          showStats={showStats}
          onToggleStats={() => setShowStats(!showStats)}
          onRefresh={resetSwipes}
          isRefreshing={isRefreshing}
        />

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
              <Button variant="outline" className="w-full" onClick={resetSwipes}>
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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SwipeHeader
        isFilterActive={isFilterActive}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
        onRefresh={resetSwipes}
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
              onClearFilter={clearFilter}
              onClearAll={clearAllFilters}
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
                onSwipe={handleSwipeAction}
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
            onPass={() => handleSwipeAction('pass')}
            onLike={() => handleSwipeAction('like')}
            onSuperLike={() => handleSwipeAction('superlike')}
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

      <SwipeFeedback action={feedbackAction} onComplete={handleFeedbackComplete} />
      <MatchNotificationManager />
    </div>
  );
};

export default SwipeInterface;
