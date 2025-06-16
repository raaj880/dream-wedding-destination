
import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/contexts/AuthContext';
import { ChatSkeleton } from '@/components/chat/ChatSkeleton';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock } from 'lucide-react';
import MatchRequiredCard from '@/components/messaging/MatchRequiredCard';

const ChatInterface: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  
  if (!matchId) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Invalid Chat</h2>
            <p className="text-muted-foreground mb-4">This chat session could not be found.</p>
            <Button onClick={() => navigate('/matches')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Matches
            </Button>
          </div>
        </div>
      );
  }

  const { participant, messages, isLoading, error, sendMessage } = useChat(matchId);
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

  // Handle access denied or match not found
  if (error || !participant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {error?.includes('access denied') || error?.includes('not found') ? (
            <MatchRequiredCard 
              userName="this person"
              onClose={() => navigate('/matches')}
            />
          ) : (
            <div className="text-center">
              <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-4">
                {error || 'You can only message people you have matched with.'}
              </p>
              <Button onClick={() => navigate('/matches')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Matches
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <ChatHeader participant={participant} />

      <MessageList 
        messages={messages} 
        currentUser={currentUser} 
        scrollAreaRef={scrollAreaRef} 
      />

      {/* Privacy Note */}
      <div className="px-4 py-2 text-center">
        <p className="text-xs text-muted-foreground">
          🔒 Private & Secure. Be respectful.
        </p>
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
