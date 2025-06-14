
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, X } from 'lucide-react';
import { RealTimeMatch } from '@/hooks/useRealTimeMatches';

interface MatchNotificationProps {
  match: RealTimeMatch;
  onClose: () => void;
  onMessage: () => void;
}

const MatchNotification: React.FC<MatchNotificationProps> = ({ 
  match, 
  onClose, 
  onMessage 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center max-w-sm w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-soft-pink/20 to-deep-blue/10" />
        
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Hearts animation */}
        <div className="relative mb-6">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="text-6xl mb-4"
          >
            💕
          </motion.div>
          
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute -top-2 -right-2"
          >
            <Heart className="w-6 h-6 text-soft-pink fill-current" />
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-deep-blue mb-2">It's a Match!</h2>
        
        <div className="flex justify-center mb-4">
          <Avatar className="w-20 h-20 border-4 border-soft-pink">
            <AvatarImage src={match.matchedUserPhoto} alt={match.matchedUserName} />
            <AvatarFallback className="text-xl bg-soft-pink text-deep-blue">
              {match.matchedUserName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <p className="text-gray-600 mb-6">
          You and <span className="font-semibold text-deep-blue">{match.matchedUserName}</span> liked each other!
        </p>

        <div className="space-y-3">
          <Button 
            className="w-full bg-deep-blue text-white hover:bg-deep-blue/90"
            onClick={onMessage}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onClose}
          >
            Keep Swiping
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MatchNotification;
