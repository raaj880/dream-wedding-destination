
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3 sticky bottom-0">
      <div className="flex items-center space-x-3 max-w-2xl mx-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-deep-blue">
              <Smile className="w-6 h-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none mb-2">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </PopoverContent>
        </Popover>
        
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
  );
};
