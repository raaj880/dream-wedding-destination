
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
      <Card className="bg-gradient-to-r from-soft-pink to-deep-blue/10 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-deep-blue mb-1">Get Premium</h3>
              <p className="text-sm text-gray-600">See who liked you, unlimited swipes & more!</p>
            </div>
            <Button className="bg-deep-blue text-white hover:bg-deep-blue/90">
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremiumCTA;
