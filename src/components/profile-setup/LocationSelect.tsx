
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
}

const locationOptions = [
  'Bengaluru',
  'Mysuru', 
  'Hyderabad',
  'Chennai',
  'Mumbai',
  'Delhi',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur'
];

const LocationSelect: React.FC<LocationSelectProps> = ({ 
  value, 
  onChange, 
  error, 
  label = "Location (City)", 
  placeholder = "Select your city" 
}) => {
  return (
    <div>
      <Label className="text-gray-300 font-medium">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn(
          "w-full mt-1 bg-slate-800 border-slate-600 text-white focus:border-card-gold focus:ring-card-gold/20",
          error && "border-red-500"
        )}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600 text-white z-[200] shadow-2xl max-h-60 overflow-y-auto">
          {locationOptions.map((city) => (
            <SelectItem 
              key={city} 
              value={city} 
              className="text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white cursor-pointer"
            >
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default LocationSelect;
