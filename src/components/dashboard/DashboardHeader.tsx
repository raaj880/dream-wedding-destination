
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
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
    <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <Link to="/profile" className="flex-shrink-0">
            <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-soft-pink transition-all">
              {profilePhoto && <AvatarImage src={profilePhoto} alt={displayName} className="object-cover" />}
              <AvatarFallback className="bg-soft-pink text-deep-blue">
                {loading ? '...' : getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-deep-blue">
              Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-sm text-gray-600">Ready to find your match?</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" title="Notifications">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" asChild title="Profile">
            <Link to="/profile">
              <User className="w-5 h-5 text-gray-600" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild title="Settings">
            <Link to="/settings">
              <Settings className="w-5 h-5 text-gray-600" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
