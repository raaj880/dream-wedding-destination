
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Settings, Filter, Zap, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { usePotentialMatches } from '@/hooks/usePotentialMatches';
import { useSwipeActions } from '@/hooks/useSwipeActions';
import { useFilters } from '@/hooks/useFilters';
import ProfileCard from '@/components/swipe/ProfileCard';
import MatchNotificationManager from '@/components/matches/MatchNotificationManager';
import { toast } from '@/hooks/use-toast';

const SwipeInterface: React.FC = () => {
  const navigate = useNavigate();
  const { matches, loading, error, refetch } = usePotentialMatches();
  const { recordInteraction, loading: swipeLoading } = useSwipeActions();
  const { isActive: isFilterActive } = useFilters();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [swipeStats, setSwipeStats] = useState({
    likes: 0,
    passes: 0,
    superlikes: 0
  });

  const currentProfile = matches[currentIndex];
  const remainingProfiles = matches.length - currentIndex;

  const handleSwipeAction = async (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProfile || swipeLoading) return;

    try {
      const result = await recordInteraction(currentProfile.id, action);
      
      // Update swipe stats
      setSwipeStats(prev => ({
        ...prev,
        [action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes']: 
          prev[action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes'] + 1
      }));

      // Show appropriate feedback based on action
      if (action === 'like') {
        toast({
          title: "Profile Liked! ❤️",
          description: "You'll be notified if they like you back.",
        });
      } else if (action === 'superlike') {
        toast({
          title: "Super Like Sent! ⭐",
          description: `${currentProfile.full_name} will see you liked them!`,
        });
      } else {
        toast({
          title: "Profile Passed",
          description: "Moving to the next profile.",
        });
      }

      // Move to next profile with a slight delay for animation
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
      
    } catch (error) {
      console.error('Error handling swipe:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetSwipes = async () => {
    setIsRefreshing(true);
    setCurrentIndex(0);
    setSwipeStats({ likes: 0, passes: 0, superlikes: 0 });
    
    try {
      await refetch();
      toast({
        title: "Profiles Refreshed",
        description: "Loading fresh profiles for you.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh profiles. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!currentProfile || swipeLoading) return;
      
      switch (event.key) {
        case 'ArrowLeft':
        case 'x':
          handleSwipeAction('pass');
          break;
        case 'ArrowRight':
        case 'z':
          handleSwipeAction('like');
          break;
        case 'ArrowUp':
        case 's':
          handleSwipeAction('superlike');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentProfile, swipeLoading]);

  if (loading || isRefreshing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deep-blue mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isRefreshing ? 'Refreshing profiles...' : 'Loading profiles...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
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
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="w-6 h-6 text-deep-blue" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-deep-blue">Discover</h1>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/filter">
                  <Filter className="w-5 h-5 text-gray-600" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={resetSwipes}>
                <RotateCcw className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-2xl font-bold text-deep-blue mb-4">
              No more profiles to show
            </h2>
            <p className="text-gray-600 mb-6">
              You've seen all available profiles. Check back later for new members or adjust your filters!
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-deep-blue text-white" asChild>
                <Link to="/filter">
                  <Filter className="w-4 h-4 mr-2" />
                  Adjust Filters
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={resetSwipes}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Refresh Profiles
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/matches">
                  <Heart className="w-4 h-4 mr-2" />
                  View Matches
                </Link>
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
          
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-deep-blue">Discover</h1>
            {isFilterActive && (
              <Badge variant="secondary" className="bg-soft-pink text-deep-blue">
                Filtered
              </Badge>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/filter">
                <Filter className="w-5 h-5 text-gray-600" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={resetSwipes} disabled={isRefreshing}>
              <RotateCcw className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-2">
        <div className="flex items-center justify-between max-w-md mx-auto text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              <Users className="w-4 h-4 inline mr-1" />
              {remainingProfiles} left
            </span>
            <span className="text-green-600">
              ❤️ {swipeStats.likes}
            </span>
            <span className="text-blue-600">
              ⭐ {swipeStats.superlikes}
            </span>
            <span className="text-gray-500">
              ✕ {swipeStats.passes}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Cards */}
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="relative h-[600px]">
          <AnimatePresence mode="wait">
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

          {/* Next profile preview */}
          {matches[currentIndex + 1] && (
            <div className="absolute inset-0 -z-10 scale-95 opacity-50">
              <ProfileCard
                profile={matches[currentIndex + 1]}
                onSwipe={() => {}}
                isVisible={true}
                index={1}
              />
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-6 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Keyboard Shortcuts</h3>
            <div className="flex justify-center space-x-6 text-xs text-gray-500">
              <span>← or X = Pass</span>
              <span>↑ or S = Super Like</span>
              <span>→ or Z = Like</span>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 text-center">
          <div className="bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
            <div 
              className="bg-deep-blue h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${matches.length > 0 ? ((currentIndex) / matches.length) * 100 : 0}%` 
              }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {matches.length - currentIndex} profiles remaining
          </p>
        </div>
      </div>

      {/* Real-time Match Notifications */}
      <MatchNotificationManager />
    </div>
  );
};

export default SwipeInterface;
