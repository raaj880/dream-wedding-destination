
import React from 'react';
import { type ChatMessage } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
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
            new Date(message.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString();
          const isUser = message.senderId === currentUser?.id;

          return (
            <div key={message.id}>
              {showDate && (
                <div className="text-center my-6">
                  <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
                    {formatDate(new Date(message.timestamp))}
                  </span>
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
