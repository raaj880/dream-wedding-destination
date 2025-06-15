
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MatchesHeaderProps {
  isFilterActive: boolean;
}

const MatchesHeader: React.FC<MatchesHeaderProps> = ({ isFilterActive }) => {
  return (
    <div className="bg-card border-b border-border px-4 py-3 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild className="hover:bg-accent/10">
            <Link to="/dashboard">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
          </Button>
          <h1 className="text-lg font-bold text-foreground">Your Matches</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Icons removed as per request */}
        </div>
      </div>
    </div>
  );
};

export default MatchesHeader;
