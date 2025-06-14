
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import DiscoverHeader from '@/components/discover/DiscoverHeader';
import DiscoverStats from '@/components/discover/DiscoverStats';
import EmptyState from '@/components/discover/EmptyState';
import LoadingState from '@/components/discover/LoadingState';
import FilterSummary from '@/components/swipe/FilterSummary';
import SwipeFeedback from '@/components/swipe/SwipeFeedback';
import SwipeTutorial from '@/components/swipe/SwipeTutorial';
import MatchNotificationManager from '@/components/matches/MatchNotificationManager';
import KeyboardControls from '@/components/discover/KeyboardControls';
import QuickGuide from '@/components/discover/QuickGuide';
import ProfileList from '@/components/discover/ProfileList';
import LoadMoreIndicator from '@/components/discover/LoadMoreIndicator';
import { useSwipeInterface } from '@/hooks/useSwipeInterface';

const EnhancedSwipeInterface: React.FC = () => {
  const {
    displayProfiles,
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
    scrollAreaRef,
    handleSwipeAction,
    handleFeedbackComplete,
    resetSwipes,
    setShowStats,
    clearFilter,
    clearAllFilters,
    completeTutorial
  } = useSwipeInterface();

  if (showTutorial) {
    return <SwipeTutorial onComplete={completeTutorial} />;
  }

  if (loading || isRefreshing) {
    return <LoadingState isRefreshing={isRefreshing} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <DiscoverHeader
          isFilterActive={isFilterActive}
          totalProfiles={totalCount}
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
            <button 
              className="w-full bg-deep-blue text-white px-4 py-2 rounded-lg" 
              onClick={resetSwipes}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (displayProfiles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <DiscoverHeader
          isFilterActive={isFilterActive}
          totalProfiles={totalCount}
          showStats={showStats}
          onToggleStats={() => setShowStats(!showStats)}
          onRefresh={resetSwipes}
          isRefreshing={isRefreshing}
        />
        <EmptyState
          isFilterActive={isFilterActive}
          totalCount={totalCount}
          onRefresh={resetSwipes}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <KeyboardControls
        displayProfiles={displayProfiles}
        swipeLoading={false}
        handleSwipeAction={handleSwipeAction}
        resetSwipes={resetSwipes}
      />

      <DiscoverHeader
        isFilterActive={isFilterActive}
        totalProfiles={totalCount}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
        onRefresh={resetSwipes}
        isRefreshing={isRefreshing}
      />

      <DiscoverStats showStats={showStats} stats={swipeStats} />

      {isFilterActive && (
        <div className="px-4 py-2 max-w-md mx-auto">
          <FilterSummary 
            filters={appliedFilters} 
            onClearFilter={clearFilter}
            onClearAll={clearAllFilters}
          />
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-80px)]" ref={scrollAreaRef}>
        <div className="container mx-auto px-4 py-6 max-w-md">
          <QuickGuide />
          <ProfileList 
            displayProfiles={displayProfiles}
            handleSwipeAction={handleSwipeAction}
          />
          <LoadMoreIndicator hasProfiles={displayProfiles.length > 0} />
        </div>
      </ScrollArea>

      <SwipeFeedback action={feedbackAction} onComplete={handleFeedbackComplete} />
      <MatchNotificationManager />
    </div>
  );
};

export default EnhancedSwipeInterface;
