
import React from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { UserSettings } from '@/hooks/useSettings';
import SettingsLoadingSkeleton from './SettingsLoadingSkeleton';

interface PrivacySettingsProps {
  settings: UserSettings | null;
  loading: boolean;
  handleSettingChange: (key: keyof UserSettings, value: any) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ settings, loading, handleSettingChange }) => {
  return (
    <Card className="bg-card-dark-gray border border-card-gold/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-gold flex items-center">
          <Shield className="w-5 h-5 mr-3 text-card-gold/80" />
          Privacy & Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading || !settings ? <SettingsLoadingSkeleton /> : (
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
  );
};

export default PrivacySettings;
