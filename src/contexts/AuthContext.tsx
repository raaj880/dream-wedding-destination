
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('currentUser', null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      email,
      fullName: 'Aditi Sharma',
      age: 28,
      dateOfBirth: new Date('1995-06-15'),
      gender: 'female',
      location: 'Mumbai, Maharashtra',
      religion: 'Hindu',
      community: 'Brahmin',
      languages: ['Hindi', 'English', 'Marathi'],
      profession: 'Software Engineer',
      education: 'Masters in Computer Science',
      height: "5'6\"",
      marryTimeframe: '1y',
      bio: 'Looking for a life partner who shares similar values and interests.',
      photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'],
      verified: true,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setUser(mockUser);
  };

  const signup = async (userData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email || userData.phoneNumber + '@wedder.com',
      fullName: userData.fullName,
      age: 25,
      dateOfBirth: new Date('1999-01-01'),
      gender: 'female',
      location: 'Delhi, India',
      religion: 'Hindu',
      community: 'General',
      languages: ['Hindi', 'English'],
      profession: 'Professional',
      education: 'Graduate',
      height: "5'5\"",
      marryTimeframe: '1y',
      bio: '',
      photos: [],
      verified: false,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates, updatedAt: new Date() });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      signup,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
