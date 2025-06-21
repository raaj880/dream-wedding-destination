
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProfileData } from '@/types/profile';
import { cn } from '@/lib/utils';
import LocationSelect from './LocationSelect';

interface Step5PreferencesProps {
  data: ProfileData;
  updateData: (newData: Partial<ProfileData>) => void;
  errors: Record<string, string | undefined>;
}

const marryTimeframeOptions = [
  { value: '6m', label: 'Within 6 months' },
  { value: '1y', label: 'Within 1 year' },
  { value: '2y', label: 'Within 2 years' },
  { value: 'norush', label: 'No rush' }
];

const visibilityOptions = [
  { value: 'everyone', label: 'Everyone' },
  { value: 'matches', label: 'Only my matches' },
  { value: 'match_family', label: 'Matches & their families' }
];

const Step5Preferences: React.FC<Step5PreferencesProps> = ({ data, updateData, errors }) => {
  const handleAgeRangeChange = (values: number[]) => {
    updateData({ partnerAgeRange: [values[0], values[1]] });
  };

  return (
    <Card className="w-full animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-semibold text-card-gold flex items-center">
          Your Preferences <span className="ml-2">💫</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        <div>
          <Label className="text-gray-300 font-medium">When do you want to get married?</Label>
          <RadioGroup
            value={data.marryTimeframe}
            onValueChange={(value) => updateData({ marryTimeframe: value as ProfileData['marryTimeframe'] })}
            className={cn("space-y-3 mt-2", errors.marryTimeframe && "border border-red-500 rounded-md p-2")}
          >
            {marryTimeframeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value} 
                  id={`marry-${option.value}`} 
                  className="border-card-gold/50 data-[state=checked]:bg-card-gold data-[state=checked]:text-card-black" 
                />
                <Label htmlFor={`marry-${option.value}`} className="text-gray-300 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.marryTimeframe && <p className="text-sm text-red-500 mt-1">{errors.marryTimeframe}</p>}
        </div>

        <div>
          <Label className="text-gray-300 font-medium">Partner's Age Range</Label>
          <div className="mt-4 px-2">
            <Slider
              value={data.partnerAgeRange}
              onValueChange={handleAgeRangeChange}
              min={18}
              max={65}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>{data.partnerAgeRange[0]} years</span>
              <span>{data.partnerAgeRange[1]} years</span>
            </div>
          </div>
          {errors.partnerAgeRange && <p className="text-sm text-red-500 mt-1">{errors.partnerAgeRange}</p>}
        </div>

        <LocationSelect
          value={data.partnerLocation}
          onChange={(value) => updateData({ partnerLocation: value })}
          error={errors.partnerLocation}
          label="Partner's Preferred Location"
          placeholder="Select preferred city for partner"
        />

        <div>
          <Label className="text-gray-300 font-medium">Profile Visibility</Label>
          <Select 
            value={data.profileVisibility} 
            onValueChange={(value) => updateData({ profileVisibility: value as ProfileData['profileVisibility'] })}
          >
            <SelectTrigger className={cn(
              "w-full mt-1 bg-slate-800 border-slate-600 text-white focus:border-card-gold focus:ring-card-gold/20",
              errors.profileVisibility && "border-red-500"
            )}>
              <SelectValue placeholder="Select who can see your profile" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600 text-white z-[200] shadow-2xl">
              {visibilityOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value} 
                  className="text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.profileVisibility && <p className="text-sm text-red-500 mt-1">{errors.profileVisibility}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default Step5Preferences;
