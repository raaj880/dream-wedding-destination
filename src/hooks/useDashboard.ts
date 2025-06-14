
import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { SwipeAction } from '@/types/match';

export function useDashboard() {
  const [swipeHistory] = useLocalStorage<SwipeAction[]>('swipeHistory', []);
  const [matches] = useLocalStorage<string[]>('userMatches', []);

  const stats = useMemo(() => {
    const totalLikes = swipeHistory.filter(swipe => swipe.action === 'like').length;
    const totalSuperLikes = swipeHistory.filter(swipe => swipe.action === 'superlike').length;
    const totalMatches = matches.length;
    
    // Calculate recent activity (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentActivity = swipeHistory.filter(
      swipe => new Date(swipe.timestamp) > weekAgo
    ).length;

    return {
      totalLikes: totalLikes + totalSuperLikes,
      totalMatches,
      recentActivity,
      profileViews: Math.floor(Math.random() * 50) + 20, // Mock data
      likesReceived: Math.floor(Math.random() * 15) + 5   // Mock data
    };
  }, [swipeHistory, matches]);

  return stats;
}
