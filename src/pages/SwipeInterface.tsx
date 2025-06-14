
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Heart, X, Star, ArrowLeft, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  profession: string;
  image: string;
  religion: string;
  verified: boolean;
  languages: string[];
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'Ananya',
    age: 27,
    location: 'Mumbai, India',
    profession: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
    religion: 'Hindu',
    verified: true,
    languages: ['English', 'Hindi', 'Marathi']
  },
  {
    id: 2,
    name: 'Kavya',
    age: 26,
    location: 'Bangalore, India',
    profession: 'Doctor',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
    religion: 'Hindu',
    verified: false,
    languages: ['English', 'Kannada', 'Tamil']
  },
  {
    id: 3,
    name: 'Priya',
    age: 28,
    location: 'Hyderabad, India',
    profession: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=600&fit=crop&crop=face',
    religion: 'Hindu',
    verified: true,
    languages: ['English', 'Telugu', 'Hindi']
  },
  {
    id: 4,
    name: 'Meera',
    age: 25,
    location: 'Delhi, India',
    profession: 'Teacher',
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=600&fit=crop&crop=face',
    religion: 'Hindu',
    verified: true,
    languages: ['English', 'Hindi', 'Punjabi']
  }
];

const SwipeInterface: React.FC = () => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | 'up'>('right');
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right' | 'up', profile: Profile) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setExitDirection(direction);
    
    let message = '';
    let emoji = '';
    
    switch (direction) {
      case 'left':
        message = `Passed on ${profile.name}`;
        emoji = '👋';
        break;
      case 'right':
        message = `You liked ${profile.name}! ❤️`;
        emoji = '💕';
        break;
      case 'up':
        message = `Super liked ${profile.name}! ⭐`;
        emoji = '🌟';
        break;
    }
    
    toast({
      title: message,
      description: direction === 'right' ? "It's a match if they like you back!" : undefined,
    });
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleDragEnd = (event: any, info: PanInfo, profile: Profile) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset;
    
    if (Math.abs(offset.x) > threshold || Math.abs(velocity) > 500) {
      if (offset.x > 0) {
        handleSwipe('right', profile);
      } else {
        handleSwipe('left', profile);
      }
    } else if (offset.y < -threshold || info.velocity.y < -500) {
      handleSwipe('up', profile);
    }
  };

  const getExitAnimation = () => {
    switch (exitDirection) {
      case 'left':
        return { x: -300, opacity: 0, scale: 0.8 };
      case 'right':
        return { x: 300, opacity: 0, scale: 0.8 };
      case 'up':
        return { y: -300, opacity: 0, scale: 0.8 };
      default:
        return { x: 300, opacity: 0, scale: 0.8 };
    }
  };

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];
  const hasMoreProfiles = currentIndex < profiles.length;

  if (!hasMoreProfiles) {
    return (
      <div className="h-screen bg-gradient-to-br from-soft-pink/20 via-white to-deep-blue/10 flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-6">
          <div className="text-6xl">🥲</div>
          <h2 className="text-2xl font-bold text-deep-blue">No more profiles for now</h2>
          <p className="text-gray-600 max-w-sm">
            Come back later or change your filters to discover more amazing people!
          </p>
          <div className="space-y-3">
            <Button className="bg-deep-blue text-white hover:bg-deep-blue/90 px-8 py-3 rounded-full">
              <Filter className="w-4 h-4 mr-2" />
              Update Filters
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/matches">View My Matches</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-soft-pink/20 via-white to-deep-blue/10 flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 z-20 bg-white/80 backdrop-blur-md">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="w-6 h-6 text-deep-blue" />
          </Link>
        </Button>
        
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-soft-pink fill-soft-pink" />
          <span className="text-2xl font-bold text-deep-blue">Wedder</span>
        </Link>
        
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Filter className="w-6 h-6 text-deep-blue" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <Settings className="w-6 h-6 text-deep-blue" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex-1 relative px-4 pb-32">
        <div className="relative h-full max-w-sm mx-auto">
          <AnimatePresence>
            {/* Next card (background) */}
            {nextProfile && (
              <motion.div
                key={`next-${nextProfile.id}`}
                className="absolute inset-0 top-8"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 0.95, opacity: 0.8 }}
              >
                <div className="w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img
                    src={nextProfile.image}
                    alt={nextProfile.name}
                    className="w-full h-2/3 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-deep-blue">
                      {nextProfile.name}, {nextProfile.age}
                    </h3>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Current card */}
            {currentProfile && (
              <motion.div
                key={currentProfile.id}
                className="absolute inset-0"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={(event, info) => handleDragEnd(event, info, currentProfile)}
                dragElastic={0.2}
                whileDrag={{ scale: 1.05, rotate: 0 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{
                  ...getExitAnimation(),
                  transition: { duration: 0.3 }
                }}
                style={{ zIndex: 10 }}
              >
                <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing">
                  {/* Profile Image */}
                  <div className="relative h-2/3">
                    <img
                      src={currentProfile.image}
                      alt={currentProfile.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Swipe Indicators */}
                    <motion.div 
                      className="absolute top-4 left-4 bg-red-500 text-white p-3 rounded-full opacity-0"
                      animate={{ opacity: 0 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                    
                    <motion.div 
                      className="absolute top-4 right-4 bg-green-500 text-white p-3 rounded-full opacity-0"
                      animate={{ opacity: 0 }}
                    >
                      <Heart className="w-6 h-6" />
                    </motion.div>
                    
                    <motion.div 
                      className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full opacity-0"
                      animate={{ opacity: 0 }}
                    >
                      <Star className="w-6 h-6" />
                    </motion.div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-2xl font-bold text-deep-blue">
                          {currentProfile.name}, {currentProfile.age}
                        </h3>
                        {currentProfile.verified && (
                          <Badge className="bg-blue-500 text-white text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-1">{currentProfile.location}</p>
                      <p className="text-gray-600 mb-3">{currentProfile.profession}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {currentProfile.religion}
                        </Badge>
                        {currentProfile.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <div className="flex justify-center items-center space-x-6 max-w-sm mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => currentProfile && handleSwipe('left', currentProfile)}
            className="w-14 h-14 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-lg hover:border-red-400 transition-colors"
            disabled={isAnimating}
          >
            <X className="w-6 h-6 text-gray-600" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => currentProfile && handleSwipe('up', currentProfile)}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            disabled={isAnimating}
          >
            <Star className="w-7 h-7 text-white" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => currentProfile && handleSwipe('right', currentProfile)}
            className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:from-pink-600 hover:to-red-600 transition-all"
            disabled={isAnimating}
          >
            <Heart className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SwipeInterface;
