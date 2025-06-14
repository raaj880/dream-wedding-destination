
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipe } from '@/hooks/useSwipe';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';
import { useFilters } from '@/hooks/useFilters';
import { mockUsers } from '@/store/mockData';
import ProfileCard from '@/components/swipe/ProfileCard';
import { toast } from '@/hooks/use-toast';

const SwipeInterface: React.FC = () => {
  const navigate = useNavigate();
  const { appliedFilters } = useFilters();
  const { filteredMatches } = useMatchFiltering(mockUsers, appliedFilters);
  const { handleSwipe, hasSwipedUser, currentIndex, setCurrentIndex } = useSwipe();
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<string>('');

  // Filter out users we've already swiped on
  const availableProfiles = filteredMatches.filter(user => !hasSwipedUser(user.id));
  const currentProfile = availableProfiles[currentIndex];

  const handleSwipeAction = (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProfile) return;

    const isMatch = handleSwipe(currentProfile.id, action);
    
    if (isMatch) {
      setMatchedUser(currentProfile.fullName);
      setShowMatchModal(true);
      toast({
        title: "It's a Match! 💕",
        description: `You and ${currentProfile.fullName} liked each other!`,
      });
    } else if (action === 'like') {
      toast({
        title: "Profile Liked! ❤️",
        description: "You'll be notified if they like you back.",
      });
    } else if (action === 'superlike') {
      toast({
        title: "Super Like Sent! ⭐",
        description: `${currentProfile.fullName} will see you liked them!`,
      });
    }

    // Move to next profile after a short delay
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, isMatch ? 2000 : 500);
  };

  const resetSwipes = () => {
    setCurrentIndex(0);
    toast({
      title: "Profiles Reset",
      description: "You can now see all profiles again.",
    });
  };

  if (!currentProfile && availableProfiles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="w-6 h-6 text-deep-blue" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-deep-blue">Discover</h1>
            <Button variant="ghost" size="icon" onClick={resetSwipes}>
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* No More Profiles */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-2xl font-bold text-deep-blue mb-4">
              No more profiles to show
            </h2>
            <p className="text-gray-600 mb-6">
              You've seen all available profiles. Try adjusting your filters or check back later for new members!
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-deep-blue text-white" asChild>
                <Link to="/filter">Adjust Filters</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={resetSwipes}>
                See Profiles Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="w-6 h-6 text-deep-blue" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-deep-blue">Discover</h1>
          <Button variant="ghost" size="icon" onClick={resetSwipes}>
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Profile Cards */}
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="relative h-[600px]">
          <AnimatePresence>
            {currentProfile && (
              <ProfileCard
                key={currentProfile.id}
                profile={currentProfile}
                onSwipe={handleSwipeAction}
                isVisible={true}
                index={0}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {availableProfiles.length - currentIndex} profiles remaining
          </p>
        </div>
      </div>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowMatchModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 text-center max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">💕</div>
              <h2 className="text-2xl font-bold text-deep-blue mb-2">It's a Match!</h2>
              <p className="text-gray-600 mb-6">
                You and {matchedUser} liked each other
              </p>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-deep-blue text-white"
                  onClick={() => {
                    setShowMatchModal(false);
                    navigate('/matches');
                  }}
                >
                  Send Message
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowMatchModal(false)}
                >
                  Keep Swiping
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeInterface;
