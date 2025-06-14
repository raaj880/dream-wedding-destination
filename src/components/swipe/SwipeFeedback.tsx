
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Star, Sparkles } from 'lucide-react';

interface SwipeFeedbackProps {
  action: 'like' | 'pass' | 'superlike' | null;
  onComplete: () => void;
}

const SwipeFeedback: React.FC<SwipeFeedbackProps> = ({ action, onComplete }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (action) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onComplete, 200);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [action, onComplete]);

  const getFeedbackConfig = () => {
    switch (action) {
      case 'like':
        return {
          icon: Heart,
          color: 'text-green-500',
          bg: 'bg-green-500/20',
          border: 'border-green-500',
          text: 'LIKED!',
          particles: '💚'
        };
      case 'pass':
        return {
          icon: X,
          color: 'text-red-500',
          bg: 'bg-red-500/20',
          border: 'border-red-500',
          text: 'PASSED',
          particles: '💔'
        };
      case 'superlike':
        return {
          icon: Star,
          color: 'text-blue-500',
          bg: 'bg-blue-500/20',
          border: 'border-blue-500',
          text: 'SUPER LIKE!',
          particles: '⭐'
        };
      default:
        return null;
    }
  };

  const config = getFeedbackConfig();
  if (!config || !show) return null;

  const { icon: Icon, color, bg, border, text, particles } = config;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 0.3 
            }}
            className={`${bg} ${border} border-4 rounded-3xl p-8 flex flex-col items-center space-y-4`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Icon className={`w-16 h-16 ${color}`} fill="currentColor" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-2xl font-bold ${color}`}
            >
              {text}
            </motion.h2>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0 
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.3 + i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute text-2xl"
              >
                {particles}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SwipeFeedback;
