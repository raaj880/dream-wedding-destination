
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FilterCard from './FilterCard';

interface MaritalIntentFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

const MaritalIntentFilter: React.FC<MaritalIntentFilterProps> = ({ value, onValueChange }) => {
  return (
    <FilterCard title="💍 Marriage Timeline" delay={0.5}>
      <RadioGroup value={value} onValueChange={onValueChange}>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="6months" id="6months" />
            <Label htmlFor="6months" className="text-sm font-medium cursor-pointer text-foreground">
              Within 6 months
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="1year" id="1year" />
            <Label htmlFor="1year" className="text-sm font-medium cursor-pointer text-foreground">
              Within 1 year
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="no-timeline" id="no-timeline" />
            <Label htmlFor="no-timeline" className="text-sm font-medium cursor-pointer text-foreground">
              No specific timeline
            </Label>
          </div>
        </div>
      </RadioGroup>
    </FilterCard>
  );
};

export default MaritalIntentFilter;
