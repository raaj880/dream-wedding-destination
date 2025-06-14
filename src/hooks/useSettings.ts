
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Tables } from '@/integrations/supabase/types';

export type UserSettings = {
  profile_visibility: 'everyone' | 'matches_only';
  show_online_status: boolean;
  hide_from_search: boolean;
  notification_settings: {
    new_matches: boolean;
    messages: boolean;
    profile_views: boolean;
  };
  account_status: string;
};

export const useSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('profile_visibility, show_online_status, hide_from_search, notification_settings, account_status')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setSettings({
          profile_visibility: data.profile_visibility as UserSettings['profile_visibility'],
          show_online_status: data.show_online_status,
          hide_from_search: data.hide_from_search,
          notification_settings: data.notification_settings as UserSettings['notification_settings'],
          account_status: data.account_status,
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error fetching settings",
        description: "Could not load your settings. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = useCallback(async (newSettings: Partial<Tables<'profiles'>>) => {
    if (!user || !settings) return;

    // Optimistic UI update
    const oldSettings = { ...settings };
    const updatedSettings = { ...settings, ...newSettings } as UserSettings;
    setSettings(updatedSettings);

    try {
      const { error } = await supabase
        .from('profiles')
        .update(newSettings)
        .eq('id', user.id);

      if (error) {
        setSettings(oldSettings); // Revert on failure
        throw error;
      }

      toast({
        title: "Settings updated",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Update failed",
        description: "Could not save your changes. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, settings]);

  return { settings, loading, updateSettings };
};
