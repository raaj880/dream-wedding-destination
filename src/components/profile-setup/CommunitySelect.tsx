
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CommunitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const communityOptions = [
  'Lingayat', 
  'Brahmin', 
  'Kuruba', 
  'SC/ST', 
  'Others', 
  'Prefer not to say'
];

const CommunitySelect: React.FC<CommunitySelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label className="text-gray-700 dark:text-gray-300">Community/Caste (Optional)</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Select your community" />
        </SelectTrigger>
        <SelectContent>
          {communityOptions.map((option) => (
            <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CommunitySelect;
