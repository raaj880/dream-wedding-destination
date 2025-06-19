
import React, { useState, useRef } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, X, Star, MapPin, Briefcase, GraduationCap, Church, Users, Info, Ruler, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PotentialMatch } from '@/hooks/usePotentialMatches';
import { Badge } from '../ui/badge';

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
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -50, 0, 50, 200], [0, 1, 1, 1, 0]);

  const handlePanEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const yThreshold = -150;
    
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

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, y, rotate, opacity, zIndex: 10 - index }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onPanEnd={handlePanEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
      onTap={() => setShowDetails(false)}
    >
      <Card className="w-full h-full overflow-hidden shadow-2xl relative bg-card rounded-2xl">
        <div className="relative h-full w-full">
          {/* Main Photo */}
          {profile.photos && profile.photos.length > 0 ? (
            <img
              src={profile.photos[currentPhotoIndex]}
              alt={`${profile.full_name} - Photo ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
             <div className="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="text-4xl bg-background/50 text-foreground">
                    {profile.full_name?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
              </div>
          )}

          {/* Photo Navigation */}
          {profile.photos.length > 1 && (
             <>
                <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1 px-4 z-10">
                    {profile.photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); selectPhoto(idx); }}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentPhotoIndex ? 'bg-white w-6' : 'bg-white/50 w-3'
                        }`}
                      />
                    ))}
                  </div>
                <div onClick={prevPhoto} className="absolute left-0 top-0 h-full w-1/2 z-0" />
                <div onClick={nextPhoto} className="absolute right-0 top-0 h-full w-1/2 z-0" />
             </>
          )}

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
            <motion.div layout>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold text-white">
                  {profile.full_name}, {getAge()}
                </h2>
                {profile.verified && (
                  <Shield className="w-6 h-6 text-primary fill-current" />
                )}
              </div>
              <div className="flex items-center text-white/80 mt-1">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-base">{profile.location}</span>
              </div>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 space-y-2"
                  >
                     {/* Quick Info Grid */}
                     <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/90">
                       {profile.profession && (
                         <div className="flex items-center">
                           <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                           <span className="truncate">{profile.profession}</span>
                         </div>
                       )}
                       {profile.religion && (
                         <div className="flex items-center">
                           <Church className="w-4 h-4 mr-2 flex-shrink-0" />
                           <span className="truncate">{profile.religion}</span>
                         </div>
                       )}
                       {profile.education && (
                         <div className="flex items-center">
                           <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
                           <span className="truncate">{profile.education}</span>
                         </div>
                       )}
                       {profile.height && (
                         <div className="flex items-center">
                           <Ruler className="w-4 h-4 mr-2 flex-shrink-0" />
                           <span className="truncate">{profile.height}</span>
                         </div>
                       )}
                       {profile.community && (
                         <div className="flex items-center">
                           <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                           <span className="truncate">{profile.community}</span>
                         </div>
                       )}
                     </div>

                     {profile.bio && (
                       <p className="text-sm text-white/80 line-clamp-3 leading-relaxed pt-2">
                         {profile.bio}
                       </p>
                     )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); setShowDetails(s => !s); }}
              className="absolute bottom-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full z-10 pointer-events-auto"
          >
              <motion.div animate={{ rotate: showDetails ? 45 : 0 }}>
                  <Info className="w-5 h-5" />
              </motion.div>
          </Button>

          {/* Swipe Indicators */}
            <motion.div
              className="absolute inset-0 border-4 border-secondary rounded-2xl bg-secondary/20 flex items-center justify-center pointer-events-none"
              style={{ opacity: useTransform(x, [50, 200], [0, 1]) }}
            >
              <Heart className="w-20 h-20 text-secondary" fill="currentColor" />
            </motion.div>
            <motion.div
              className="absolute inset-0 border-4 border-destructive rounded-2xl bg-destructive/20 flex items-center justify-center pointer-events-none"
              style={{ opacity: useTransform(x, [-200, -50], [1, 0]) }}
            >
              <X className="w-20 h-20 text-destructive" />
            </motion.div>
            <motion.div
              className="absolute inset-0 border-4 border-primary rounded-2xl bg-primary/20 flex items-center justify-center pointer-events-none"
              style={{ opacity: useTransform(y, [-150, -50], [1, 0]) }}
            >
              <Star className="w-20 h-20 text-primary" fill="currentColor" />
            </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
