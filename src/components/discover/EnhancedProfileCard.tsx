
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
      <Card className="overflow-hidden bg-white shadow-xl border-0 rounded-2xl">
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
                        idx === currentPhotoIndex ? 'bg-white w-8' : 'bg-white/50 w-4'
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

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent h-24" />
          
          {/* Basic Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold mb-1">
              {profile.full_name}, {getAge()}
            </h2>
            <div className="flex items-center text-white/90">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <CardContent className="p-6">
          {!showDetails ? (
            <div className="space-y-4">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {profile.profession && (
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2 text-deep-blue" />
                    <span className="truncate">{profile.profession}</span>
                  </div>
                )}
                {profile.religion && (
                  <div className="flex items-center text-gray-600">
                    <Church className="w-4 h-4 mr-2 text-deep-blue" />
                    <span className="truncate">{profile.religion}</span>
                  </div>
                )}
                {profile.education && (
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2 text-deep-blue" />
                    <span className="truncate">{profile.education}</span>
                  </div>
                )}
                {profile.height && (
                  <div className="flex items-center text-gray-600">
                    <Ruler className="w-4 h-4 mr-2 text-deep-blue" />
                    <span className="truncate">{profile.height}</span>
                  </div>
                )}
              </div>

              {/* Bio Preview */}
              {profile.bio && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              )}

              {/* Languages & Community Tags */}
              <div className="space-y-2">
                {profile.languages && profile.languages.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Languages className="w-4 h-4 mr-2 text-deep-blue" />
                      <span className="text-sm font-medium text-gray-700">Languages</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {profile.languages.slice(0, 4).map((language) => (
                        <Badge key={language} variant="secondary" className="text-xs bg-soft-pink/20 text-deep-blue">
                          {language}
                        </Badge>
                      ))}
                      {profile.languages.length > 4 && (
                        <Badge variant="secondary" className="text-xs bg-soft-pink/20 text-deep-blue">
                          +{profile.languages.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {profile.community && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-deep-blue" />
                    <span className="text-sm text-gray-600">{profile.community}</span>
                  </div>
                )}

                {profile.marry_timeframe && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-deep-blue" />
                    <span className="text-sm text-gray-600">
                      Looking to marry: {formatTimeframe(profile.marry_timeframe)}
                    </span>
                  </div>
                )}
              </div>

              {/* See More Button */}
              <Button
                variant="ghost"
                onClick={() => setShowDetails(true)}
                className="w-full text-deep-blue hover:bg-soft-pink/20"
              >
                See More Details
              </Button>
            </div>
          ) : (
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between sticky top-0 bg-white pb-2">
                <h3 className="text-lg font-semibold text-deep-blue">Complete Profile</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:bg-gray-100"
                >
                  ✕
                </Button>
              </div>

              {/* Detailed Sections */}
              <div className="space-y-4 text-sm">
                {/* About Section */}
                {profile.bio && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-deep-blue mb-2 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      About Me
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                  </div>
                )}

                {/* Professional Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-deep-blue border-b border-gray-200 pb-1">Professional</h4>
                  {profile.profession && (
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-3 text-gray-500" />
                      <span>{profile.profession}</span>
                    </div>
                  )}
                  {profile.education && (
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-3 text-gray-500" />
                      <span>{profile.education}</span>
                    </div>
                  )}
                </div>

                {/* Personal Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-deep-blue border-b border-gray-200 pb-1">Personal</h4>
                  {profile.religion && (
                    <div className="flex items-center">
                      <Church className="w-4 h-4 mr-3 text-gray-500" />
                      <span>{profile.religion}</span>
                    </div>
                  )}
                  {profile.community && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-3 text-gray-500" />
                      <span>{profile.community}</span>
                    </div>
                  )}
                  {profile.height && (
                    <div className="flex items-center">
                      <Ruler className="w-4 h-4 mr-3 text-gray-500" />
                      <span>{profile.height}</span>
                    </div>
                  )}
                  {profile.marry_timeframe && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-3 text-gray-500" />
                      <span>Looking to marry: {formatTimeframe(profile.marry_timeframe)}</span>
                    </div>
                  )}
                </div>

                {/* Languages */}
                {profile.languages && profile.languages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-deep-blue mb-2 flex items-center border-b border-gray-200 pb-1">
                      <Languages className="w-4 h-4 mr-2" />
                      Languages Spoken
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((language) => (
                        <Badge key={language} variant="secondary" className="bg-soft-pink/20 text-deep-blue">
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
          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSwipe('pass')}
              className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <X className="w-7 h-7 text-gray-600 hover:text-red-500" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSwipe('superlike')}
              className="w-16 h-16 rounded-full border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Star className="w-7 h-7 text-blue-500" fill="currentColor" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSwipe('like')}
              className="w-16 h-16 rounded-full border-2 border-green-300 hover:border-green-500 hover:bg-green-50 transition-all duration-200 shadow-md hover:shadow-lg"
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
