
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import FilterCard from './FilterCard';

interface LanguageFilterProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  languageOptions: string[];
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({ value, onValueChange, languageOptions }) => {
  return (
    <FilterCard title="🗣️ Languages Spoken" delay={0.6}>
      <ToggleGroup 
        type="multiple" 
        value={value} 
        onValueChange={onValueChange}
        className="justify-start"
      >
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((language) => (
            <ToggleGroupItem
              key={language}
              value={language}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border-2 border-border hover:border-primary/50 transition-colors"
              size="sm"
            >
              {language}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>
      {value.length > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          {value.length} language{value.length > 1 ? 's' : ''} selected
        </p>
      )}
    </FilterCard>
  );
};

export default LanguageFilter;
