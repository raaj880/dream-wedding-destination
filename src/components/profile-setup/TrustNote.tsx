
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const TrustNote: React.FC = () => {
  return (
    <div className="mt-auto pt-4 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
        <ShieldCheck className="w-4 h-4 mr-1.5 text-gray-400 dark:text-gray-500" />
        Your information is kept private and secure. We never share without your permission.
      </p>
    </div>
  );
};

export default TrustNote;
