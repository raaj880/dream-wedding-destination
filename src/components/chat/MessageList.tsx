
import React from 'react';
import { type ChatMessage } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: ChatMessage[];
  currentUser?: { id: string } | null;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}

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

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUser, scrollAreaRef }) => {
  return (
    <ScrollArea className="flex-1 px-4 py-6" ref={scrollAreaRef}>
      <div className="space-y-4 max-w-2xl mx-auto">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(new Date(message.timestamp)) !== formatDate(new Date(messages[index - 1].timestamp));
          const isUser = message.senderId === currentUser?.id;

          return (
            <div key={message.id}>
              {showDate && (
                <div className="text-center mb-4">
                  <Badge variant="outline" className="bg-white/80 text-gray-600 text-xs">
                    {formatDate(new Date(message.timestamp))}
                  </Badge>
                </div>
              )}
              <MessageBubble message={message} isUser={isUser} />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
