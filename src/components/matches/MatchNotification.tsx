
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
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-card/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 text-center max-w-sm w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pink-gold-gradient opacity-10" />
        
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="w-4 h-4 text-subtle" />
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
            <Heart className="w-6 h-6 text-secondary fill-current" />
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">It's a Match!</h2>
        
        <div className="flex justify-center mb-4">
          <Avatar className="w-20 h-20 border-4 border-secondary">
            <AvatarImage src={match.matchedUserPhoto} alt={match.matchedUserName} />
            <AvatarFallback className="text-xl bg-secondary text-secondary-foreground">
              {match.matchedUserName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <p className="text-subtle mb-6">
          You and <span className="font-semibold text-foreground">{match.matchedUserName}</span> liked each other!
        </p>

        <div className="space-y-3">
          <Button 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
