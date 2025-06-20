
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
      <Label className="text-gray-300 font-medium">Community/Caste (Optional)</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn(
          "w-full mt-1 bg-slate-800 border-slate-600 text-white focus:border-card-gold focus:ring-card-gold/20",
          error && "border-red-500"
        )}>
          <SelectValue placeholder="Select your community" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600 text-white z-[200] shadow-2xl max-h-60 overflow-y-auto">
          {communityOptions.map((option) => (
            <SelectItem 
              key={option} 
              value={option.toLowerCase().replace(/\s+/g, '-')} 
              className="text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white cursor-pointer"
            >
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
