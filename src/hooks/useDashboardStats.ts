
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DashboardStats {
  profileViews: number;
  likesSent: number;
  totalMatches: number;
  recentActivity: number;
  likesReceived: number;
  loading: boolean;
  error: string | null;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    profileViews: 0,
    likesSent: 0,
    totalMatches: 0,
    recentActivity: 0,
    likesReceived: 0,
    loading: true,
    error: null
  });
  
  const { user } = useAuth();

  const fetchStats = async () => {
    if (!user) return;

    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));

      // Get likes sent by user
      const { data: likesSentData, error: likesSentError } = await supabase
        .from('user_interactions')
        .select('id, created_at')
        .eq('user_id', user.id)
        .in('interaction_type', ['like', 'superlike']);

      if (likesSentError) throw likesSentError;

      // Get likes received by user
      const { data: likesReceivedData, error: likesReceivedError } = await supabase
        .from('user_interactions')
        .select('id, created_at')
        .eq('target_user_id', user.id)
        .in('interaction_type', ['like', 'superlike']);

      if (likesReceivedError) throw likesReceivedError;

      // Get total matches
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('id, matched_at')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .eq('status', 'active');

      if (matchesError) throw matchesError;

      // Calculate recent activity (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const recentLikes = likesSentData?.filter(
        like => new Date(like.created_at) > weekAgo
      ).length || 0;

      const recentMatches = matchesData?.filter(
        match => new Date(match.matched_at) > weekAgo
      ).length || 0;

      // Mock profile views for now (would need view tracking table)
      const profileViews = Math.floor(Math.random() * 50) + 20;

      setStats({
        profileViews,
        likesSent: likesSentData?.length || 0,
        totalMatches: matchesData?.length || 0,
        recentActivity: recentLikes + recentMatches,
        likesReceived: likesReceivedData?.length || 0,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch stats'
      }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  return {
    ...stats,
    refetch: fetchStats
  };
}
