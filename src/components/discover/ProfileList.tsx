
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedProfileCard from '@/components/discover/EnhancedProfileCard';

interface ProfileListProps {
  displayProfiles: any[];
  handleSwipeAction: (profileId: string, action: 'like' | 'pass' | 'superlike') => void;
}

const ProfileList: React.FC<ProfileListProps> = ({ displayProfiles, handleSwipeAction }) => {
  const profileRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set up intersection observer for profile viewing tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const profileId = entry.target.getAttribute('data-profile-id');
          if (profileId && entry.isIntersecting) {
            // Profile became visible - this could trigger analytics or other side effects
            console.log('📊 Profile viewed:', profileId);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all current profile elements
    profileRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [displayProfiles]);

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {displayProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            ref={(el) => (profileRefs.current[index] = el)}
            data-profile-id={profile.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: Math.min(index * 0.1, 0.5), // Cap delay to prevent too long waits
                duration: 0.5,
                ease: "easeOut"
              }
            }}
            exit={{ opacity: 0, x: -100 }}
            layout
            className="w-full"
          >
            <EnhancedProfileCard
              profile={profile}
              onSwipe={(action) => handleSwipeAction(profile.id, action)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {displayProfiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No profiles to show</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or check back later</p>
        </div>
      )}
    </div>
  );
};

export default ProfileList;
