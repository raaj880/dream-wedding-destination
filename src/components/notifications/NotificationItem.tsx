
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, User } from 'lucide-react';
import { type Notification } from '@/types/notification';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
  onNotificationClick: (notificationId: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onNotificationClick }) => {
  const { type, data, isRead, createdAt, id } = notification;

  const renderContent = () => {
    switch (type) {
      case 'new_match':
        return {
          icon: <Heart className="w-5 h-5 text-red-500" />,
          title: 'New Match!',
          message: (
            <span>
              You and <strong>{data.matched_user_name}</strong> liked each other!
            </span>
          ),
          link: `/matches`,
        };
      case 'new_message':
        return {
          icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
          title: 'New Message',
          message: (
            <span>
              <strong>{data.sender_name}</strong> sent you a message.
            </span>
          ),
          link: `/chat/${data.sender_id}`,
        };
      case 'profile_view':
        return {
          icon: <User className="w-5 h-5 text-purple-500" />,
          title: 'Profile View',
          message: (
            <span>
              <strong>{data.viewer_name}</strong> viewed your profile.
            </span>
          ),
          link: `/dashboard`, // No public profile page yet, linking to dashboard
        };
      default:
        return {
          icon: null,
          title: 'Notification',
          message: 'You have a new notification.',
          link: '#',
        };
    }
  };

  const { icon, title, message, link } = renderContent();
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  const handleClick = () => {
    if (!isRead) {
      onNotificationClick(id);
    }
  };

  return (
    <Link to={link} onClick={handleClick}>
      <div
        className={cn(
          'p-3 flex items-start space-x-4 hover:bg-card-gold/10 rounded-lg transition-colors duration-200',
          !isRead && 'bg-card-gold/5'
        )}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            {icon}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white text-sm">{title}</p>
          <p className="text-gray-300 text-sm">{message}</p>
          <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
        </div>
        {!isRead && (
          <div className="w-2.5 h-2.5 bg-card-gold rounded-full self-center" />
        )}
      </div>
    </Link>
  );
};
