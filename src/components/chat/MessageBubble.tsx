
import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';
import { type ChatMessage } from '@/types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
  isUser: boolean;
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => {
  if (message.type === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center"
      >
        <div className="bg-muted text-muted-foreground px-4 py-3 rounded-2xl max-w-xs text-center text-sm">
          {message.content}
        </div>
      </motion.div>
    );
  }

  const renderReadStatus = () => {
    if (!isUser) return null;
    
    if (message.readAt) {
      return <CheckCheck className="w-3 h-3 text-primary ml-1" />;
    } else {
      return <Check className="w-3 h-3 text-muted-foreground ml-1" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div
          className={`px-4 py-2 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-lg'
              : 'bg-card text-foreground rounded-bl-lg border border-border'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className={`mt-1.5 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center justify-end text-xs text-muted-foreground">
            <span>{formatTime(new Date(message.timestamp))}</span>
            {renderReadStatus()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
