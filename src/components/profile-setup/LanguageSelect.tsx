
import React from 'react';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const languageOptions = ['Kannada', 'English', 'Hindi', 'Telugu', 'Tamil', 'Marathi', 'Malayalam', 'Gujarati'];

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange, error }) => {
  // Convert comma-separated string to array for ToggleGroup
  const selectedLanguages = value ? value.split(', ').filter(lang => lang.trim()) : [];
  
  const handleLanguageChange = (languages: string[]) => {
    // Convert array back to comma-separated string
    onChange(languages.join(', '));
  };

  return (
    <div>
      <Label className="text-gray-700 dark:text-gray-300">Language(s) Spoken</Label>
      <ToggleGroup 
        type="multiple" 
        value={selectedLanguages} 
        onValueChange={handleLanguageChange}
        className={cn("justify-start flex-wrap mt-2", error && "border border-red-500 rounded-md p-2")}
      >
        {languageOptions.map((language) => (
          <ToggleGroupItem
            key={language}
            value={language}
            className="data-[state=on]:bg-soft-pink data-[state=on]:text-deep-blue"
          >
            {language}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Select multiple languages you speak fluently.</p>
    </div>
  );
};

export default LanguageSelect;
