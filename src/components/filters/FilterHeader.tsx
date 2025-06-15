
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterHeaderProps {
  onReset: () => void;
  isActive: boolean;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({ onReset, isActive }) => {
  return (
    <div className="bg-card border-b border-border px-4 py-4 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 flex-1">
          <Button variant="ghost" size="icon" asChild className="hover:bg-accent flex-shrink-0">
            <Link to="/matches">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Filter Preferences</h1>
            <p className="text-xs text-muted-foreground">Customize your match criteria</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          {isActive && (
            <div className="flex items-center text-xs text-primary font-medium">
              <Check className="w-3 h-3 mr-1" />
              Active
            </div>
          )}
          <Button variant="ghost" onClick={onReset} className="text-muted-foreground hover:text-foreground hover:bg-accent text-sm px-3">
            <X className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterHeader;
