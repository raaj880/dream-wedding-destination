
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
          <Button variant="ghost" size="icon" asChild className="relative hover:bg-accent/10">
            <Link to="/filter">
              <Filter className={`w-6 h-6 ${isFilterActive ? 'text-primary' : 'text-muted-foreground'}`} />
              {isFilterActive && (
                <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-primary border-2 border-card rounded-full" />
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative hover:bg-accent/10">
            <Bell className="w-6 h-6 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchesHeader;
