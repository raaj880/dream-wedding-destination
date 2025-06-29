
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ProfileData } from '@/types/profile';
import { cn } from '@/lib/utils';

interface Step4JathakaDetailsProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  errors: Record<string, string | undefined>;
}

const RASHIS = [
  'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
  'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrischika (Scorpio)',
  'Dhanus (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
];

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu',
  'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta',
  'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

const Step4JathakaDetails: React.FC<Step4JathakaDetailsProps> = ({ data, updateData, errors }) => {
  const handleDoshaChange = (value: string) => {
    if (value === 'no') {
      updateData({ dosha: 'None' });
    } else if (value === 'dont-know') {
      updateData({ dosha: 'Unknown' });
    } else {
      updateData({ dosha: '' });
    }
  };

  const getDoshaRadioValue = () => {
    if (data.dosha === 'None') return 'no';
    if (data.dosha === 'Unknown') return 'dont-know';
    if (data.dosha && data.dosha !== 'None' && data.dosha !== 'Unknown') return 'yes';
    return '';
  };

  return (
    <Card className="w-full animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-semibold text-card-gold flex items-center">
          Jathaka Details <span className="ml-2">🌟</span>
        </CardTitle>
        <p className="text-sm text-gray-300 mt-2">
          Your astrological information helps find compatible matches
        </p>
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-300 font-medium">Time of Birth</Label>
            <Input
              type="time"
              value={data.timeOfBirth || ''}
              onChange={(e) => updateData({ timeOfBirth: e.target.value })}
              className={cn(
                "bg-slate-800 border-slate-600 text-white focus:border-card-gold focus:ring-card-gold/20",
                errors.timeOfBirth && "border-red-500"
              )}
            />
            {errors.timeOfBirth && (
              <p className="text-red-400 text-sm">{errors.timeOfBirth}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 font-medium">Place of Birth</Label>
            <Input
              placeholder="City, State, Country"
              value={data.placeOfBirth}
              onChange={(e) => updateData({ placeOfBirth: e.target.value })}
              className={cn(
                "bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-card-gold focus:ring-card-gold/20",
                errors.placeOfBirth && "border-red-500"
              )}
            />
            {errors.placeOfBirth && (
              <p className="text-red-400 text-sm">{errors.placeOfBirth}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 font-medium">Rashi (Moon Sign)</Label>
            <Select value={data.rashi} onValueChange={(value) => updateData({ rashi: value })}>
              <SelectTrigger className={cn(
                "bg-slate-800 border-slate-600 text-white focus:border-card-gold focus:ring-card-gold/20",
                errors.rashi && "border-red-500"
              )}>
                <SelectValue placeholder="Select your Rashi" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600 text-white z-[200] shadow-2xl max-h-60 overflow-y-auto">
                {RASHIS.map((rashi) => (
                  <SelectItem 
                    key={rashi} 
                    value={rashi} 
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white cursor-pointer"
                  >
                    {rashi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.rashi && (
              <p className="text-red-400 text-sm">{errors.rashi}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 font-medium">Nakshatra (Birth Star)</Label>
            <Select value={data.nakshatra} onValueChange={(value) => updateData({ nakshatra: value })}>
              <SelectTrigger className={cn(
                "bg-slate-800 border-slate-600 text-white focus:border-card-gold focus:ring-card-gold/20",
                errors.nakshatra && "border-red-500"
              )}>
                <SelectValue placeholder="Select your Nakshatra" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600 text-white z-[200] shadow-2xl max-h-60 overflow-y-auto">
                {NAKSHATRAS.map((nakshatra) => (
                  <SelectItem 
                    key={nakshatra} 
                    value={nakshatra} 
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white cursor-pointer"
                  >
                    {nakshatra}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.nakshatra && (
              <p className="text-red-400 text-sm">{errors.nakshatra}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="text-gray-300 font-medium">Gothra</Label>
            <Input
              placeholder="Enter your Gothra"
              value={data.gothra}
              onChange={(e) => updateData({ gothra: e.target.value })}
              className={cn(
                "bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-card-gold focus:ring-card-gold/20",
                errors.gothra && "border-red-500"
              )}
            />
            {errors.gothra && (
              <p className="text-red-400 text-sm">{errors.gothra}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-gray-300 font-medium">Manglik/Dosha Status</Label>
          <RadioGroup
            value={getDoshaRadioValue()}
            onValueChange={handleDoshaChange}
            className={cn("space-y-3", errors.dosha && "border border-red-500 rounded-md p-2")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="dosha-no" className="border-card-gold/50 data-[state=checked]:bg-card-gold data-[state=checked]:text-card-black" />
              <Label htmlFor="dosha-no" className="text-gray-300 cursor-pointer">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="dosha-yes" className="border-card-gold/50 data-[state=checked]:bg-card-gold data-[state=checked]:text-card-black" />
              <Label htmlFor="dosha-yes" className="text-gray-300 cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dont-know" id="dosha-unknown" className="border-card-gold/50 data-[state=checked]:bg-card-gold data-[state=checked]:text-card-black" />
              <Label htmlFor="dosha-unknown" className="text-gray-300 cursor-pointer">Don't Know</Label>
            </div>
          </RadioGroup>

          {getDoshaRadioValue() === 'yes' && (
            <div className="mt-4">
              <Input
                placeholder="Specify dosha (e.g., Kuja Dosha, Naga Dosha)"
                value={data.dosha}
                onChange={(e) => updateData({ dosha: e.target.value })}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-card-gold focus:ring-card-gold/20"
              />
            </div>
          )}
          {errors.dosha && (
            <p className="text-red-400 text-sm">{errors.dosha}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4JathakaDetails;
