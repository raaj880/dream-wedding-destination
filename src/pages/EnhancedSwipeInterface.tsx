
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSwipeInterface } from '@/hooks/useSwipeInterface';
import { useProfileViewing } from '@/hooks/useProfileViewing';
import SwipeHeader from '@/components/swipe/SwipeHeader';
import ProfileCard from '@/components/swipe/ProfileCard';
import SwipeControls from '@/components/swipe/SwipeControls';
import SwipeFeedback from '@/components/swipe/SwipeFeedback';
import SwipeProgress from '@/components/swipe/SwipeProgress';
import SwipeStatsBar from '@/components/swipe/SwipeStatsBar';
import SwipeTutorial from '@/components/swipe/SwipeTutorial';
import FilterSummary from '@/components/swipe/FilterSummary';
import LoadingState from '@/components/discover/LoadingState';
import EmptyState from '@/components/discover/EmptyState';

const EnhancedSwipeInterface: React.FC = () => {
  const {
    profiles,
    currentProfileIndex,
    stats,
    loading,
    error,
    hasMoreProfiles,
    goToNextProfile,
    loadMoreProfiles,
    resetProfiles,
    handleSwipe,
    feedback,
    isFilterActive,
    filteredCount,
    totalCount,
    appliedFilters,
    showTutorial,
    completeTutorial,
    showStats,
    setShowStats
  } = useSwipeInterface();

  const { recordProfileView } = useProfileViewing();
  
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentProfileRef = useRef<string | null>(null);

  const currentProfile = profiles[currentProfileIndex];

  // Record profile view when a new profile is shown
  useEffect(() => {
    if (currentProfile && currentProfile.id !== currentProfileRef.current) {
      console.log('📊 New profile displayed, recording view:', currentProfile.id);
      recordProfileView(currentProfile.id);
      currentProfileRef.current = currentProfile.id;
    }
  }, [currentProfile, recordProfileView]);

  const onSwipe = useCallback(async (direction: 'left' | 'right') => {
    if (!currentProfile || isAnimating) return;

    setIsAnimating(true);
    setSwipeDirection(direction);

    try {
      const action = direction === 'right' ? 'like' : 'pass';
      await handleSwipe(currentProfile.id, action);
      
      setTimeout(() => {
        goToNextProfile();
        setSwipeDirection(null);
        setIsAnimating(false);
      }, 300);
    } catch (error) {
      console.error('Swipe error:', error);
      setIsAnimating(false);
      setSwipeDirection(null);
    }
  }, [currentProfile, isAnimating, handleSwipe, goToNextProfile]);

  const onSuperLike = useCallback(async () => {
    if (!currentProfile || isAnimating) return;

    setIsAnimating(true);

    try {
      await handleSwipe(currentProfile.id, 'superlike');
      
      setTimeout(() => {
        goToNextProfile();
        setIsAnimating(false);
      }, 500);
    } catch (error) {
      console.error('Super like error:', error);
      setIsAnimating(false);
    }
  }, [currentProfile, isAnimating, handleSwipe, goToNextProfile]);

  // Load more profiles when nearing the end
  useEffect(() => {
    if (profiles.length - currentProfileIndex <= 2 && hasMoreProfiles && !loading) {
      loadMoreProfiles();
    }
  }, [currentProfileIndex, profiles.length, hasMoreProfiles, loading, loadMoreProfiles]);

  if (showTutorial) {
    return <SwipeTutorial onComplete={completeTutorial} />;
  }

  if (loading && profiles.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={resetProfiles}
            className="bg-deep-blue text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentProfile && !loading) {
    return <EmptyState onRefresh={resetProfiles} isFilterActive={isFilterActive} totalCount={totalCount} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SwipeHeader 
        isFilterActive={isFilterActive}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
        onRefresh={resetProfiles}
        isRefreshing={loading}
      />
      <FilterSummary 
        filters={appliedFilters}
        onClearFilter={() => {}}
        onClearAll={() => {}}
      />
      <SwipeStatsBar 
        remainingProfiles={profiles.length - currentProfileIndex}
        isFilterActive={isFilterActive}
        filteredCount={filteredCount}
        totalCount={totalCount}
        swipeStats={stats}
      />
      <SwipeProgress 
        currentIndex={currentProfileIndex + 1} 
        totalProfiles={Math.max(profiles.length, currentProfileIndex + 1)}
        remainingProfiles={profiles.length - currentProfileIndex}
        streak={stats.streak}
      />

      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="relative h-[600px]">
          {currentProfile && (
            <motion.div
              key={currentProfile.id}
              animate={swipeDirection ? { 
                x: swipeDirection === 'right' ? 300 : -300,
                opacity: 0,
                rotate: swipeDirection === 'right' ? 10 : -10
              } : { x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ProfileCard 
                profile={currentProfile}
                onSwipe={(direction) => onSwipe(direction)}
                onSuperLike={onSuperLike}
              />
            </motion.div>
          )}
          
          {/* Preload next profile */}
          {profiles[currentProfileIndex + 1] && (
            <div className="absolute inset-0 -z-10">
              <ProfileCard 
                profile={profiles[currentProfileIndex + 1]}
              />
            </div>
          )}
        </div>

        <SwipeControls
          onPass={() => onSwipe('left')}
          onLike={() => onSwipe('right')}
          onSuperLike={onSuperLike}
          disabled={isAnimating || !currentProfile}
        />
      </div>

      <SwipeFeedback 
        action={feedback}
        onComplete={() => {}}
      />
    </div>
  );
};

export default EnhancedSwipeInterface;
