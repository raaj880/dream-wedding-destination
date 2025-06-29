
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type UserProfile } from '@/types/match';

interface ChatHeaderProps {
  participant?: UserProfile;
  isTyping?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ participant, isTyping = false }) => {
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
    <div className="bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/matches">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </Link>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={participant.photos?.[0]} alt={participant.fullName} />
              <AvatarFallback>{participant.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
            {participant.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-background rounded-full"></div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground">
              {participant.fullName}, {participant.age}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isTyping ? (
                <span className="text-primary flex items-center space-x-1">
                  <span>Typing</span>
                  <span className="flex space-x-1">
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </span>
                </span>
              ) : (
                participant.isOnline ? 'Online' : `Last seen ${formatDate(participant.lastSeen)}`
              )}
            </p>
          </div>
        </div>
      </div>
      
      <Button variant="ghost" size="icon">
        <MoreVertical className="w-6 h-6 text-primary" />
      </Button>
    </div>
  );
};
