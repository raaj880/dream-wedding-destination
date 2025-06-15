import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, X, Star, MapPin, Briefcase, GraduationCap, Calendar, Languages, Church, Users, Shield, Clock, Ruler, MessageCircle, Camera, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PotentialMatch } from '@/hooks/usePotentialMatches';

interface EnhancedProfileCardProps {
  profile: PotentialMatch;
  onSwipe: (action: 'like' | 'pass' | 'superlike') => void;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({ profile, onSwipe }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const getAge = () => profile.age || 'N/A';

  const formatTimeframe = (timeframe: string) => {
    const timeframes: { [key: string]: string } = {
      '6months': 'Within 6 months',
      '1year': 'Within 1 year',
      'no-timeline': 'No timeline yet'
    };
    return timeframes[timeframe] || timeframe;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto mb-6"
    >
      <Card className="overflow-hidden bg-black shadow-xl border border-card-gold/30 rounded-2xl">
        {/* Photo Section */}
        <div className="relative h-96">
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
              <Badge className="bg-card-gold text-black flex items-center font-medium">
                <Shield className="w-3 h-3 mr-1" />
                Verified
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
        <CardContent className="p-6 bg-black">
          {!showDetails ? (
            <div className="space-y-4">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {profile.profession && (
                  <div className="flex items-center text-gray-300">
                    <Briefcase className="w-4 h-4 mr-2 text-card-gold" />
                    <span className="truncate">{profile.profession}</span>
                  </div>
                )}
                {profile.religion && (
                  <div className="flex items-center text-gray-300">
                    <Church className="w-4 h-4 mr-2 text-card-gold" />
                    <span className="truncate">{profile.religion}</span>
                  </div>
                )}
                {profile.community && (
                  <div className="flex items-center text-gray-300">
                    <Users className="w-4 h-4 mr-2 text-card-gold" />
                    <span className="truncate">{profile.community}</span>
                  </div>
                )}
                {profile.marry_timeframe && (
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-card-gold" />
                    <span className="truncate">Wants to marry: {formatTimeframe(profile.marry_timeframe)}</span>
                  </div>
                )}
              </div>

              {/* See More Button */}
              <Button
                variant="ghost"
                onClick={() => setShowDetails(true)}
                className="w-full text-card-gold hover:bg-card-gold/20 border border-card-gold/30 hover:border-card-gold/50 mt-4"
              >
                See More Details
              </Button>
            </div>
          ) : (
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between sticky top-0 bg-black pb-2">
                <h3 className="text-lg font-semibold text-card-gold">Complete Profile</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:bg-gray-800 hover:text-card-gold"
                >
                  ✕
                </Button>
              </div>

              {/* Detailed Sections */}
              <div className="space-y-4 text-sm">
                {/* About Section */}
                {profile.bio && (
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-card-gold/20">
                    <h4 className="font-medium text-card-gold mb-2 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      About Me
                    </h4>
                    <p className="text-gray-200 leading-relaxed">{profile.bio}</p>
                  </div>
                )}

                {/* Professional Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-card-gold border-b border-card-gold/30 pb-1">Professional</h4>
                  {profile.profession && (
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-3 text-card-gold" />
                      <span className="text-gray-200">{profile.profession}</span>
                    </div>
                  )}
                  {profile.education && (
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-3 text-card-gold" />
                      <span className="text-gray-200">{profile.education}</span>
                    </div>
                  )}
                </div>

                {/* Personal Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-card-gold border-b border-card-gold/30 pb-1">Personal</h4>
                  {profile.religion && (
                    <div className="flex items-center">
                      <Church className="w-4 h-4 mr-3 text-card-gold" />
                      <span className="text-gray-200">{profile.religion}</span>
                    </div>
                  )}
                  {profile.community && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-3 text-card-gold" />
                      <span className="text-gray-200">{profile.community}</span>
                    </div>
                  )}
                  {profile.height && (
                    <div className="flex items-center">
                      <Ruler className="w-4 h-4 mr-3 text-card-gold" />
                      <span className="text-gray-200">{profile.height}</span>
                    </div>
                  )}
                  {profile.marry_timeframe && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-3 text-card-gold" />
                      <span className="text-gray-200">Looking to marry: {formatTimeframe(profile.marry_timeframe)}</span>
                    </div>
                  )}
                </div>

                {/* Languages */}
                {profile.languages && profile.languages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-card-gold mb-2 flex items-center border-b border-card-gold/30 pb-1">
                      <Languages className="w-4 h-4 mr-2" />
                      Languages Spoken
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((language) => (
                        <Badge key={language} variant="secondary" className="bg-card-gold/20 text-card-gold border border-card-gold/30">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-card-gold/30">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSwipe('pass')}
              className="w-16 h-16 rounded-full border-2 border-red-500/70 hover:border-red-400 hover:bg-red-500/10 transition-all duration-200 shadow-md hover:shadow-lg bg-black"
            >
              <X className="w-7 h-7 text-red-500" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSwipe('superlike')}
              className="w-16 h-16 rounded-full border-2 border-blue-500/70 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-200 shadow-md hover:shadow-lg bg-black"
            >
              <Star className="w-7 h-7 text-blue-500" fill="currentColor" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSwipe('like')}
              className="w-16 h-16 rounded-full border-2 border-green-500/70 hover:border-green-400 hover:bg-green-500/10 transition-all duration-200 shadow-md hover:shadow-lg bg-black"
            >
              <Heart className="w-7 h-7 text-green-500" fill="currentColor" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedProfileCard;
