
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter, Settings, RotateCcw, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DiscoverHeaderProps {
  isFilterActive: boolean;
  totalProfiles: number;
  showStats: boolean;
  onToggleStats: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const DiscoverHeader: React.FC<DiscoverHeaderProps> = ({
  isFilterActive,
  totalProfiles,
  showStats,
  onToggleStats,
  onRefresh,
  isRefreshing
}) => {
  return (
    <div className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 max-w-4xl mx-auto">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </Link>
        </Button>
        
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-foreground">Discover</h1>
          {isFilterActive && (
            <Badge variant="secondary" className="bg-soft-pink text-secondary-foreground">
              <Filter className="w-3 h-3 mr-1" />
              Filtered
            </Badge>
          )}
          <div className="text-sm text-muted-foreground flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {totalProfiles}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/filter">
              <Filter className="w-5 h-5 text-primary" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleStats}
            className={showStats ? 'bg-soft-pink/20' : ''}
          >
            <TrendingUp className="w-5 h-5 text-primary" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRefresh} 
            disabled={isRefreshing}
          >
            <RotateCcw className={`w-5 h-5 text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverHeader;
