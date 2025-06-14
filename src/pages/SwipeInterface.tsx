
import React from 'react';
import { useSwipeInterfaceClassic } from '@/hooks/useSwipeInterfaceClassic';
import SwipeTutorial from '@/components/swipe/SwipeTutorial';
import SwipeFeedback from '@/components/swipe/SwipeFeedback';
import MatchNotificationManager from '@/components/matches/MatchNotificationManager';
import SwipeLoadingState from '@/components/swipe/SwipeLoadingState';
import SwipeErrorState from '@/components/swipe/SwipeErrorState';
import SwipeEmptyState from '@/components/swipe/SwipeEmptyState';
import SwipeMainInterface from '@/components/swipe/SwipeMainInterface';

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
    return <SwipeLoadingState isRefreshing={isRefreshing} />;
  }

  if (error) {
    return (
      <SwipeErrorState
        error={error}
        isFilterActive={isFilterActive}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
        onRefresh={resetSwipes}
        isRefreshing={isRefreshing}
      />
    );
  }

  if (!currentProfile && filteredMatches.length === 0) {
    return (
      <SwipeEmptyState
        isFilterActive={isFilterActive}
        showStats={showStats}
        totalCount={totalCount}
        onToggleStats={() => setShowStats(!showStats)}
        onRefresh={resetSwipes}
        isRefreshing={isRefreshing}
      />
    );
  }

  return (
    <>
      <SwipeMainInterface
        currentProfile={currentProfile}
        filteredMatches={filteredMatches}
        currentIndex={currentIndex}
        remainingProfiles={remainingProfiles}
        showStats={showStats}
        swipeStats={swipeStats}
        filteredCount={filteredCount}
        totalCount={totalCount}
        appliedFilters={appliedFilters}
        isFilterActive={isFilterActive}
        isRefreshing={isRefreshing}
        onSwipeAction={handleSwipeAction}
        onToggleStats={() => setShowStats(!showStats)}
        onRefresh={resetSwipes}
        onClearFilter={clearFilter}
        onClearAllFilters={clearAllFilters}
      />

      <SwipeFeedback action={feedbackAction} onComplete={handleFeedbackComplete} />
      <MatchNotificationManager />
    </>
  );
};

export default SwipeInterface;
