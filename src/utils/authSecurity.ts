
import { supabase } from '@/integrations/supabase/client';

// Enhanced auth state cleanup
export const cleanupAuthState = () => {
  try {
    // Clear all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });

    // Clear from sessionStorage if available
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  } catch (error) {
    console.warn('Error cleaning up auth state:', error);
  }
};

// Secure logout function
export const secureLogout = async () => {
  try {
    // Clean up auth state first
    cleanupAuthState();
    
    // Attempt global sign out
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      console.warn('Global signout failed:', err);
    }
    
    // Force page reload for clean state
    window.location.href = '/auth';
  } catch (error) {
    console.error('Secure logout error:', error);
    // Still redirect even if cleanup fails
    window.location.href = '/auth';
  }
};

// Enhanced login with cleanup
export const secureLogin = async (email: string, password: string) => {
  try {
    // Clean up existing state
    cleanupAuthState();
    
    // Attempt global sign out first
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
    }
    
    // Sign in with email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });
    
    if (error) throw error;
    
    if (data.user) {
      // Force page reload for clean state
      window.location.href = '/';
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

// Session validation
export const validateSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session validation error:', error);
      return false;
    }
    
    if (!session) {
      return false;
    }
    
    // Check if session is expired
    const now = new Date().getTime();
    const expiresAt = new Date(session.expires_at || 0).getTime();
    
    if (now >= expiresAt) {
      console.log('Session expired');
      await secureLogout();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
};

// Audit logging function
export const logSecurityEvent = async (action: string, details?: any) => {
  try {
    const { error } = await supabase.rpc('log_audit_event', {
      p_action: action,
      p_table_name: 'security_events',
      p_new_data: details ? JSON.stringify(details) : null
    });
    
    if (error) {
      console.warn('Failed to log security event:', error);
    }
  } catch (error) {
    console.warn('Error logging security event:', error);
  }
};
