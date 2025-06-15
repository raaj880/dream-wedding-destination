
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SettingsHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-card-charcoal/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-card-gold/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-card-gold hover:bg-card-gold/10 hover:text-white rounded-full p-2">
              <Link to="/profile">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-white">Settings</h1>
          </div>
          <div onClick={() => navigate('/')} className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors cursor-pointer">
            <Heart className="w-6 h-6 text-card-gold fill-card-gold" />
            <span className="text-xl font-bold">Wedder</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SettingsHeader;
