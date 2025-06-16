
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationList } from './NotificationList';

export const NotificationBell: React.FC = () => {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

    const handleNotificationClick = (notificationId: string) => {
        markAsRead(notificationId);
    };

    const handleMarkAllRead = () => {
        markAllAsRead();
    };

  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" title="Notifications" className="relative w-10 h-10 hover:bg-card-gold/20 rounded-full text-card-gold border border-card-gold/30">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 md:w-96 p-0 bg-slate-900/95 backdrop-blur-md border-slate-700 text-white shadow-2xl z-50" align="end">
            <NotificationList
                notifications={notifications}
                onNotificationClick={handleNotificationClick}
                onMarkAllAsRead={handleMarkAllRead}
            />
        </PopoverContent>
    </Popover>
  );
};
