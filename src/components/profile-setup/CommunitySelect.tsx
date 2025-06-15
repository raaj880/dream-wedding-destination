
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

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
      <Label className="text-gray-300">Community/Caste (Optional)</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn("w-full mt-1 bg-card-charcoal border-card-gold/30 text-white focus:border-card-gold")}>
          <SelectValue placeholder="Select your community" />
        </SelectTrigger>
        <SelectContent className="bg-card-charcoal border-card-gold/50 text-white">
          {communityOptions.map((option) => (
            <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')} className="focus:bg-card-gold/20">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CommunitySelect;
