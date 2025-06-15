
import React from 'react';
import { Slider } from '@/components/ui/slider';
import FilterCard from './FilterCard';

interface AgeRangeFilterProps {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

const AgeRangeFilter: React.FC<AgeRangeFilterProps> = ({ value, onValueChange }) => {
  return (
    <FilterCard title="🎂 Age Range" delay={0}>
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-foreground">
          {value[0]} – {value[1]}
        </span>
        <span className="text-muted-foreground ml-2">years old</span>
      </div>
      <Slider
        value={value}
        onValueChange={(v) => onValueChange(v as [number, number])}
        max={65}
        min={18}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-muted-foreground mt-3">
        <span>18 years</span>
        <span>65 years</span>
      </div>
    </FilterCard>
  );
};

export default AgeRangeFilter;
