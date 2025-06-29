
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter, RotateCcw, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SwipeHeaderProps {
  isFilterActive: boolean;
  showStats: boolean;
  onToggleStats: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const SwipeHeader: React.FC<SwipeHeaderProps> = ({
  isFilterActive,
  showStats,
  onToggleStats,
  onRefresh,
  isRefreshing
}) => {
  return (
    <div className="bg-background border-b border-primary/30 px-4 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <Button variant="ghost" size="icon" asChild className="text-card-gold hover:bg-card-gold/20">
          <Link to="/dashboard">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </Button>
        
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-white">Discover</h1>
          {isFilterActive && (
            <Badge variant="secondary" className="gold-gradient text-black">
              <Filter className="w-3 h-3 mr-1" />
              Filtered
            </Badge>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" asChild className="text-card-gold hover:bg-card-gold/20">
            <Link to="/filter">
              <Filter className="w-5 h-5" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleStats}
            className={`text-card-gold hover:bg-card-gold/20 ${showStats ? 'bg-card-gold/20' : ''}`}
          >
            <TrendingUp className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onRefresh} disabled={isRefreshing} className="text-card-gold hover:bg-card-gold/20">
            <RotateCcw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwipeHeader;
