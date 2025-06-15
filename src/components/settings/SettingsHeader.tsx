
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SettingsHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-b from-card to-background backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-primary hover:bg-primary/10 hover:text-white rounded-full p-2">
              <Link to="/profile">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          </div>
          <div onClick={() => navigate('/')} className="flex items-center space-x-2 text-foreground hover:text-gray-200 transition-colors cursor-pointer">
            <Heart className="w-6 h-6 text-highlight fill-highlight" />
            <span className="text-xl font-bold">Wedder</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SettingsHeader;
