
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Heart, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/match';

interface ProfileCardProps {
  profile: UserProfile;
  onSwipe: (action: 'like' | 'pass' | 'superlike') => void;
  isVisible: boolean;
  index: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSwipe, isVisible, index }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Photo */}
      <div className="relative h-2/3">
        <img 
          src={profile.photos[0]} 
          alt={profile.fullName}
          className="w-full h-full object-cover"
        />
        {profile.verified && (
          <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
            ✓ Verified
          </Badge>
        )}
        {profile.isOnline && (
          <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full"></div>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-6 h-1/3 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-deep-blue mb-2">
            {profile.fullName}, {profile.age}
          </h2>
          
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{profile.profession}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span>{profile.religion}</span>
            </div>
          </div>

          {profile.bio && (
            <p className="text-sm text-gray-700 mt-3 line-clamp-2">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-red-500 hover:bg-red-50"
            onClick={() => onSwipe('pass')}
          >
            <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50"
            onClick={() => onSwipe('superlike')}
          >
            <Star className="w-6 h-6 text-blue-500" />
          </Button>
          
          <Button
            size="lg"
            className="w-16 h-16 rounded-full bg-soft-pink hover:bg-soft-pink/80"
            onClick={() => onSwipe('like')}
          >
            <Heart className="w-6 h-6 text-deep-blue" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
