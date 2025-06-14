
export interface User {
  id: string;
  email: string;
  fullName: string;
  age: number;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  location: string;
  religion: string;
  community: string;
  languages: string[];
  profession: string;
  education: string;
  height: string;
  marryTimeframe: '6m' | '1y' | '2y' | 'norush';
  bio: string;
  photos: string[];
  verified: boolean;
  isOnline: boolean;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, 'email' | 'createdAt' | 'updatedAt'> {
  distance?: number;
  mutualConnections?: number;
}

export interface UserPreferences {
  ageRange: [number, number];
  maxDistance: number;
  location: string;
  religions: string[];
  communities: string[];
  education: string[];
  languages: string[];
  verifiedOnly: boolean;
}
