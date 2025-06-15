
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
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
    <div className="bg-gradient-to-r from-royal-plum via-royal-plum/90 to-blush-rose/20 border-b border-border px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Link to="/profile" className="flex-shrink-0">
            <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-ivory-white transition-all">
              {profilePhoto && <AvatarImage src={profilePhoto} alt={displayName} className="object-cover" />}
              <AvatarFallback className="bg-ivory-white text-royal-plum text-sm">
                {loading ? '...' : getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-ivory-white truncate">
              Welcome back!
            </h1>
            <p className="text-xs text-ivory-white/80">Ready to find your match?</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 flex-shrink-0">
          <Button variant="ghost" size="icon" title="Notifications" className="w-9 h-9 hover:bg-ivory-white/20">
            <Bell className="w-4 h-4 text-ivory-white" />
          </Button>
          <Button variant="ghost" size="icon" asChild title="Settings" className="w-9 h-9 hover:bg-ivory-white/20">
            <Link to="/settings">
              <Settings className="w-4 h-4 text-ivory-white" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
