
import React, { useState } from 'react';
import { Eye, Heart, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import StatsCard from './StatsCard';
import LikedProfilesModal from './LikedProfilesModal';
import { DashboardStats } from '@/hooks/useDashboardStats';
import { useLikedProfiles } from '@/hooks/useLikedProfiles';

interface StatsGridProps {
  stats: DashboardStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const navigate = useNavigate();
  const { getLikedProfiles, loading: likedProfilesLoading } = useLikedProfiles();
  const [showLikedProfiles, setShowLikedProfiles] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState<any[]>([]);

  const handleProfileViewsClick = () => {
    navigate('/profile');
  };

  const handleLikesSentClick = async () => {
    console.log('📱 Opening liked profiles modal...');
    setShowLikedProfiles(true);
    const profiles = await getLikedProfiles();
    setLikedProfiles(profiles);
  };

  const handleMatchesClick = () => {
    navigate('/matches');
  };

  const handleActivityClick = () => {
    navigate('/swipe');
  };

  return (
    <>
      {/* Enhanced Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Profile Views"
          value={stats.profileViews}
          icon={Eye}
          description="This week"
          color="text-blue-500"
          onClick={handleProfileViewsClick}
          loading={stats.loading}
        />
        <StatsCard
          title="Likes Sent"
          value={stats.likesSent}
          icon={Heart}
          description="Total"
          color="text-red-500"
          onClick={handleLikesSentClick}
          loading={stats.loading}
        />
        <StatsCard
          title="Matches"
          value={stats.totalMatches}
          icon={Users}
          description="Mutual likes"
          color="text-green-500"
          onClick={handleMatchesClick}
          loading={stats.loading}
        />
        <StatsCard
          title="Activity"
          value={stats.recentActivity}
          icon={TrendingUp}
          description="Last 7 days"
          color="text-purple-500"
          onClick={handleActivityClick}
          loading={stats.loading}
        />
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Likes Received</div>
                <div className="text-2xl font-bold text-deep-blue">
                  {stats.loading ? '...' : stats.likesReceived}
                </div>
              </div>
              <Heart className="w-8 h-8 text-soft-pink" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Match Rate</div>
                <div className="text-2xl font-bold text-deep-blue">
                  {stats.loading ? '...' : stats.likesSent > 0 ? Math.round((stats.totalMatches / stats.likesSent) * 100) : 0}%
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liked Profiles Modal */}
      <LikedProfilesModal
        isOpen={showLikedProfiles}
        onClose={() => setShowLikedProfiles(false)}
        profiles={likedProfiles}
        loading={likedProfilesLoading}
      />
    </>
  );
};

export default StatsGrid;
