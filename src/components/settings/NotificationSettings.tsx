
import React from 'react';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { UserSettings } from '@/hooks/useSettings';
import SettingsLoadingSkeleton from './SettingsLoadingSkeleton';

interface NotificationSettingsProps {
  settings: UserSettings | null;
  loading: boolean;
  handleNotificationChange: (key: keyof UserSettings['notification_settings'], value: boolean) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, loading, handleNotificationChange }) => {
  return (
    <Card className="bg-card-dark-gray border border-card-gold/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-gold flex items-center">
          <Bell className="w-5 h-5 mr-3 text-card-gold/80" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading || !settings ? <SettingsLoadingSkeleton /> : (
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
  );
};

export default NotificationSettings;
