
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
    if (!user) {
      console.log('❌ No user found for dashboard stats');
      return;
    }

    console.log('📊 Fetching dashboard stats for user:', user.id);

    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));

      // Get likes sent by user
      console.log('💌 Fetching likes sent...');
      const { data: likesSentData, error: likesSentError } = await supabase
        .from('user_interactions')
        .select('id, created_at')
        .eq('user_id', user.id)
        .in('interaction_type', ['like', 'superlike']);

      if (likesSentError) {
        console.error('❌ Error fetching likes sent:', likesSentError);
        throw likesSentError;
      }

      console.log('✅ Likes sent data:', likesSentData);

      // Get likes received by user
      console.log('💝 Fetching likes received...');
      const { data: likesReceivedData, error: likesReceivedError } = await supabase
        .from('user_interactions')
        .select('id, created_at')
        .eq('target_user_id', user.id)
        .in('interaction_type', ['like', 'superlike']);

      if (likesReceivedError) {
        console.error('❌ Error fetching likes received:', likesReceivedError);
        throw likesReceivedError;
      }

      console.log('✅ Likes received data:', likesReceivedData);

      // Get total matches
      console.log('🤝 Fetching matches...');
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('id, matched_at')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .eq('status', 'active');

      if (matchesError) {
        console.error('❌ Error fetching matches:', matchesError);
        throw matchesError;
      }

      console.log('✅ Matches data:', matchesData);

      // Calculate recent activity (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const recentLikes = likesSentData?.filter(
        like => new Date(like.created_at) > weekAgo
      ).length || 0;

      const recentMatches = matchesData?.filter(
        match => new Date(match.matched_at) > weekAgo
      ).length || 0;

      console.log('📈 Recent activity calculation:', { recentLikes, recentMatches });

      // Mock profile views for now (would need view tracking table)
      const profileViews = Math.floor(Math.random() * 50) + 20;

      const newStats = {
        profileViews,
        likesSent: likesSentData?.length || 0,
        totalMatches: matchesData?.length || 0,
        recentActivity: recentLikes + recentMatches,
        likesReceived: likesReceivedData?.length || 0,
        loading: false,
        error: null
      };

      console.log('📊 Final dashboard stats:', newStats);

      setStats(newStats);

    } catch (error) {
      console.error('❌ Error fetching dashboard stats:', error);
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
