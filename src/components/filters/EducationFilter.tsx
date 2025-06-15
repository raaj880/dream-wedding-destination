
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FilterCard from './FilterCard';

interface EducationFilterProps {
  value: string;
  onValueChange: (value: string) => void;
  educationOptions: string[];
}

const EducationFilter: React.FC<EducationFilterProps> = ({ value, onValueChange, educationOptions }) => {
  return (
    <FilterCard title="🎓 Education Level" delay={0.4}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Any education level" />
        </SelectTrigger>
        <SelectContent className="bg-popover border shadow-lg z-50">
          <SelectItem value="any-education">Any education level</SelectItem>
          {educationOptions.map((option) => (
            <SelectItem key={option} value={option.toLowerCase()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FilterCard>
  );
};

export default EducationFilter;
