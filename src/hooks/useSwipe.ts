
import { useState, useCallback } from 'react';
import { SwipeAction } from '@/types/match';
import { useLocalStorage } from './useLocalStorage';

export function useSwipe() {
  const [swipeHistory, setSwipeHistory] = useLocalStorage<SwipeAction[]>('swipeHistory', []);
  const [matches, setMatches] = useLocalStorage<string[]>('userMatches', []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback((targetUserId: string, action: 'like' | 'pass' | 'superlike') => {
    const newSwipeAction: SwipeAction = {
      userId: 'current-user', // In real app, get from auth context
      targetUserId,
      action,
      timestamp: new Date()
    };

    setSwipeHistory(prev => [...prev, newSwipeAction]);

    // Simulate match logic (10% chance for likes, 50% for superlikes)
    if (action === 'like' || action === 'superlike') {
      const matchChance = action === 'superlike' ? 0.5 : 0.1;
      if (Math.random() < matchChance) {
        setMatches(prev => [...prev, targetUserId]);
        return true; // Indicates a match
      }
    }

    setCurrentIndex(prev => prev + 1);
    return false;
  }, [setSwipeHistory, setMatches]);

  const hasSwipedUser = useCallback((userId: string) => {
    return swipeHistory.some(swipe => swipe.targetUserId === userId);
  }, [swipeHistory]);

  return {
    swipeHistory,
    matches,
    currentIndex,
    handleSwipe,
    hasSwipedUser,
    setCurrentIndex
  };
}
