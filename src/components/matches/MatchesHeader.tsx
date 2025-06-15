
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Filter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MatchesHeaderProps {
  isFilterActive: boolean;
}

const MatchesHeader: React.FC<MatchesHeaderProps> = ({ isFilterActive }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100">
            <Link to="/dashboard">
              <ArrowLeft className="w-6 h-6 text-deep-blue" />
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-soft-pink" />
            <div>
              <h1 className="text-xl font-bold text-deep-blue">Your Matches</h1>
              <p className="text-sm text-gray-500">People who liked you back</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild className="relative hover:bg-gray-100">
            <Link to="/filter">
              <Filter className={`w-5 h-5 ${isFilterActive ? 'text-soft-pink' : 'text-gray-600'}`} />
              {isFilterActive && (
                <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-soft-pink border-2 border-white rounded-full" />
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchesHeader;
