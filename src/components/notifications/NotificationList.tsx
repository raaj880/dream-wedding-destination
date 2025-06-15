
import React from 'react';
import { type Notification } from '@/types/notification';
import { NotificationItem } from './NotificationItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications, onNotificationClick, onMarkAllAsRead }) => {
  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        You have no new notifications.
      </div>
    );
  }

  return (
    <div>
        <div className="flex justify-between items-center p-3 border-b border-card-gold/20">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-card-gold hover:text-white hover:bg-card-gold/10">
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read
            </Button>
        </div>
        <ScrollArea className="h-[400px]">
            <div className="p-2 space-y-1">
            {notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} onNotificationClick={onNotificationClick} />
            ))}
            </div>
        </ScrollArea>
    </div>
  );
};
