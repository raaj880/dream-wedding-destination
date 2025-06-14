
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MatchesHeaderProps {
  isFilterActive: boolean;
}

const MatchesHeader: React.FC<MatchesHeaderProps> = ({ isFilterActive }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="w-6 h-6 text-deep-blue" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-deep-blue">Matches</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/filter">
              <Filter className={`w-5 h-5 ${isFilterActive ? 'text-deep-blue' : 'text-gray-600'}`} />
              {isFilterActive && <div className="w-2 h-2 bg-soft-pink rounded-full absolute top-2 right-2" />}
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchesHeader;
