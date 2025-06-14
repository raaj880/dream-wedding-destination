
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedProfileCard from '@/components/discover/EnhancedProfileCard';

interface ProfileListProps {
  displayProfiles: any[];
  handleSwipeAction: (profileId: string, action: 'like' | 'pass' | 'superlike') => void;
}

const ProfileList: React.FC<ProfileListProps> = ({ displayProfiles, handleSwipeAction }) => {
  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {displayProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 }
            }}
            exit={{ opacity: 0, x: -100 }}
            layout
          >
            <EnhancedProfileCard
              profile={profile}
              onSwipe={(action) => handleSwipeAction(profile.id, action)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProfileList;
