
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePotentialMatches } from '@/hooks/usePotentialMatches';
import { useSwipeActions } from '@/hooks/useSwipeActions';
import { useFilters } from '@/hooks/useFilters';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';
import { useSwipeTutorial } from '@/hooks/useSwipeTutorial';
import { toast } from '@/hooks/use-toast';

export const useSwipeInterfaceClassic = () => {
  const navigate = useNavigate();
  const { matches, loading, error, refetch } = usePotentialMatches();
  const { recordInteraction, loading: swipeLoading } = useSwipeActions();
  const { appliedFilters, isActive: isFilterActive, clearFilter, clearAllFilters } = useFilters();
  const { filteredMatches, filteredCount, totalCount } = useMatchFiltering(matches, appliedFilters);
  const { showTutorial, completeTutorial } = useSwipeTutorial();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [swipeStats, setSwipeStats] = useState({
    likes: 0,
    passes: 0,
    superlikes: 0,
    streak: 0
  });
  const [showStats, setShowStats] = useState(false);
  const [feedbackAction, setFeedbackAction] = useState<'like' | 'pass' | 'superlike' | null>(null);

  const currentProfile = filteredMatches[currentIndex];
  const remainingProfiles = filteredMatches.length - currentIndex;

  const handleSwipeAction = useCallback(async (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProfile || swipeLoading) return;

    try {
      const result = await recordInteraction(currentProfile.id, action);
      
      // Update swipe stats
      setSwipeStats(prev => ({
        ...prev,
        [action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes']: 
          prev[action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes'] + 1,
        streak: action === 'like' || action === 'superlike' ? prev.streak + 1 : 0
      }));

      // Show feedback animation
      setFeedbackAction(action);

      // Show appropriate feedback based on action
      if (action === 'like') {
        toast({
          title: "Profile Liked! ❤️",
          description: result.isMatch ? "It's a match! 🎉" : "You'll be notified if they like you back.",
        });
      } else if (action === 'superlike') {
        toast({
          title: "Super Like Sent! ⭐",
          description: `${currentProfile.full_name} will see you liked them!`,
        });
      } else {
        toast({
          title: "Profile Passed",
          description: "Moving to the next profile.",
        });
      }
      
    } catch (error) {
      console.error('Error handling swipe:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  }, [currentProfile, swipeLoading, recordInteraction]);

  const handleFeedbackComplete = useCallback(() => {
    setFeedbackAction(null);
    setCurrentIndex(prev => prev + 1);
  }, []);

  const resetSwipes = useCallback(async () => {
    setIsRefreshing(true);
    setCurrentIndex(0);
    setSwipeStats({ likes: 0, passes: 0, superlikes: 0, streak: 0 });
    
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
      if (!currentProfile || swipeLoading) return;
      
      switch (event.key) {
        case 'ArrowLeft':
        case 'x':
        case 'X':
          handleSwipeAction('pass');
          break;
        case 'ArrowRight':
        case 'z':
        case 'Z':
          handleSwipeAction('like');
          break;
        case 'ArrowUp':
        case 's':
        case 'S':
          handleSwipeAction('superlike');
          break;
        case 'r':
        case 'R':
          resetSwipes();
          break;
        case 'f':
        case 'F':
          navigate('/filter');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentProfile, swipeLoading, handleSwipeAction, resetSwipes, navigate]);

  return {
    // Data
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
    
    // Actions
    handleSwipeAction,
    handleFeedbackComplete,
    resetSwipes,
    setShowStats,
    clearFilter,
    clearAllFilters,
    completeTutorial
  };
};
