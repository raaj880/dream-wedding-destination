
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X, Heart, Star, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SwipeTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [showTips, setShowTips] = useState(true);

  const tips = [
    {
      icon: Heart,
      title: "Quality over Quantity",
      message: "Take time to read profiles before swiping. Meaningful connections start with genuine interest!",
      color: "text-red-500"
    },
    {
      icon: Star,
      title: "Use Super Likes Wisely",
      message: "Super likes show extra interest. Save them for profiles that really catch your attention!",
      color: "text-blue-500"
    },
    {
      icon: Zap,
      title: "Complete Your Profile",
      message: "A complete profile with great photos gets 3x more matches. Update yours anytime!",
      color: "text-yellow-500"
    },
    {
      icon: Lightbulb,
      title: "Stay Active",
      message: "Regular activity keeps you visible. Even 10 minutes a day can make a difference!",
      color: "text-green-500"
    }
  ];

  useEffect(() => {
    if (!showTips) return;
    
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [showTips, tips.length]);

  if (!showTips) return null;

  const tip = tips[currentTip];
  const IconComponent = tip.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTip}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-soft-pink/20 to-deep-blue/20 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className={`${tip.color} mt-1`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-deep-blue mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.message}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTips(false)}
                className="text-gray-400 hover:text-gray-600 -mt-1 -mr-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Progress dots */}
            <div className="flex justify-center space-x-2 mt-3">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTip ? 'bg-deep-blue' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default SwipeTips;
