
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SwipeControls: React.FC = () => {
  return (
    <Card className="bg-white shadow-sm border">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">Controls</h3>
        <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
          <div className="text-center">
            <div className="font-medium">Swipe or Keys</div>
            <div className="mt-1 space-y-1">
              <div>← X = Pass</div>
              <div>↑ S = Super Like</div>
              <div>→ Z = Like</div>
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium">Quick Actions</div>
            <div className="mt-1 space-y-1">
              <div>R = Refresh</div>
              <div>F = Filters</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwipeControls;
