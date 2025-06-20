
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
      <Label className="text-gray-300">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn("w-full mt-1 bg-card-charcoal border-card-gold/30 text-white focus:border-card-gold", error && "border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-card-charcoal border-card-gold/50 text-white z-[100] shadow-xl">
          {locationOptions.map((city) => (
            <SelectItem key={city} value={city} className="text-white hover:bg-card-gold/20 focus:bg-card-gold/20 bg-card-charcoal">
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
