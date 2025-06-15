
export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'system';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  lastActivity: Date;
  unreadCount: number;
  isTyping: boolean;
  typingUserId?: string;
}

export interface TypingIndicator {
  chatId: string;
  userId: string;
  isTyping: boolean;
  timestamp: Date;
}
