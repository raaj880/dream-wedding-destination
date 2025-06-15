
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
    <div className="bg-gradient-to-r from-royal-plum via-charcoal-black/20 to-royal-plum/80 border-b border-blush-rose/30 px-4 py-4 sticky top-0 z-10 shadow-lg">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Link to="/profile" className="flex-shrink-0">
            <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-regal-gold transition-all border-2 border-ivory-white/20">
              {profilePhoto && <AvatarImage src={profilePhoto} alt={displayName} className="object-cover" />}
              <AvatarFallback className="bg-ivory-white text-royal-plum text-sm font-semibold">
                {loading ? '...' : getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-ivory-white truncate">
              Welcome back!
            </h1>
            <p className="text-sm text-ivory-white/80 font-medium">Ready to find your match?</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="ghost" size="icon" title="Notifications" className="w-10 h-10 hover:bg-ivory-white/20 rounded-full">
            <Bell className="w-5 h-5 text-ivory-white" />
          </Button>
          <Button variant="ghost" size="icon" asChild title="Settings" className="w-10 h-10 hover:bg-ivory-white/20 rounded-full">
            <Link to="/settings">
              <Settings className="w-5 h-5 text-ivory-white" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
