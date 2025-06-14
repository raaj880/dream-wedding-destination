
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
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/profile">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <h1 className="text-xl font-semibold text-deep-blue dark:text-white">Settings</h1>
            </div>
            <div onClick={() => navigate('/')} className="flex items-center space-x-2 text-deep-blue hover:text-deep-blue/80 transition-colors cursor-pointer">
              <Heart className="w-6 h-6 text-soft-pink fill-soft-pink" />
              <span className="text-xl font-bold">Wedder</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Account Settings */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/profile-setup">
                  Edit Profile Information
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Coming Soon!", description: "This feature is not yet implemented."})}>
                Change Password
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/profile-setup">
                  Manage Photos
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading || !settings ? renderLoadingSkeleton() : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-deep-blue dark:text-white">Profile Visibility</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Control who can see your profile</p>
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
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-deep-blue dark:text-white">Show Online Status</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Let others see when you're active</p>
                    </div>
                    <Switch
                      checked={settings.show_online_status}
                      onCheckedChange={(checked) => handleSettingChange('show_online_status', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-deep-blue dark:text-white">Hide from Search</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Don't appear in search results</p>
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
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading || !settings ? renderLoadingSkeleton() : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-deep-blue dark:text-white">New Matches</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Get notified about new matches</p>
                    </div>
                    <Switch
                      checked={settings.notification_settings.new_matches}
                      onCheckedChange={(checked) => handleNotificationChange('new_matches', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-deep-blue dark:text-white">Messages</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Get notified about new messages</p>
                    </div>
                    <Switch
                      checked={settings.notification_settings.messages}
                      onCheckedChange={(checked) => handleNotificationChange('messages', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-deep-blue dark:text-white">Profile Views</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Know when someone views your profile</p>
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
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-deep-blue dark:text-white flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Support & Help
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/help">Help Center</Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/terms">Terms of Service</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Button onClick={handleDeactivate} variant="outline" className="w-full justify-start text-orange-600 border-orange-600 hover:bg-orange-50">
                  Deactivate Account
                </Button>
                <Button onClick={handleSignOut} variant="outline" className="w-full justify-start text-red-600 border-red-600 hover:bg-red-50">
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
