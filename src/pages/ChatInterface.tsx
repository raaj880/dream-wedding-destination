
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Smile, MoreVertical, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link, useParams } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';


const ChatInterface: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { user: currentUser } = useAuth();
  
  if (!matchId) {
      return <div>Invalid match ID.</div>;
  }

  const { participant, messages, isLoading, sendMessage } = useChat(matchId);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive or when chat loads
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !matchId) return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

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

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-soft-pink/20 via-white to-deep-blue/10 flex flex-col">
        {/* Header Skeleton */}
        <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/matches"><ArrowLeft className="w-6 h-6 text-deep-blue" /></Link>
            </Button>
            <div className="flex items-center space-x-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
          <Skeleton className="w-6 h-6" />
        </div>

        {/* Messages Skeleton */}
        <div className="flex-1 px-4 py-6 flex justify-center items-center">
            <Loader2 className="w-8 h-8 text-deep-blue animate-spin" />
        </div>
        
        {/* Input Skeleton */}
        <div className="bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3 sticky bottom-0">
          <div className="flex items-center space-x-3 max-w-2xl mx-auto">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-10 flex-1 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-soft-pink/20 via-white to-deep-blue/10 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/matches">
              <ArrowLeft className="w-6 h-6 text-deep-blue" />
            </Link>
          </Button>
          
          {participant && (
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
          )}
        </div>
        
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-6 h-6 text-deep-blue" />
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-6" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((message, index) => {
            const showDate = index === 0 || 
              formatDate(new Date(message.timestamp)) !== formatDate(new Date(messages[index - 1].timestamp));
            const senderType = message.senderId === currentUser?.id ? 'user' : 'other';

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center mb-4">
                    <Badge variant="outline" className="bg-white/80 text-gray-600 text-xs">
                      {formatDate(new Date(message.timestamp))}
                    </Badge>
                  </div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    senderType === 'user' ? 'justify-end' :
                    message.type === 'system' ? 'justify-center' : 'justify-start'
                  }`}
                >
                  {message.type === 'system' ? (
                    <div className="bg-gray-100 text-gray-700 px-4 py-3 rounded-2xl max-w-xs text-center text-sm">
                      {message.content}
                    </div>
                  ) : (
                    <div className={`max-w-xs lg:max-w-md ${
                      senderType === 'user' ? 'ml-auto' : 'mr-auto'
                    }`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          senderType === 'user'
                            ? 'bg-deep-blue text-white rounded-br-md'
                            : 'bg-soft-pink text-deep-blue rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <div className={`mt-1 px-2 ${
                        senderType === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        <span className="text-xs text-gray-500">
                          {formatTime(new Date(message.timestamp))}
                          {senderType === 'user' && (
                            <span className="ml-1">
                              {message.status === 'read' ? '✓✓' : '✓'}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Privacy Note */}
      <div className="px-4 py-2 text-center">
        <p className="text-xs text-gray-500">
          🔒 Private & Secure. Be respectful.
        </p>
      </div>

      {/* Chat Input */}
      <div className="bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3 sticky bottom-0">
        <div className="flex items-center space-x-3 max-w-2xl mx-auto">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-deep-blue">
            <Smile className="w-6 h-6" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-12 border-gray-300 focus:border-deep-blue focus:ring-deep-blue rounded-full"
            />
          </div>
          
          <motion.div
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-deep-blue text-white hover:bg-deep-blue/90 rounded-full w-10 h-10 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
