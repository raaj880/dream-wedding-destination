
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
    displayProfiles,
    loading,
    error,
    isRefreshing,
    showStats,
    swipeStats,
    feedback,
    isFilterActive,
    filteredCount,
    totalCount,
    appliedFilters,
    showTutorial,
    completeTutorial,
    setShowStats,
    handleSwipe,
    clearFilter,
    clearAllFilters,
    resetSwipes
  } = useSwipeInterface();

  const { recordProfileView } = useProfileViewing();
  
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentProfileRef = useRef<string | null>(null);

  const currentProfile = displayProfiles[currentProfileIndex];
  const hasMoreProfiles = currentProfileIndex < displayProfiles.length - 1;

  // Record profile view when a new profile is shown
  useEffect(() => {
    if (currentProfile && currentProfile.id !== currentProfileRef.current) {
      console.log('📊 New profile displayed, recording view:', currentProfile.id);
      recordProfileView(currentProfile.id);
      currentProfileRef.current = currentProfile.id;
    }
  }, [currentProfile, recordProfileView]);

  const goToNextProfile = useCallback(() => {
    if (hasMoreProfiles) {
      setCurrentProfileIndex(prev => prev + 1);
    }
  }, [hasMoreProfiles]);

  const onSwipe = useCallback(async (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProfile || isAnimating) return;

    setIsAnimating(true);
    
    // Set direction for animation based on action
    if (action === 'like') {
      setSwipeDirection('right');
    } else if (action === 'pass') {
      setSwipeDirection('left');
    }
    // superlike doesn't need direction animation

    try {
      await handleSwipe(currentProfile.id, action);
      
      setTimeout(() => {
        goToNextProfile();
        setSwipeDirection(null);
        setIsAnimating(false);
      }, action === 'superlike' ? 500 : 300);
    } catch (error) {
      console.error('Swipe error:', error);
      setIsAnimating(false);
      setSwipeDirection(null);
    }
  }, [currentProfile, isAnimating, handleSwipe, goToNextProfile]);

  if (showTutorial) {
    return <SwipeTutorial onComplete={completeTutorial} />;
  }

  if (loading && displayProfiles.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={resetSwipes}
            className="bg-deep-blue text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentProfile && !loading) {
    return <EmptyState onRefresh={resetSwipes} isFilterActive={isFilterActive} totalCount={totalCount} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SwipeHeader 
        isFilterActive={isFilterActive}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
        onRefresh={resetSwipes}
        isRefreshing={loading}
      />
      <FilterSummary 
        filters={appliedFilters}
        onClearFilter={clearFilter}
        onClearAll={clearAllFilters}
      />
      <SwipeStatsBar 
        remainingProfiles={displayProfiles.length - currentProfileIndex}
        isFilterActive={isFilterActive}
        filteredCount={filteredCount}
        totalCount={totalCount}
        swipeStats={swipeStats}
      />
      <SwipeProgress 
        currentIndex={currentProfileIndex + 1} 
        totalProfiles={Math.max(displayProfiles.length, currentProfileIndex + 1)}
        remainingProfiles={displayProfiles.length - currentProfileIndex}
        streak={swipeStats.streak}
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
                onSwipe={onSwipe}
                isVisible={true}
                index={0}
              />
            </motion.div>
          )}
          
          {/* Preload next profile */}
          {displayProfiles[currentProfileIndex + 1] && (
            <div className="absolute inset-0 -z-10">
              <ProfileCard 
                profile={displayProfiles[currentProfileIndex + 1]}
                onSwipe={() => {}}
                isVisible={false}
                index={1}
              />
            </div>
          )}
        </div>

        <SwipeControls
          onPass={() => onSwipe('pass')}
          onLike={() => onSwipe('like')}
          onSuperLike={() => onSwipe('superlike')}
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
