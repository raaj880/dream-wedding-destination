
import React, { useState, useRef } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, Star, MapPin, Briefcase, GraduationCap, Calendar, Languages, Church, Users, Info, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PotentialMatch } from '@/hooks/usePotentialMatches';

interface ProfileCardProps {
  profile: PotentialMatch;
  onSwipe: (action: 'like' | 'pass' | 'superlike') => void;
  isVisible: boolean;
  index: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSwipe, isVisible, index }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -50, 0, 50, 200], [0, 1, 1, 1, 0]);

  const handlePan = (event: any, info: PanInfo) => {
    x.set(info.offset.x);
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    
    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0) {
        onSwipe('like');
      } else {
        onSwipe('pass');
      }
    } else {
      x.set(0);
    }
  };

  const handleAction = (action: 'like' | 'pass' | 'superlike') => {
    onSwipe(action);
  };

  const nextPhoto = () => {
    if (profile.photos && profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % profile.photos.length);
    }
  };

  const prevPhoto = () => {
    if (profile.photos && profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev - 1 + profile.photos.length) % profile.photos.length);
    }
  };

  const getAge = () => {
    return profile.age || 'N/A';
  };

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity, zIndex: 10 - index }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full h-full overflow-hidden bg-white shadow-2xl">
        <div className="relative h-full flex flex-col">
          {/* Photo Section */}
          <div className="relative flex-1 min-h-[400px]">
            {profile.photos && profile.photos.length > 0 ? (
              <>
                <img
                  src={profile.photos[currentPhotoIndex]}
                  alt={`${profile.full_name} - Photo ${currentPhotoIndex + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                
                {/* Photo Navigation */}
                {profile.photos.length > 1 && (
                  <>
                    <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1">
                      {profile.photos.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all ${
                            idx === currentPhotoIndex ? 'bg-white w-8' : 'bg-white/50 w-4'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={prevPhoto}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                    >
                      ›
                    </button>
                  </>
                )}
                
                {/* Photo Counter */}
                {profile.photos.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Camera className="w-3 h-3 mr-1" />
                    {currentPhotoIndex + 1}/{profile.photos.length}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-soft-pink to-deep-blue flex items-center justify-center">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="text-4xl bg-white text-deep-blue">
                    {profile.full_name?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            {/* Verified Badge */}
            {profile.verified && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-500 text-white">
                  ✓ Verified
                </Badge>
              </div>
            )}

            {/* Swipe Indicators */}
            <motion.div
              className="absolute inset-0 border-4 border-green-500 rounded-lg bg-green-500/20 flex items-center justify-center"
              style={{
                opacity: useTransform(x, [50, 200], [0, 1])
              }}
            >
              <Heart className="w-20 h-20 text-green-500" fill="currentColor" />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 border-4 border-red-500 rounded-lg bg-red-500/20 flex items-center justify-center"
              style={{
                opacity: useTransform(x, [-200, -50], [1, 0])
              }}
            >
              <X className="w-20 h-20 text-red-500" />
            </motion.div>
          </div>

          {/* Profile Information */}
          <CardContent className="p-4 bg-white">
            {!showDetails ? (
              <div className="space-y-3">
                {/* Basic Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-deep-blue">
                      {profile.full_name}, {getAge()}
                    </h2>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(true)}
                    className="text-deep-blue"
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {profile.profession && (
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-3 h-3 mr-1" />
                      <span className="truncate">{profile.profession}</span>
                    </div>
                  )}
                  {profile.religion && (
                    <div className="flex items-center text-gray-600">
                      <Church className="w-3 h-3 mr-1" />
                      <span className="truncate">{profile.religion}</span>
                    </div>
                  )}
                </div>

                {/* Bio Preview */}
                {profile.bio && (
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {profile.bio}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-deep-blue">Profile Details</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(false)}
                    className="text-gray-500"
                  >
                    ✕
                  </Button>
                </div>

                {/* Detailed Info */}
                <div className="space-y-3 text-sm">
                  {profile.profession && (
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{profile.profession}</span>
                    </div>
                  )}
                  
                  {profile.religion && (
                    <div className="flex items-center">
                      <Church className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{profile.religion}</span>
                    </div>
                  )}

                  {profile.bio && (
                    <div>
                      <h4 className="font-medium text-deep-blue mb-1">About</h4>
                      <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAction('pass')}
                className="w-14 h-14 rounded-full border-2 border-gray-300 hover:border-red-500 hover:bg-red-50"
              >
                <X className="w-6 h-6 text-gray-600 hover:text-red-500" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAction('superlike')}
                className="w-14 h-14 rounded-full border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50"
              >
                <Star className="w-6 h-6 text-blue-500" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAction('like')}
                className="w-14 h-14 rounded-full border-2 border-green-300 hover:border-green-500 hover:bg-green-50"
              >
                <Heart className="w-6 h-6 text-green-500" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
