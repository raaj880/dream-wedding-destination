
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

  useEffect(() => {
    const checkAndRedirect = async () => {
      // Skip if not authenticated, still loading, or already checking
      if (!isAuthenticated || loading || isCheckingProfile || !user) {
        return;
      }

      // Skip if already on profile setup page
      if (location.pathname === '/profile-setup') {
        return;
      }

      setIsCheckingProfile(true);
      
      try {
        const isComplete = await checkProfileCompletion();
        
        if (!isComplete) {
          console.log('Profile incomplete, redirecting to setup');
          navigate('/profile-setup', { replace: true });
        }
      } catch (error) {
        console.error('Error checking profile completion:', error);
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkAndRedirect();
  }, [isAuthenticated, user, loading, checkProfileCompletion, navigate, location.pathname, isCheckingProfile]);

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
