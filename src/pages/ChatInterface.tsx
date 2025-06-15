
import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/contexts/AuthContext';
import { ChatSkeleton } from '@/components/chat/ChatSkeleton';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';

const ChatInterface: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { user: currentUser } = useAuth();
  
  if (!matchId) {
      return <div>Invalid match ID.</div>;
  }

  const { participant, messages, isLoading, sendMessage } = useChat(matchId);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive or when chat loads
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isLoading]);

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !matchId) return;
    sendMessage(content);
  };

  if (isLoading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-soft-pink/20 via-white to-deep-blue/10 flex flex-col">
      <ChatHeader participant={participant} />

      <MessageList 
        messages={messages} 
        currentUser={currentUser} 
        scrollAreaRef={scrollAreaRef} 
      />

      {/* Privacy Note */}
      <div className="px-4 py-2 text-center">
        <p className="text-xs text-gray-500">
          🔒 Private & Secure. Be respectful.
        </p>
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
