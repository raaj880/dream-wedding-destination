
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Heart, Star, X, Zap } from 'lucide-react';

interface DiscoverStatsProps {
  showStats: boolean;
  stats: {
    likes: number;
    passes: number;
    superlikes: number;
    streak: number;
  };
}

const DiscoverStats: React.FC<DiscoverStatsProps> = ({ showStats, stats }) => {
  return (
    <AnimatePresence>
      {showStats && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-white border-b border-gray-100 overflow-hidden"
        >
          <div className="p-4 max-w-md mx-auto">
            <Card className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 border-0">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Session Activity
                </h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Heart className="w-5 h-5 text-green-600 mr-1" />
                      <span className="text-2xl font-bold text-green-600">{stats.likes}</span>
                    </div>
                    <div className="text-xs text-gray-500">Likes</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-600 mr-1" />
                      <span className="text-2xl font-bold text-blue-600">{stats.superlikes}</span>
                    </div>
                    <div className="text-xs text-gray-500">Super Likes</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <X className="w-5 h-5 text-gray-500 mr-1" />
                      <span className="text-2xl font-bold text-gray-500">{stats.passes}</span>
                    </div>
                    <div className="text-xs text-gray-500">Passes</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-600 mr-1" />
                      <span className="text-2xl font-bold text-purple-600">{stats.streak}</span>
                    </div>
                    <div className="text-xs text-gray-500">Streak</div>
                  </div>
                </div>
                {stats.streak > 2 && (
                  <div className="mt-3 text-center">
                    <div className="inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      🔥 On fire! {stats.streak} likes in a row
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiscoverStats;
