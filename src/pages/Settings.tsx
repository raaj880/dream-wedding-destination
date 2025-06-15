
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, User, Shield, Bell, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings, UserSettings } from '@/hooks/useSettings';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { settings, loading, updateSettings } = useSettings();

  const handleSignOut = async () => {
    if (logout) {
      await logout();
    }
    navigate('/auth', { replace: true });
  };
  
  const handleDeactivate = async () => {
    await updateSettings({ account_status: 'deactivated' });
    toast({
      title: "Account Deactivated",
      description: "Your account has been deactivated. You can reactivate it by logging in again.",
    });
    handleSignOut();
  };

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    updateSettings({ [key]: value });
  };
  
  const handleNotificationChange = (key: keyof UserSettings['notification_settings'], value: boolean) => {
    if (settings?.notification_settings) {
      updateSettings({
        notification_settings: {
          ...settings.notification_settings,
          [key]: value,
        },
      });
    }
  };

  const renderLoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-card-charcoal/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-card-gold/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-card-gold hover:bg-card-gold/10 hover:text-white rounded-full p-2">
                <Link to="/profile">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <h1 className="text-xl font-semibold text-white">Settings</h1>
            </div>
            <div onClick={() => navigate('/')} className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors cursor-pointer">
              <Heart className="w-6 h-6 text-card-gold fill-card-gold" />
              <span className="text-xl font-bold">Wedder</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-8">
          {/* Account Settings */}
          <Card className="bg-card-dark-gray border border-card-gold/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-gold flex items-center">
                <User className="w-5 h-5 mr-3 text-card-gold/80" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
                <Link to="/profile-setup">
                  Edit Profile Information
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold" onClick={() => toast({ title: "Coming Soon!", description: "This feature is not yet implemented."})}>
                Change Password
              </Button>
              <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
                <Link to="/profile-setup">
                  Manage Photos
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-card-dark-gray border border-card-gold/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-gold flex items-center">
                <Shield className="w-5 h-5 mr-3 text-card-gold/80" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading || !settings ? renderLoadingSkeleton() : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Profile Visibility</p>
                      <p className="text-sm text-gray-400">Control who can see your profile</p>
                    </div>
                    <Switch
                      checked={settings.profile_visibility === 'everyone'}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          'profile_visibility',
                          checked ? 'everyone' : 'matches_only'
                        )
                      }
                    />
                  </div>
                  <Separator className="bg-card-gold/20" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Show Online Status</p>
                      <p className="text-sm text-gray-400">Let others see when you're active</p>
                    </div>
                    <Switch
                      checked={settings.show_online_status}
                      onCheckedChange={(checked) => handleSettingChange('show_online_status', checked)}
                    />
                  </div>
                  <Separator className="bg-card-gold/20" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Hide from Search</p>
                      <p className="text-sm text-gray-400">Don't appear in search results</p>
                    </div>
                    <Switch
                      checked={settings.hide_from_search}
                      onCheckedChange={(checked) => handleSettingChange('hide_from_search', checked)}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-card-dark-gray border border-card-gold/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-gold flex items-center">
                <Bell className="w-5 h-5 mr-3 text-card-gold/80" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading || !settings ? renderLoadingSkeleton() : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">New Matches</p>
                      <p className="text-sm text-gray-400">Get notified about new matches</p>
                    </div>
                    <Switch
                      checked={settings.notification_settings.new_matches}
                      onCheckedChange={(checked) => handleNotificationChange('new_matches', checked)}
                    />
                  </div>
                  <Separator className="bg-card-gold/20" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Messages</p>
                      <p className="text-sm text-gray-400">Get notified about new messages</p>
                    </div>
                    <Switch
                      checked={settings.notification_settings.messages}
                      onCheckedChange={(checked) => handleNotificationChange('messages', checked)}
                    />
                  </div>
                  <Separator className="bg-card-gold/20" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Profile Views</p>
                      <p className="text-sm text-gray-400">Know when someone views your profile</p>
                    </div>
                    <Switch
                      checked={settings.notification_settings.profile_views}
                      onCheckedChange={(checked) => handleNotificationChange('profile_views', checked)}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="bg-card-dark-gray border border-card-gold/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-gold flex items-center">
                <HelpCircle className="w-5 h-5 mr-3 text-card-gold/80" />
                Support & Help
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
                <Link to="/help">Help Center</Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
                <Link to="/terms">Terms of Service</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-transparent border-red-500/30 border shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Button onClick={handleDeactivate} variant="outline" className="w-full justify-start text-orange-500 border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400">
                  Deactivate Account
                </Button>
                <Button onClick={handleSignOut} variant="outline" className="w-full justify-start text-red-500 border-red-500/50 hover:bg-red-500/10 hover:text-red-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
