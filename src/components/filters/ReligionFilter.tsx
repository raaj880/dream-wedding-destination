
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import FilterCard from './FilterCard';

interface ReligionFilterProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  religionOptions: string[];
}

const ReligionFilter: React.FC<ReligionFilterProps> = ({ value, onValueChange, religionOptions }) => {
  return (
    <FilterCard title="🕉️ Religion" delay={0.2}>
      <ToggleGroup 
        type="multiple" 
        value={value} 
        onValueChange={onValueChange}
        className="justify-start"
      >
        <div className="flex flex-wrap gap-2">
          {religionOptions.map((religion) => (
            <ToggleGroupItem
              key={religion}
              value={religion}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border-2 border-border hover:border-primary/50 transition-colors"
              size="sm"
            >
              {religion}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>
      {value.length > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          {value.length} religion{value.length > 1 ? 's' : ''} selected
        </p>
      )}
    </FilterCard>
  );
};

export default ReligionFilter;
