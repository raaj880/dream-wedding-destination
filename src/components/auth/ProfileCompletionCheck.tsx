
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileCompletionCheckProps {
  children: React.ReactNode;
}

const ProfileCompletionCheck: React.FC<ProfileCompletionCheckProps> = ({ children }) => {
  const { user, isAuthenticated, checkProfileCompletion, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const checkAndRedirect = async () => {
      // Skip if not authenticated, still loading, already checking, or already checked
      if (!isAuthenticated || loading || isCheckingProfile || !user || hasChecked) {
        return;
      }

      // Skip if already on profile setup page
      if (location.pathname === '/profile-setup') {
        setHasChecked(true);
        return;
      }

      setIsCheckingProfile(true);
      
      try {
        const isComplete = await checkProfileCompletion();
        
        if (!isComplete) {
          console.log('Profile incomplete, redirecting to setup');
          navigate('/profile-setup', { replace: true });
        } else {
          console.log('Profile is complete');
        }
        
        setHasChecked(true);
      } catch (error) {
        console.error('Error checking profile completion:', error);
        setHasChecked(true);
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkAndRedirect();
  }, [isAuthenticated, user?.id, loading, location.pathname]); // Only depend on user.id, not the entire user object

  // Reset hasChecked when user changes or location changes to profile-setup
  useEffect(() => {
    if (location.pathname === '/profile-setup') {
      setHasChecked(false);
    }
  }, [location.pathname]);

  // Reset hasChecked when user changes
  useEffect(() => {
    setHasChecked(false);
  }, [user?.id]);

  // Show loading while checking profile
  if (isAuthenticated && (loading || isCheckingProfile)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deep-blue"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProfileCompletionCheck;
