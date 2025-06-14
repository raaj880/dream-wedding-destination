
import { useState, useCallback, useRef, useEffect } from 'react';
import { usePotentialMatches } from '@/hooks/usePotentialMatches';
import { useSwipeActions } from '@/hooks/useSwipeActions';
import { useFilters } from '@/hooks/useFilters';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';
import { useSwipeTutorial } from '@/hooks/useSwipeTutorial';
import { toast } from '@/hooks/use-toast';

export const useSwipeInterface = () => {
  const { matches, loading, error, refetch } = usePotentialMatches();
  const { recordInteraction, loading: swipeLoading } = useSwipeActions();
  const { appliedFilters, isActive: isFilterActive, clearFilter, clearAllFilters } = useFilters();
  const { filteredMatches, filteredCount, totalCount } = useMatchFiltering(matches, appliedFilters);
  const { showTutorial, completeTutorial } = useSwipeTutorial();
  
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [swipeStats, setSwipeStats] = useState({
    likes: 0,
    passes: 0,
    superlikes: 0,
    streak: 0
  });
  const [feedback, setFeedback] = useState<'like' | 'pass' | 'superlike' | null>(null);
  const [swipedProfiles, setSwipedProfiles] = useState<Set<string>>(new Set());

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  console.log('🔍 EnhancedSwipeInterface Debug:', {
    totalMatches: matches.length,
    filteredMatches: filteredMatches.length,
    swipedProfiles: Array.from(swipedProfiles),
    loading,
    error
  });

  const currentProfile = filteredMatches[currentProfileIndex];
  const hasMoreProfiles = currentProfileIndex < filteredMatches.length - 1;

  const goToNextProfile = useCallback(() => {
    if (hasMoreProfiles) {
      setCurrentProfileIndex(prev => prev + 1);
    }
  }, [hasMoreProfiles]);

  const loadMoreProfiles = useCallback(async () => {
    // This would typically fetch more profiles from the server
    // For now, we'll just refetch existing profiles
    await refetch();
  }, [refetch]);

  const handleSwipe = useCallback(async (profileId: string, action: 'like' | 'pass' | 'superlike') => {
    if (swipeLoading || swipedProfiles.has(profileId)) {
      console.log('🚫 Swipe action blocked:', { swipeLoading, alreadySwiped: swipedProfiles.has(profileId) });
      return { isMatch: false };
    }

    console.log('👆 Handling swipe action:', { profileId, action });

    // Mark profile as swiped immediately to prevent duplicate actions
    setSwipedProfiles(prev => new Set(prev).add(profileId));

    try {
      const result = await recordInteraction(profileId, action);
      console.log('✅ Swipe recorded:', result);
      
      // Update swipe stats
      setSwipeStats(prev => ({
        ...prev,
        [action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes']: 
          prev[action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes'] + 1,
        streak: action === 'like' || action === 'superlike' ? prev.streak + 1 : 0
      }));

      // Show feedback animation
      setFeedback(action);

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
      
      return result;
    } catch (error) {
      console.error('❌ Error handling swipe:', error);
      // Remove from swiped if there was an error
      setSwipedProfiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(profileId);
        return newSet;
      });
      
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      
      return { isMatch: false };
    }
  }, [recordInteraction, swipeLoading, filteredMatches, swipedProfiles]);

  const resetProfiles = useCallback(async () => {
    setIsRefreshing(true);
    setCurrentProfileIndex(0);
    setSwipeStats({ likes: 0, passes: 0, superlikes: 0, streak: 0 });
    setSwipedProfiles(new Set());
    
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

  // Filter out swiped profiles for display
  const displayProfiles = filteredMatches.filter(profile => !swipedProfiles.has(profile.id));

  console.log('📱 Display profiles:', {
    filteredCount: filteredMatches.length,
    swipedCount: swipedProfiles.size,
    displayCount: displayProfiles.length,
    profiles: displayProfiles.map(p => ({ id: p.id, name: p.full_name }))
  });

  return {
    // Original data structure
    profiles: filteredMatches,
    currentProfileIndex,
    stats: swipeStats,
    loading,
    error,
    hasMoreProfiles,
    goToNextProfile,
    loadMoreProfiles,
    resetProfiles,
    
    // Enhanced data
    displayProfiles,
    isRefreshing,
    showStats,
    swipeStats,
    feedback,
    swipedProfiles,
    filteredMatches,
    filteredCount,
    totalCount,
    appliedFilters,
    isFilterActive,
    showTutorial,
    scrollAreaRef,
    
    // Actions
    handleSwipe,
    resetSwipes: resetProfiles,
    setShowStats,
    clearFilter,
    clearAllFilters,
    completeTutorial
  };
};
