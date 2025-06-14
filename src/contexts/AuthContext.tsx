
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        return { error };
      }
      
      console.log('Login successful:', data.user?.email);
      return { error: null };
    } catch (error) {
      console.error('Login exception:', error);
      return { error };
    }
  };

  const signup = async (userData: any) => {
    console.log('Attempting signup for:', userData.email || userData.phoneNumber);
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
        console.error('Signup error:', error);
        return { error };
      }
      
      console.log('Signup successful:', data.user?.email);
      return { error: null };
    } catch (error) {
      console.error('Signup exception:', error);
      return { error };
    }
  };

  const logout = async () => {
    console.log('Logging out user');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      } else {
        console.log('Logout successful');
      }
    } catch (error) {
      console.error('Logout exception:', error);
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
      loading
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
