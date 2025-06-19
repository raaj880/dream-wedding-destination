
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onTyping?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onTyping }) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    onTyping?.();
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
    inputRef.current?.focus();
    onTyping?.();
  };

  return (
    <div className="bg-background/80 backdrop-blur-md border-t border-border px-4 py-3 sticky bottom-0">
      <div className="flex items-center space-x-3 max-w-2xl mx-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
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
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="pr-12 bg-muted border-border focus:border-primary focus:ring-primary rounded-full"
          />
        </div>
        
        <motion.div
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-10 h-10 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
