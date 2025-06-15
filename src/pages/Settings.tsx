
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings, UserSettings } from '@/hooks/useSettings';
import { toast } from '@/components/ui/use-toast';
import SettingsHeader from '@/components/settings/SettingsHeader';
import AccountSettings from '@/components/settings/AccountSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SupportSettings from '@/components/settings/SupportSettings';
import DangerZone from '@/components/settings/DangerZone';

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

  return (
    <div className="min-h-screen bg-black">
      <SettingsHeader />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-8">
          <AccountSettings />
          <PrivacySettings 
            settings={settings}
            loading={loading}
            handleSettingChange={handleSettingChange}
          />
          <NotificationSettings
            settings={settings}
            loading={loading}
            handleNotificationChange={handleNotificationChange}
          />
          <SupportSettings />
          <DangerZone
            handleDeactivate={handleDeactivate}
            handleSignOut={handleSignOut}
          />
        </div>
      </main>
    </div>
  );
};

export default Settings;
