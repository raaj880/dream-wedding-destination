
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Smile, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other' | 'system';
  timestamp: Date;
  read?: boolean;
}

interface ChatUser {
  id: number;
  name: string;
  age: number;
  image: string;
  isOnline: boolean;
  lastSeen?: string;
}

const mockUser: ChatUser = {
  id: 1,
  name: 'Ananya',
  age: 27,
  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  isOnline: true,
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Welcome to Wedder! 💕 You both liked each other - start a meaningful conversation and get to know each other better. Remember to be respectful and authentic.",
    sender: 'system',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: 2,
    text: "Hi! I really enjoyed reading your profile. Your passion for cooking really caught my attention! 😊",
    sender: 'other',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: true,
  },
  {
    id: 3,
    text: "Thank you! I saw you love traveling. Which has been your favorite destination so far?",
    sender: 'user',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    read: true,
  },
  {
    id: 4,
    text: "Oh, definitely Japan! The culture, food, and people were incredible. I'd love to go back someday. What about you? Any dream destinations?",
    sender: 'other',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    read: false,
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      read: false,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // You could add an auto-response here for demo purposes
    }, 2000);
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
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={mockUser.image} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {mockUser.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-deep-blue">
                {mockUser.name}, {mockUser.age}
              </h3>
              <p className="text-sm text-gray-600">
                {mockUser.isOnline ? 'Online' : mockUser.lastSeen || 'Last seen recently'}
              </p>
            </div>
          </div>
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
              formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
            
            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center mb-4">
                    <Badge variant="outline" className="bg-white/80 text-gray-600 text-xs">
                      {formatDate(message.timestamp)}
                    </Badge>
                  </div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' :
                    message.sender === 'system' ? 'justify-center' : 'justify-start'
                  }`}
                >
                  {message.sender === 'system' ? (
                    <div className="bg-gray-100 text-gray-700 px-4 py-3 rounded-2xl max-w-xs text-center text-sm">
                      {message.text}
                    </div>
                  ) : (
                    <div className={`max-w-xs lg:max-w-md ${
                      message.sender === 'user' ? 'ml-auto' : 'mr-auto'
                    }`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-deep-blue text-white rounded-br-md'
                            : 'bg-soft-pink text-deep-blue rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <div className={`mt-1 px-2 ${
                        message.sender === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                          {message.sender === 'user' && (
                            <span className="ml-1">
                              {message.read ? '✓✓' : '✓'}
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
          
          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="bg-soft-pink text-deep-blue px-4 py-3 rounded-2xl rounded-bl-md max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-deep-blue/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-deep-blue/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-deep-blue/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
