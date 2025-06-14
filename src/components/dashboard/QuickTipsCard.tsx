
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
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-deep-blue">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Complete your profile</p>
              <p className="text-xs text-gray-600">Add more photos and details to get better matches</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Stay active</p>
              <p className="text-xs text-gray-600">Regular activity increases your visibility</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Be genuine</p>
              <p className="text-xs text-gray-600">Authentic profiles get more meaningful connections</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickTipsCard;
