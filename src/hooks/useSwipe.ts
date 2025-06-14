
import { useState, useCallback } from 'react';
import { useSwipeActions, SwipeResult } from './useSwipeActions';

export function useSwipe() {
  const { recordInteraction, getSwipedUserIds, loading } = useSwipeActions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback(async (
    targetUserId: string, 
    action: 'like' | 'pass' | 'superlike'
  ): Promise<boolean> => {
    try {
      const result = await recordInteraction(targetUserId, action);
      return result.isMatch;
    } catch (error) {
      console.error('Error in handleSwipe:', error);
      return false;
    }
  }, [recordInteraction]);

  const hasSwipedUser = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const swipedIds = await getSwipedUserIds();
      return swipedIds.includes(userId);
    } catch (error) {
      console.error('Error checking if user was swiped:', error);
      return false;
    }
  }, [getSwipedUserIds]);

  return {
    currentIndex,
    handleSwipe,
    hasSwipedUser,
    setCurrentIndex,
    loading
  };
}
