import React, { useState, useRef } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, Star, MapPin, Briefcase, GraduationCap, Calendar, Languages, Church, Users, Info, Camera, Shield, Clock, Ruler, MessageCircle } from 'lucide-react';
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
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -50, 0, 50, 200], [0, 1, 1, 1, 0]);

  const handlePan = (event: any, info: PanInfo) => {
    x.set(info.offset.x);
    y.set(info.offset.y);
    setIsDragging(true);
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const yThreshold = -150;
    
    setIsDragging(false);
    
    // Super like (swipe up)
    if (info.offset.y < yThreshold || info.velocity.y < -500) {
      onSwipe('superlike');
      return;
    }
    
    // Like or pass (swipe left/right)
    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0) {
        onSwipe('like');
      } else {
        onSwipe('pass');
      }
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleAction = (action: 'like' | 'pass' | 'superlike') => {
    onSwipe(action);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (profile.photos && profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % profile.photos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (profile.photos && profile.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev - 1 + profile.photos.length) % profile.photos.length);
    }
  };

  const selectPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  const getAge = () => {
    return profile.age || 'N/A';
  };

  const formatTimeframe = (timeframe: string) => {
    const timeframes: { [key: string]: string } = {
      '6months': 'Within 6 months',
      '1year': 'Within 1 year',
      'no-timeline': 'No timeline yet'
    };
    return timeframes[timeframe] || timeframe;
  };

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity, zIndex: 10 - index }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full h-full overflow-hidden premium-card shadow-2xl relative">
        {/* Photo Section */}
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
                
                {/* Photo Dots Navigation */}
                {profile.photos.length > 1 && (
                  <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1 px-4">
                    {profile.photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectPhoto(idx)}
                        className={`h-1 rounded-full transition-all ${
                          idx === currentPhotoIndex ? 'bg-white w-8' : 'bg-white/50 w-4'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                {/* Invisible tap areas for photo navigation */}
                {profile.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-0 top-0 w-1/3 h-full opacity-0 z-10"
                      aria-label="Previous photo"
                    />
                    <button
                      onClick={nextPhoto}
                      className="absolute right-0 top-0 w-1/3 h-full opacity-0 z-10"
                      aria-label="Next photo"
                    />
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

            {/* Status Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {profile.verified && (
                <Badge className="bg-blue-500 text-white flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            {/* Swipe Direction Indicators */}
            <motion.div
              className="absolute inset-0 border-4 border-green-500 rounded-lg bg-green-500/20 flex items-center justify-center pointer-events-none"
              style={{
                opacity: useTransform(x, [50, 200], [0, 1])
              }}
            >
              <div className="text-center">
                <Heart className="w-20 h-20 text-green-500 mx-auto mb-2" fill="currentColor" />
                <span className="text-green-500 font-bold text-xl">LIKE</span>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute inset-0 border-4 border-red-500 rounded-lg bg-red-500/20 flex items-center justify-center pointer-events-none"
              style={{
                opacity: useTransform(x, [-200, -50], [1, 0])
              }}
            >
              <div className="text-center">
                <X className="w-20 h-20 text-red-500 mx-auto mb-2" />
                <span className="text-red-500 font-bold text-xl">PASS</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 border-4 border-blue-500 rounded-lg bg-blue-500/20 flex items-center justify-center pointer-events-none"
              style={{
                opacity: useTransform(y, [-150, -50], [1, 0])
              }}
            >
              <div className="text-center">
                <Star className="w-20 h-20 text-blue-500 mx-auto mb-2" fill="currentColor" />
                <span className="text-blue-500 font-bold text-xl">SUPER LIKE</span>
              </div>
            </motion.div>

            {/* Drag instruction overlay */}
            {isDragging && (
              <div className="absolute bottom-20 left-0 right-0 text-center">
                <div className="bg-black/70 text-white px-4 py-2 rounded-full inline-block text-sm">
                  Swipe up for Super Like
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Profile Information */}
        <CardContent className="p-4 bg-card-gold">
          {!showDetails ? (
            <div className="space-y-3">
              {/* Basic Info */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-black">
                    {profile.full_name}, {profile.age || 'N/A'}
                  </h2>
                  <div className="flex items-center text-black/70 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                  className="text-black hover:bg-black/10"
                >
                  <Info className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                {profile.profession && (
                  <div className="flex items-center text-black/70">
                    <Briefcase className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{profile.profession}</span>
                  </div>
                )}
                {profile.religion && (
                  <div className="flex items-center text-black/70">
                    <Church className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{profile.religion}</span>
                  </div>
                )}
                {profile.education && (
                  <div className="flex items-center text-black/70">
                    <GraduationCap className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{profile.education}</span>
                  </div>
                )}
                {profile.height && (
                  <div className="flex items-center text-black/70">
                    <Ruler className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{profile.height}</span>
                  </div>
                )}
              </div>

              {/* Bio Preview */}
              {profile.bio && (
                <p className="text-sm text-black/80 line-clamp-2 leading-relaxed">
                  {profile.bio}
                </p>
              )}

              {/* Languages Tags */}
              {profile.languages && profile.languages.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {profile.languages.slice(0, 3).map((language) => (
                    <Badge key={language} variant="secondary" className="text-xs bg-black text-card-gold">
                      {language}
                    </Badge>
                  ))}
                  {profile.languages.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-black text-card-gold">
                      +{profile.languages.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between sticky top-0 bg-card-gold pb-2">
                <h3 className="text-lg font-semibold text-black">Profile Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                  className="text-black/70 hover:bg-black/10"
                >
                  ✕
                </Button>
              </div>

              {/* Detailed Info */}
              <div className="space-y-4 text-sm">
                {/* About Section */}
                {profile.bio && (
                  <div>
                    <h4 className="font-medium text-black mb-2 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      About
                    </h4>
                    <p className="text-black/80 leading-relaxed">{profile.bio}</p>
                  </div>
                )}

                {/* Professional Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-black">Professional</h4>
                  {profile.profession && (
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-black/60" />
                      <span>{profile.profession}</span>
                    </div>
                  )}
                  {profile.education && (
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-black/60" />
                      <span>{profile.education}</span>
                    </div>
                  )}
                </div>

                {/* Personal Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-black">Personal</h4>
                  {profile.religion && (
                    <div className="flex items-center">
                      <Church className="w-4 h-4 mr-2 text-black/60" />
                      <span>{profile.religion}</span>
                    </div>
                  )}
                  {profile.community && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-black/60" />
                      <span>{profile.community}</span>
                    </div>
                  )}
                  {profile.height && (
                    <div className="flex items-center">
                      <Ruler className="w-4 h-4 mr-2 text-black/60" />
                      <span>{profile.height}</span>
                    </div>
                  )}
                  {profile.marry_timeframe && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-black/60" />
                      <span>Looking to marry: {formatTimeframe(profile.marry_timeframe)}</span>
                    </div>
                  )}
                </div>

                {/* Languages */}
                {profile.languages && profile.languages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-black mb-2 flex items-center">
                      <Languages className="w-4 h-4 mr-2" />
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((language) => (
                        <Badge key={language} variant="secondary" className="bg-black text-card-gold">
                          {language}
                        </Badge>
                      ))}
                    </div>
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
              className="w-14 h-14 rounded-full border-2 border-red-500 hover:border-red-400 hover:bg-red-50 transition-all duration-200 bg-black"
            >
              <X className="w-6 h-6 text-red-500" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleAction('superlike')}
              className="w-14 h-14 rounded-full border-2 border-blue-500 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-black"
            >
              <Star className="w-6 h-6 text-blue-500" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleAction('like')}
              className="w-14 h-14 rounded-full border-2 border-green-500 hover:border-green-400 hover:bg-green-50 transition-all duration-200 bg-black"
            >
              <Heart className="w-6 h-6 text-green-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
