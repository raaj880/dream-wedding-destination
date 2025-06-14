
import React from 'react';

const QuickGuide: React.FC = () => {
  return (
    <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 text-center">
        <div>← X = Pass</div>
        <div>↑ S = Super Like</div>
        <div>→ Z = Like</div>
      </div>
    </div>
  );
};

export default QuickGuide;
