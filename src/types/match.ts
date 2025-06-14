
import { User } from './user';

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  user: UserProfile;
  matchedAt: Date;
  status: 'new' | 'seen' | 'chatting' | 'unmatched';
  lastMessageAt?: Date;
  lastMessage?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  location: string;
  profession: string;
  religion: string;
  photos: string[];
  verified: boolean;
  isOnline: boolean;
  lastSeen: Date;
  bio: string;
}

export interface SwipeAction {
  userId: string;
  targetUserId: string;
  action: 'like' | 'pass' | 'superlike';
  timestamp: Date;
}

export interface LikeNotification {
  id: string;
  fromUserId: string;
  toUserId: string;
  createdAt: Date;
  seen: boolean;
}
