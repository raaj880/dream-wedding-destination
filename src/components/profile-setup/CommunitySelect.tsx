
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CommunitySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const communityOptions = [
  'Lingayat', 
  'Brahmin', 
  'Kuruba', 
  'SC/ST', 
  'Others', 
  'Prefer not to say'
];

const CommunitySelect: React.FC<CommunitySelectProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <Label className="text-gray-300">Community/Caste (Optional)</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn("w-full mt-1 bg-card-charcoal border-card-gold/30 text-white focus:border-card-gold", error && "border-red-500")}>
          <SelectValue placeholder="Select your community" />
        </SelectTrigger>
        <SelectContent className="bg-card-charcoal border-card-gold/50 text-white z-50">
          {communityOptions.map((option) => (
            <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')} className="text-white hover:bg-card-gold/20 focus:bg-card-gold/20">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CommunitySelect;
