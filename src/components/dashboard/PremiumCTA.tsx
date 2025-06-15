
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PremiumCTA: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
    >
      <Card className="bg-coral-pink/10 border-coral-pink/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Get Premium</h3>
              <p className="text-sm text-muted-foreground">See who liked you, unlimited swipes & more!</p>
            </div>
            <Button variant="secondary" className="text-white">
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremiumCTA;
