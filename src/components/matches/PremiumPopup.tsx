
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PremiumPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const PremiumPopup: React.FC<PremiumPopupProps> = ({ isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto z-50"
        >
          <Card className="bg-card/60 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-foreground mb-2">
                  3 people liked you – Get Premium to view 🔓
                </p>
                <Button 
                  size="sm" 
                  className="bg-highlight text-black hover:bg-highlight/90 w-full"
                  onClick={onClose}
                >
                  See Who Liked You
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumPopup;
