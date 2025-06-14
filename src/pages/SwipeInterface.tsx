
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { usePotentialMatches } from '@/hooks/usePotentialMatches';
import { useSwipeActions } from '@/hooks/useSwipeActions';
import ProfileCard from '@/components/swipe/ProfileCard';
import { toast } from '@/hooks/use-toast';

const SwipeInterface: React.FC = () => {
  const navigate = useNavigate();
  const { matches, loading, error, refetch } = usePotentialMatches();
  const { recordInteraction, loading: swipeLoading } = useSwipeActions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<string>('');

  const currentProfile = matches[currentIndex];

  const handleSwipeAction = async (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProfile || swipeLoading) return;

    try {
      const result = await recordInteraction(currentProfile.id, action);
      
      if (result.isMatch) {
        setMatchedUser(currentProfile.full_name);
        setShowMatchModal(true);
        toast({
          title: "It's a Match! 💕",
          description: `You and ${currentProfile.full_name} liked each other!`,
        });
      } else if (action === 'like') {
        toast({
          title: "Profile Liked! ❤️",
          description: "You'll be notified if they like you back.",
        });
      } else if (action === 'superlike') {
        toast({
          title: "Super Like Sent! ⭐",
          description: `${currentProfile.full_name} will see you liked them!`,
        });
      }

      // Move to next profile after a short delay
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, result.isMatch ? 2000 : 500);
    } catch (error) {
      console.error('Error handling swipe:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetSwipes = () => {
    setCurrentIndex(0);
    refetch();
    toast({
      title: "Profiles Reset",
      description: "Loading fresh profiles for you.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deep-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
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
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-deep-blue mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button className="w-full bg-deep-blue text-white" onClick={refetch}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProfile && matches.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
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

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-2xl font-bold text-deep-blue mb-4">
              No more profiles to show
            </h2>
            <p className="text-gray-600 mb-6">
              You've seen all available profiles. Check back later for new members!
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-deep-blue text-white" asChild>
                <Link to="/filter">Adjust Filters</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={resetSwipes}>
                Refresh Profiles
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
            {matches.length - currentIndex} profiles remaining
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
