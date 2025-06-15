
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileData } from '@/types/profile';
import { cn } from '@/lib/utils';

interface Step4PreferencesProps {
  data: ProfileData;
  updateData: (newData: Partial<ProfileData>) => void;
  errors: Record<string, string | undefined>;
}

const marryTimeframeOptions = [
  { value: '6m', label: 'Within 6 months' },
  { value: '1y', label: 'Within 1 year' },
  { value: '2y', label: 'Within 2 years' },
  { value: 'norush', label: 'No rush' },
];

const profileVisibilityOptions = [
  { value: 'everyone', label: 'Everyone' },
  { value: 'matches', label: 'Only My Matches' },
  { value: 'match_family', label: 'Matches & Their Family (Family Mode)' },
];

const locationPreferenceOptions = ["Same City", "Same State/Province", "Same Country", "NRI / Abroad", "Open to anywhere"];

const Step4Preferences: React.FC<Step4PreferencesProps> = ({ data, updateData, errors }) => {
  return (
    <Card className="w-full animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-semibold text-card-gold flex items-center">
          What Are You Looking For? <span className="ml-2">🎯</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 px-0">
        <div>
          <Label className="text-gray-300">Looking to marry in:</Label>
          <RadioGroup
            value={data.marryTimeframe}
            onValueChange={(value) => updateData({ marryTimeframe: value as ProfileData['marryTimeframe'] })}
            className={cn("grid grid-cols-2 gap-4 mt-2", errors.marryTimeframe && "border border-red-500 rounded-md p-2")}
          >
            {marryTimeframeOptions.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`marry-${option.value}`} className="border-card-gold/50 data-[state=checked]:bg-card-gold data-[state=checked]:text-card-black" />
                <Label htmlFor={`marry-${option.value}`} className="text-gray-300">{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.marryTimeframe && <p className="text-sm text-red-500 mt-1">{errors.marryTimeframe}</p>}
        </div>

        <div>
          <Label htmlFor="ageRange" className="text-gray-300">
            Preferred Partner Age Range: {data.partnerAgeRange[0]} - {data.partnerAgeRange[1]} years
          </Label>
          <Slider
            id="ageRange"
            min={18}
            max={60}
            step={1}
            value={data.partnerAgeRange}
            onValueChange={(value) => updateData({ partnerAgeRange: value as [number, number] })}
            className="mt-3 [&>span]:bg-card-gold [&>span>span]:bg-card-black [&>span>span]:border [&>span>span]:border-card-gold"
          />
           {/* No specific error message for slider, visual validation is usually enough */}
        </div>
        
        <div>
          <Label htmlFor="partnerLocation" className="text-gray-300">Preferred Partner Location</Label>
          <Select value={data.partnerLocation} onValueChange={(value) => updateData({ partnerLocation: value })}>
            <SelectTrigger className={cn("w-full mt-1 bg-card-charcoal border-card-gold/30 text-white focus:border-card-gold", errors.partnerLocation && "border-red-500")}>
              <SelectValue placeholder="Select location preference" />
            </SelectTrigger>
            <SelectContent className="bg-card-charcoal border-card-gold/50 text-white">
              {locationPreferenceOptions.map(option => <SelectItem key={option} value={option} className="focus:bg-card-gold/20">{option}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.partnerLocation && <p className="text-sm text-red-500 mt-1">{errors.partnerLocation}</p>}
        </div>

        <div>
          <Label className="text-gray-300">Allow profile visibility to:</Label>
           <RadioGroup
            value={data.profileVisibility}
            onValueChange={(value) => updateData({ profileVisibility: value as ProfileData['profileVisibility'] })}
            className={cn("space-y-2 mt-2", errors.profileVisibility && "border border-red-500 rounded-md p-2")}
          >
            {profileVisibilityOptions.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`visibility-${option.value}`} className="border-card-gold/50 data-[state=checked]:bg-card-gold data-[state=checked]:text-card-black" />
                <Label htmlFor={`visibility-${option.value}`} className="text-gray-300">{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.profileVisibility && <p className="text-sm text-red-500 mt-1">{errors.profileVisibility}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4Preferences;
