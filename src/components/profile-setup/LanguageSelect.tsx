
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
      <Label className="text-gray-300">Language(s) Spoken</Label>
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
            className="data-[state=on]:bg-card-gold data-[state=on]:text-card-black bg-card-charcoal border-card-gold/30 text-white hover:bg-card-gold/20"
          >
            {language}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      <p className="text-xs text-gray-400 mt-1">Select multiple languages you speak fluently.</p>
    </div>
  );
};

export default LanguageSelect;
