
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type UserProfile } from '@/types/match';

interface ChatHeaderProps {
  participant?: UserProfile;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ participant }) => {
  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString();
  };

  if (!participant) {
      return null; // Or a placeholder/skeleton
  }
  
  return (
    <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/matches">
            <ArrowLeft className="w-6 h-6 text-deep-blue" />
          </Link>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={participant.photos?.[0]} alt={participant.fullName} />
              <AvatarFallback>{participant.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
            {participant.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-deep-blue">
              {participant.fullName}, {participant.age}
            </h3>
            <p className="text-sm text-gray-600">
              {participant.isOnline ? 'Online' : `Last seen ${formatDate(participant.lastSeen)}`}
            </p>
          </div>
        </div>
      </div>
      
      <Button variant="ghost" size="icon">
        <MoreVertical className="w-6 h-6 text-deep-blue" />
      </Button>
    </div>
  );
};
