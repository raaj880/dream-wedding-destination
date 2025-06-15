import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { type Notification, type NotificationType } from '@/types/notification';

const fetchNotifications = async (userId: string): Promise<Notification[]> => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data.map(n => ({
    id: n.id,
    userId: n.user_id,
    type: n.type as NotificationType,
    data: n.data as any,
    isRead: n.is_read,
    createdAt: new Date(n.created_at),
  }));
};

const markNotificationAsRead = async (notificationId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) throw new Error(error.message);
};

const markAllNotificationsAsRead = async (userId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) throw new Error(error.message);
};

export const useNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const queryKey = ['notifications', user?.id];

  const { data: notifications = [], isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchNotifications(user!.id),
    enabled: !!user,
  });

  const readMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const readAllMutation = useMutation({
    mutationFn: () => markAllNotificationsAsRead(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newNotification: Notification = {
            id: payload.new.id,
            userId: payload.new.user_id,
            type: payload.new.type as NotificationType,
            data: payload.new.data as any,
            isRead: payload.new.is_read,
            createdAt: new Date(payload.new.created_at),
          };
          queryClient.setQueryData(queryKey, (oldData: Notification[] | undefined) => {
              return [newNotification, ...(oldData || [])];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient, queryKey]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return {
    notifications,
    isLoading,
    unreadCount,
    markAsRead: readMutation.mutate,
    markAllAsRead: readAllMutation.mutate,
  };
};
