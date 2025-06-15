import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSwipeInterface } from '@/hooks/useSwipeInterface';
import { useProfileViewing } from '@/hooks/useProfileViewing';
import DiscoverHeader from '@/components/discover/DiscoverHeader';
import SwipeFeedback from '@/components/swipe/SwipeFeedback';
import SwipeTutorial from '@/components/swipe/SwipeTutorial';
import FilterSummary from '@/components/swipe/FilterSummary';
import LoadingState from '@/components/discover/LoadingState';
import EmptyState from '@/components/discover/EmptyState';
import ProfileList from '@/components/discover/ProfileList';
import LoadMoreIndicator from '@/components/discover/LoadMoreIndicator';

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
  
  const [visibleProfiles, setVisibleProfiles] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up intersection observer to track which profiles are visible
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const profileId = entry.target.getAttribute('data-profile-id');
          if (profileId) {
            if (entry.isIntersecting) {
              setVisibleProfiles(prev => new Set([...prev, profileId]));
              // Record profile view when it becomes visible
              recordProfileView(profileId);
            } else {
              setVisibleProfiles(prev => {
                const newSet = new Set(prev);
                newSet.delete(profileId);
                return newSet;
              });
            }
          }
        });
      },
      {
        threshold: 0.5, // Profile is considered visible when 50% is in view
        rootMargin: '0px 0px -100px 0px' // Start tracking 100px before it enters view
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [recordProfileView]);

  const handleSwipeAction = useCallback(async (profileId: string, action: 'like' | 'pass' | 'superlike') => {
    try {
      await handleSwipe(profileId, action);
    } catch (error) {
      console.error('Swipe error:', error);
    }
  }, [handleSwipe]);

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

  if (!displayProfiles.length && !loading) {
    return <EmptyState onRefresh={resetSwipes} isFilterActive={isFilterActive} totalCount={totalCount} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DiscoverHeader 
        isFilterActive={isFilterActive}
        totalProfiles={totalCount}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
        onRefresh={resetSwipes}
        isRefreshing={isRefreshing || loading}
      />
      
      {isFilterActive && (
        <FilterSummary 
          filters={appliedFilters}
          onClearFilter={clearFilter}
          onClearAll={clearAllFilters}
        />
      )}
      
      {/* Main Feed Container */}
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <ProfileList 
          displayProfiles={displayProfiles} 
          handleSwipeAction={handleSwipeAction}
        />
        
        <LoadMoreIndicator hasProfiles={displayProfiles.length > 0} />
        
        {loading && displayProfiles.length > 0 && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-blue mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading more profiles...</p>
          </div>
        )}
      </div>

      <SwipeFeedback 
        action={feedback}
        onComplete={() => {}}
      />
    </div>
  );
};

export default EnhancedSwipeInterface;
