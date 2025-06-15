
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuickTipsCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.7 }}
    >
      <Card className="bg-card border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-foreground">Complete your profile</p>
              <p className="text-xs text-muted-foreground">Add more photos and details to get better matches</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-foreground">Stay active</p>
              <p className="text-xs text-muted-foreground">Regular activity increases your visibility</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-foreground">Be genuine</p>
              <p className="text-xs text-muted-foreground">Authentic profiles get more meaningful connections</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickTipsCard;
