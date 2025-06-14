
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePotentialMatches } from '@/hooks/usePotentialMatches';
import { useSwipeActions } from '@/hooks/useSwipeActions';
import { useFilters } from '@/hooks/useFilters';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';
import { useSwipeTutorial } from '@/hooks/useSwipeTutorial';
import { ScrollArea } from '@/components/ui/scroll-area';
import EnhancedProfileCard from '@/components/discover/EnhancedProfileCard';
import DiscoverHeader from '@/components/discover/DiscoverHeader';
import DiscoverStats from '@/components/discover/DiscoverStats';
import EmptyState from '@/components/discover/EmptyState';
import LoadingState from '@/components/discover/LoadingState';
import FilterSummary from '@/components/swipe/FilterSummary';
import SwipeFeedback from '@/components/swipe/SwipeFeedback';
import SwipeTutorial from '@/components/swipe/SwipeTutorial';
import MatchNotificationManager from '@/components/matches/MatchNotificationManager';
import { toast } from '@/hooks/use-toast';

const EnhancedSwipeInterface: React.FC = () => {
  const { matches, loading, error, refetch } = usePotentialMatches();
  const { recordInteraction, loading: swipeLoading } = useSwipeActions();
  const { appliedFilters, isActive: isFilterActive, clearFilter, clearAllFilters } = useFilters();
  const { filteredMatches, filteredCount, totalCount } = useMatchFiltering(matches, appliedFilters);
  const { showTutorial, completeTutorial } = useSwipeTutorial();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [swipeStats, setSwipeStats] = useState({
    likes: 0,
    passes: 0,
    superlikes: 0,
    streak: 0
  });
  const [feedbackAction, setFeedbackAction] = useState<'like' | 'pass' | 'superlike' | null>(null);
  const [processedProfiles, setProcessedProfiles] = useState<Set<string>>(new Set());

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSwipeAction = useCallback(async (profileId: string, action: 'like' | 'pass' | 'superlike') => {
    if (swipeLoading || processedProfiles.has(profileId)) return;

    // Mark profile as processed to prevent duplicate actions
    setProcessedProfiles(prev => new Set(prev).add(profileId));

    try {
      const result = await recordInteraction(profileId, action);
      
      // Update swipe stats
      setSwipeStats(prev => ({
        ...prev,
        [action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes']: 
          prev[action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes'] + 1,
        streak: action === 'like' || action === 'superlike' ? prev.streak + 1 : 0
      }));

      // Show feedback animation
      setFeedbackAction(action);

      // Find profile for toast
      const profile = filteredMatches.find(p => p.id === profileId);
      const profileName = profile?.full_name || 'Profile';

      // Show appropriate feedback based on action
      if (action === 'like') {
        toast({
          title: "Profile Liked! ❤️",
          description: result.isMatch ? "It's a match! 🎉" : "You'll be notified if they like you back.",
        });
      } else if (action === 'superlike') {
        toast({
          title: "Super Like Sent! ⭐",
          description: `${profileName} will see you liked them!`,
        });
      } else {
        toast({
          title: "Profile Passed",
          description: "Moving to the next profile.",
        });
      }
      
    } catch (error) {
      console.error('Error handling swipe:', error);
      // Remove from processed if there was an error
      setProcessedProfiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(profileId);
        return newSet;
      });
      
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  }, [recordInteraction, swipeLoading, filteredMatches, processedProfiles]);

  const handleFeedbackComplete = useCallback(() => {
    setFeedbackAction(null);
  }, []);

  const resetSwipes = useCallback(async () => {
    setIsRefreshing(true);
    setSwipeStats({ likes: 0, passes: 0, superlikes: 0, streak: 0 });
    setProcessedProfiles(new Set());
    
    try {
      await refetch();
      toast({
        title: "Profiles Refreshed",
        description: "Loading fresh profiles for you.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh profiles. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (swipeLoading) return;
      
      const visibleProfiles = filteredMatches.filter(p => !processedProfiles.has(p.id));
      const firstProfile = visibleProfiles[0];
      
      if (!firstProfile) return;
      
      switch (event.key) {
        case 'ArrowLeft':
        case 'x':
        case 'X':
          handleSwipeAction(firstProfile.id, 'pass');
          break;
        case 'ArrowRight':
        case 'z':
        case 'Z':
          handleSwipeAction(firstProfile.id, 'like');
          break;
        case 'ArrowUp':
        case 's':
        case 'S':
          handleSwipeAction(firstProfile.id, 'superlike');
          break;
        case 'r':
        case 'R':
          resetSwipes();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSwipeAction, filteredMatches, processedProfiles, swipeLoading, resetSwipes]);

  // Filter out processed profiles for display
  const displayProfiles = filteredMatches.filter(profile => !processedProfiles.has(profile.id));

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
              onClick={() => refetch()}
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
      {/* Header */}
      <DiscoverHeader
        isFilterActive={isFilterActive}
        totalProfiles={totalCount}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
        onRefresh={resetSwipes}
        isRefreshing={isRefreshing}
      />

      {/* Stats Panel */}
      <DiscoverStats showStats={showStats} stats={swipeStats} />

      {/* Filter Summary */}
      {isFilterActive && (
        <div className="px-4 py-2 max-w-md mx-auto">
          <FilterSummary 
            filters={appliedFilters} 
            onClearFilter={clearFilter}
            onClearAll={clearAllFilters}
          />
        </div>
      )}

      {/* Main Content */}
      <ScrollArea className="h-[calc(100vh-80px)]" ref={scrollAreaRef}>
        <div className="container mx-auto px-4 py-6 max-w-md">
          {/* Quick Guide */}
          <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 text-center">
              <div>← X = Pass</div>
              <div>↑ S = Super Like</div>
              <div>→ Z = Like</div>
            </div>
          </div>

          {/* Profile Cards */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {displayProfiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  exit={{ opacity: 0, x: -100 }}
                  layout
                >
                  <EnhancedProfileCard
                    profile={profile}
                    onSwipe={(action) => handleSwipeAction(profile.id, action)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Indicator */}
          {displayProfiles.length > 0 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                <span className="text-sm">Scroll for more profiles</span>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Swipe Feedback Overlay */}
      <SwipeFeedback action={feedbackAction} onComplete={handleFeedbackComplete} />

      {/* Real-time Match Notifications */}
      <MatchNotificationManager />
    </div>
  );
};

export default EnhancedSwipeInterface;
