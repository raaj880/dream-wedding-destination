
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, X, Star, MapPin, Briefcase, Users, Shield, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PotentialMatch } from '@/hooks/usePotentialMatches';
import MessageButton from '@/components/messaging/MessageButton';

interface EnhancedProfileCardProps {
  profile: PotentialMatch;
  onSwipe: (action: 'like' | 'pass' | 'superlike') => void;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({ profile, onSwipe }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const getAge = () => profile.age || 'N/A';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="overflow-hidden bg-black shadow-xl border border-card-gold/30 rounded-2xl">
        {/* Photo Section */}
        <div className="relative h-80">
          {profile.photos && profile.photos.length > 0 ? (
            <>
              <img
                src={profile.photos[currentPhotoIndex]}
                alt={`${profile.full_name} - Photo ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Photo Navigation Dots */}
              {profile.photos.length > 1 && (
                <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1 px-4">
                  {profile.photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`h-1 rounded-full transition-all ${
                        idx === currentPhotoIndex ? 'bg-card-gold w-8' : 'bg-white/50 w-4'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Photo Navigation Areas */}
              {profile.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-0 top-0 w-1/3 h-full opacity-0"
                  />
                  <button
                    onClick={nextPhoto}
                    className="absolute right-0 top-0 w-1/3 h-full opacity-0"
                  />
                </>
              )}
              
              {/* Photo Counter */}
              {profile.photos.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 text-card-gold text-xs px-2 py-1 rounded-full flex items-center border border-card-gold/30">
                  <Camera className="w-3 h-3 mr-1" />
                  {currentPhotoIndex + 1}/{profile.photos.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-black to-gray-900 flex items-center justify-center border-b border-card-gold/30">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="text-4xl bg-card-gold text-black">
                  {profile.full_name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
            </div>
          )}

          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {profile.verified && (
              <Badge variant="highlight" className="h-7 w-7 p-0 flex items-center justify-center rounded-full border-2 border-black/30">
                <Shield className="w-4 h-4" />
              </Badge>
            )}
          </div>

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-24" />
          
          {/* Basic Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold mb-1 text-card-gold">
              {profile.full_name}, {getAge()}
            </h2>
            <div className="flex items-center text-white/90">
              <MapPin className="w-4 h-4 mr-1 text-card-gold" />
              <span className="text-sm">{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <CardContent className="p-4 bg-black">
          <div className="space-y-3">
            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {profile.profession && (
                <div className="flex items-center text-gray-300">
                  <Briefcase className="w-4 h-4 mr-2 text-card-gold" />
                  <span className="truncate">{profile.profession}</span>
                </div>
              )}
              {profile.community && (
                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-2 text-card-gold" />
                  <span className="truncate">{profile.community}</span>
                </div>
              )}
            </div>

            {/* Message Button for matched users */}
            <div className="mb-2">
              <MessageButton 
                targetUserId={profile.id}
                size="sm"
                variant="outline"
                className="w-full"
              />
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex justify-center space-x-4 mt-4 pt-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSwipe('pass')}
              className="w-14 h-14 rounded-full border-2 border-red-500/70 hover:border-red-400 hover:bg-red-500/10 transition-all duration-200 shadow-md hover:shadow-lg bg-black"
            >
              <X className="w-6 h-6 text-red-500" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSwipe('superlike')}
              className="w-14 h-14 rounded-full border-2 border-blue-500/70 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-200 shadow-md hover:shadow-lg bg-black"
            >
              <Star className="w-6 h-6 text-blue-500" fill="currentColor" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSwipe('like')}
              className="w-14 h-14 rounded-full border-2 border-green-500/70 hover:border-green-400 hover:bg-green-500/10 transition-all duration-200 shadow-md hover:shadow-lg bg-black"
            >
              <Heart className="w-6 h-6 text-green-500" fill="currentColor" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedProfileCard;
