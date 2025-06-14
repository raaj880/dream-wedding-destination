
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Settings, Filter, Zap, Users, Heart, TrendingUp, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { usePotentialMatches } from '@/hooks/usePotentialMatches';
import { useSwipeActions } from '@/hooks/useSwipeActions';
import { useFilters } from '@/hooks/useFilters';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';
import { useSwipeTutorial } from '@/hooks/useSwipeTutorial';
import ProfileCard from '@/components/swipe/ProfileCard';
import SwipeTips from '@/components/swipe/SwipeTips';
import FilterSummary from '@/components/swipe/FilterSummary';
import SwipeFeedback from '@/components/swipe/SwipeFeedback';
import SwipeTutorial from '@/components/swipe/SwipeTutorial';
import MatchNotificationManager from '@/components/matches/MatchNotificationManager';
import { toast } from '@/hooks/use-toast';

const SwipeInterface: React.FC = () => {
  const navigate = useNavigate();
  const { matches, loading, error, refetch } = usePotentialMatches();
  const { recordInteraction, loading: swipeLoading } = useSwipeActions();
  const { appliedFilters, isActive: isFilterActive, clearFilter, clearAllFilters } = useFilters();
  const { filteredMatches, filteredCount, totalCount } = useMatchFiltering(matches, appliedFilters);
  const { showTutorial, completeTutorial } = useSwipeTutorial();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [swipeStats, setSwipeStats] = useState({
    likes: 0,
    passes: 0,
    superlikes: 0,
    streak: 0
  });
  const [showStats, setShowStats] = useState(false);
  const [feedbackAction, setFeedbackAction] = useState<'like' | 'pass' | 'superlike' | null>(null);

  const currentProfile = filteredMatches[currentIndex];
  const remainingProfiles = filteredMatches.length - currentIndex;

  const handleSwipeAction = async (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProfile || swipeLoading) return;

    try {
      const result = await recordInteraction(currentProfile.id, action);
      
      // Update swipe stats
      setSwipeStats(prev => ({
        ...prev,
        [action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes']: 
          prev[action === 'pass' ? 'passes' : action === 'superlike' ? 'superlikes' : 'likes'] + 1,
        streak: action === 'like' || action === 'superlike' ? prev.streak + 1 : 0
      }));

      // Show feedback animation
      setFeedbackAction(action);

      // Show appropriate feedback based on action
      if (action === 'like') {
        toast({
          title: "Profile Liked! ❤️",
          description: result.isMatch ? "It's a match! 🎉" : "You'll be notified if they like you back.",
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
      
    } catch (error) {
      console.error('Error handling swipe:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleFeedbackComplete = () => {
    setFeedbackAction(null);
    setCurrentIndex(prev => prev + 1);
  };

  const resetSwipes = async () => {
    setIsRefreshing(true);
    setCurrentIndex(0);
    setSwipeStats({ likes: 0, passes: 0, superlikes: 0, streak: 0 });
    
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
        case 'X':
          handleSwipeAction('pass');
          break;
        case 'ArrowRight':
        case 'z':
        case 'Z':
          handleSwipeAction('like');
          break;
        case 'ArrowUp':
        case 's':
        case 'S':
          handleSwipeAction('superlike');
          break;
        case 'r':
        case 'R':
          resetSwipes();
          break;
        case 'f':
        case 'F':
          navigate('/filter');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentProfile, swipeLoading]);

  if (showTutorial) {
    return <SwipeTutorial onComplete={completeTutorial} />;
  }

  if (loading || isRefreshing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deep-blue mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {isRefreshing ? 'Refreshing profiles...' : 'Finding perfect matches...'}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This may take a moment
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

  if (!currentProfile && filteredMatches.length === 0) {
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
            <div className="text-6xl mb-6">
              {isFilterActive ? '🔍' : '🎯'}
            </div>
            <h2 className="text-2xl font-bold text-deep-blue mb-4">
              {isFilterActive ? 'No matches found' : 'No more profiles to show'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isFilterActive 
                ? `No profiles match your current filters. Try adjusting them to see more people.`
                : 'You\'ve seen all available profiles. Check back later for new members or adjust your filters!'
              }
            </p>
            {isFilterActive && totalCount > 0 && (
              <p className="text-sm text-gray-500 mb-6">
                {totalCount} total profiles available
              </p>
            )}
            <div className="space-y-3">
              <Button className="w-full bg-deep-blue text-white" asChild>
                <Link to="/filter">
                  <Filter className="w-4 h-4 mr-2" />
                  {isFilterActive ? 'Adjust Filters' : 'Set Filters'}
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
                <Filter className="w-3 h-3 mr-1" />
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
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowStats(!showStats)}
              className={showStats ? 'bg-soft-pink' : ''}
            >
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" onClick={resetSwipes} disabled={isRefreshing}>
              <RotateCcw className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="p-4">
              <div className="max-w-md mx-auto">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Session Stats</h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{swipeStats.likes}</div>
                    <div className="text-xs text-gray-500">Likes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{swipeStats.superlikes}</div>
                    <div className="text-xs text-gray-500">Super Likes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-500">{swipeStats.passes}</div>
                    <div className="text-xs text-gray-500">Passes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{swipeStats.streak}</div>
                    <div className="text-xs text-gray-500">Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-2">
        <div className="flex items-center justify-between max-w-md mx-auto text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {remainingProfiles} left
            </span>
            {isFilterActive && (
              <span className="text-blue-600 flex items-center">
                <Filter className="w-3 h-3 mr-1" />
                {filteredCount}/{totalCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-green-600">❤️ {swipeStats.likes}</span>
            <span className="text-blue-600">⭐ {swipeStats.superlikes}</span>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Swipe Tips */}
        <div className="mb-4">
          <SwipeTips />
        </div>

        {/* Filter Summary */}
        {isFilterActive && (
          <div className="mb-4">
            <FilterSummary 
              filters={appliedFilters} 
              onClearFilter={clearFilter}
              onClearAll={clearAllFilters}
            />
          </div>
        )}

        {/* Profile Cards */}
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
          {filteredMatches[currentIndex + 1] && (
            <div className="absolute inset-0 -z-10 scale-95 opacity-50 pointer-events-none">
              <ProfileCard
                profile={filteredMatches[currentIndex + 1]}
                onSwipe={() => {}}
                isVisible={true}
                index={1}
              />
            </div>
          )}
        </div>

        {/* Enhanced Instructions */}
        <div className="mt-6 space-y-4">
          {/* Keyboard Shortcuts */}
          <Card className="bg-white shadow-sm border">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">Controls</h3>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
                <div className="text-center">
                  <div className="font-medium">Swipe or Keys</div>
                  <div className="mt-1 space-y-1">
                    <div>← X = Pass</div>
                    <div>↑ S = Super Like</div>
                    <div>→ Z = Like</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Quick Actions</div>
                  <div className="mt-1 space-y-1">
                    <div>R = Refresh</div>
                    <div>F = Filters</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          <div className="text-center">
            <div className="bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
              <div 
                className="bg-gradient-to-r from-soft-pink to-deep-blue h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${filteredMatches.length > 0 ? ((currentIndex) / filteredMatches.length) * 100 : 0}%` 
                }}
              />
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600 font-medium">
                {filteredMatches.length - currentIndex} profiles remaining
              </p>
              {swipeStats.streak > 2 && (
                <p className="text-xs text-purple-600">
                  🔥 {swipeStats.streak} like streak!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Feedback Overlay */}
      <SwipeFeedback action={feedbackAction} onComplete={handleFeedbackComplete} />

      {/* Real-time Match Notifications */}
      <MatchNotificationManager />
    </div>
  );
};

export default SwipeInterface;
