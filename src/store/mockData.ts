
import { Match, UserProfile } from '@/types/match';
import { User } from '@/types/user';
import { ChatMessage } from '@/types/chat';

export const mockUsers: UserProfile[] = [
  {
    id: '1',
    fullName: 'Ananya Sharma',
    age: 27,
    location: 'Mumbai, India',
    profession: 'Product Manager',
    religion: 'Hindu',
    photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'],
    verified: true,
    isOnline: true,
    lastSeen: new Date(),
    bio: 'Love traveling, reading, and trying new cuisines. Looking for someone who shares similar values and is ready for marriage.'
  },
  {
    id: '2',
    fullName: 'Rahul Gupta',
    age: 29,
    location: 'Bangalore, India',
    profession: 'Software Engineer',
    religion: 'Hindu',
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'],
    verified: true,
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    bio: 'Tech enthusiast, fitness lover, and family-oriented person. Seeking a life partner who values tradition and growth.'
  },
  {
    id: '3',
    fullName: 'Kavya Reddy',
    age: 26,
    location: 'Hyderabad, India',
    profession: 'Doctor',
    religion: 'Hindu',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'],
    verified: false,
    isOnline: false,
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    bio: 'Passionate about healthcare and helping others. Love classical music and dancing. Ready to start a beautiful journey together.'
  }
];

export const mockMatches: Match[] = [
  {
    id: 'match1',
    user1Id: 'currentUser',
    user2Id: '1',
    user: mockUsers[0],
    matchedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'new',
    lastMessageAt: undefined,
    lastMessage: undefined
  },
  {
    id: 'match2',
    user1Id: 'currentUser',
    user2Id: '2',
    user: mockUsers[1],
    matchedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: 'chatting',
    lastMessageAt: new Date(Date.now() - 10 * 60 * 1000),
    lastMessage: 'That sounds great! When would be good for you?'
  },
  {
    id: 'match3',
    user1Id: 'currentUser',
    user2Id: '3',
    user: mockUsers[2],
    matchedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'seen',
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    lastMessage: 'Nice to meet you!'
  }
];

export const mockMessages: ChatMessage[] = [
  {
    id: 'msg1',
    chatId: 'match2',
    senderId: '2',
    receiverId: 'currentUser',
    content: 'Hi! Nice to match with you 😊',
    type: 'text',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'read'
  },
  {
    id: 'msg2',
    chatId: 'match2',
    senderId: 'currentUser',
    receiverId: '2',
    content: 'Thank you! I really liked your profile. How has your day been?',
    type: 'text',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    status: 'read'
  },
  {
    id: 'msg3',
    chatId: 'match2',
    senderId: '2',
    receiverId: 'currentUser',
    content: 'It\'s been great! I was just reading about your travels in your bio. I love traveling too. Would love to hear about your favorite destinations!',
    type: 'text',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    status: 'read'
  },
  {
    id: 'msg4',
    chatId: 'match2',
    senderId: 'currentUser',
    receiverId: '2',
    content: 'Oh that\'s wonderful! I recently visited Japan and it was absolutely amazing. The culture, food, and people were incredible. Have you been there?',
    type: 'text',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: 'read'
  },
  {
    id: 'msg5',
    chatId: 'match2',
    senderId: '2',
    receiverId: 'currentUser',
    content: 'That sounds great! When would be good for you?',
    type: 'text',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    status: 'delivered'
  }
];
