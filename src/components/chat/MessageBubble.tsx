
import { motion } from 'framer-motion';
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
        <div className="bg-gray-100 text-gray-700 px-4 py-3 rounded-2xl max-w-xs text-center text-sm">
          {message.content}
        </div>
      </motion.div>
    );
  }

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
              ? 'bg-deep-blue text-white rounded-br-lg'
              : 'bg-white text-deep-blue rounded-bl-lg border border-gray-200'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className={`mt-1.5 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
          <span className="text-xs text-gray-400">
            {formatTime(new Date(message.timestamp))}
            {isUser && message.status && (
              <span className="ml-1.5">
                {message.status === 'read' ? '✓✓' : '✓'}
              </span>
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
