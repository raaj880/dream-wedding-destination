
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: any }>;
  signup: (userData: any) => Promise<{ error?: any }>;
  logout: () => Promise<void>;
  loading: boolean;
  checkProfileCompletion: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('Setting up auth state listener...');
    }
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (import.meta.env.DEV) {
          console.log('Auth state changed:', event);
        }
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (import.meta.env.DEV) {
        console.log('Initial session loaded');
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      if (import.meta.env.DEV) {
        console.log('Cleaning up auth subscription');
      }
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (import.meta.env.DEV) {
      console.log('Attempting login');
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error.message);
        return { error };
      }
      
      if (import.meta.env.DEV) {
        console.log('Login successful');
      }
      return { error: null };
    } catch (error) {
      console.error('Login exception:', error);
      return { error };
    }
  };

  const signup = async (userData: any) => {
    if (import.meta.env.DEV) {
      console.log('Attempting signup');
    }
    try {
      const email = userData.email || `${userData.phoneNumber}@wedder.app`;
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData.fullName,
            phone_number: userData.phoneNumber,
          }
        }
      });
      
      if (error) {
        console.error('Signup error:', error.message);
        return { error };
      }
      
      if (import.meta.env.DEV) {
        console.log('Signup successful');
      }
      return { error: null };
    } catch (error) {
      console.error('Signup exception:', error);
      return { error };
    }
  };

  const logout = async () => {
    if (import.meta.env.DEV) {
      console.log('Logging out user');
    }
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error.message);
      } else if (import.meta.env.DEV) {
        console.log('Logout successful');
      }
    } catch (error) {
      console.error('Logout exception:', error);
    }
  };

  const checkProfileCompletion = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, age, bio')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking profile:', error);
        return false;
      }

      // Consider profile complete if user has basic info - return proper boolean
      return !!(data?.full_name && data?.age && data?.bio);
    } catch (error) {
      console.error('Error checking profile completion:', error);
      return false;
    }
  };

  const isAuthenticated = !!session;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isAuthenticated,
      login,
      signup,
      logout,
      loading,
      checkProfileCompletion
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
