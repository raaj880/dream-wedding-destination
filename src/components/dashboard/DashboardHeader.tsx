
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const { getProfile, loading } = useProfile();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, getProfile]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  const profilePhoto = profile?.photos?.[0];

  return (
    <div className="card-gradient border-b border-card-gold/20 px-4 py-4 sticky top-0 z-10 card-shadow">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Link to="/profile" className="flex-shrink-0">
            <Avatar className="w-12 h-12 cursor-pointer hover:ring-2 hover:ring-card-gold/50 transition-all border-2 border-card-gold/30 premium-card">
              {profilePhoto && <AvatarImage src={profilePhoto} alt={displayName} className="object-cover" />}
              <AvatarFallback className="bg-card-charcoal text-card-gold text-sm font-semibold">
                {loading ? '...' : getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-card-gold" />
              <h1 className="text-xl font-display font-semibold text-white">
                Welcome back
              </h1>
            </div>
            <p className="text-sm text-card-gold font-medium">Premium Experience Awaits</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="ghost" size="icon" title="Notifications" className="w-10 h-10 hover:bg-card-gold/20 rounded-full text-white border border-card-gold/30">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild title="Settings" className="w-10 h-10 hover:bg-card-gold/20 rounded-full text-white border border-card-gold/30">
            <Link to="/settings">
              <Settings className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
