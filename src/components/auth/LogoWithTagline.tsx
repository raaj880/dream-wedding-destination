
import React from 'react';
import { Heart } from 'lucide-react';

const LogoWithTagline: React.FC = () => {
  return (
    <div className="text-center mb-8 animate-in fade-in slide-in-from-top-5 duration-500 ease-out">
      <div className="flex items-center justify-center mb-2">
        <h1 className="text-4xl font-bold text-deep-blue">Wedder</h1>
        <Heart className="w-8 h-8 text-soft-pink fill-soft-pink ml-2" />
      </div>
      <p className="text-md text-gray-600">Modern Matches. Marriage-First.</p>
    </div>
  );
};

export default LogoWithTagline;
