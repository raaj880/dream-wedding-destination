
import React from 'react';
import { MapPin } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FilterCard from './FilterCard';

interface LocationFilterProps {
  location: string;
  nearbyOnly: boolean;
  onLocationChange: (value: string) => void;
  onNearbyChange: (checked: boolean) => void;
  locationOptions: string[];
}

const LocationFilter: React.FC<LocationFilterProps> = ({ location, nearbyOnly, onLocationChange, onNearbyChange, locationOptions }) => {
  return (
    <FilterCard title="📍 Location Preferences" delay={0.1} contentClassName="space-y-4">
      <div>
        <Label className="text-sm font-medium text-muted-foreground mb-2 block">Preferred City</Label>
        <Select value={location} onValueChange={onLocationChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any city" />
          </SelectTrigger>
          <SelectContent className="bg-popover border shadow-lg z-50">
            <SelectItem value="any-city">Any city</SelectItem>
            {locationOptions.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-primary" />
          <div>
            <Label className="text-sm font-medium text-foreground">Nearby Only</Label>
            <p className="text-xs text-muted-foreground">Show profiles within 50km</p>
          </div>
        </div>
        <Switch
          checked={nearbyOnly}
          onCheckedChange={onNearbyChange}
        />
      </div>
    </FilterCard>
  );
};

export default LocationFilter;
