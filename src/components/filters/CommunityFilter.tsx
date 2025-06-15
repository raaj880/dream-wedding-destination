
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FilterCard from './FilterCard';

interface CommunityFilterProps {
  value: string;
  onValueChange: (value: string) => void;
  communityOptions: string[];
}

const CommunityFilter: React.FC<CommunityFilterProps> = ({ value, onValueChange, communityOptions }) => {
  return (
    <FilterCard title="👥 Community / Caste" delay={0.3}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Any community" />
        </SelectTrigger>
        <SelectContent className="bg-popover border shadow-lg z-50">
          <SelectItem value="any-community">Any community</SelectItem>
          {communityOptions.map((option) => (
            <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FilterCard>
  );
};

export default CommunityFilter;
