
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ProfileData } from '@/types/profile';
import TrustNote from './TrustNote';

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
      updateData({ dosha: '' }); // Will allow user to specify
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg bg-card-dark-gray border border-card-gold/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-card-gold flex items-center justify-center">
            🌟 Jathaka Details
          </CardTitle>
          <p className="text-sm text-gray-300 mt-2">
            Your astrological information helps find compatible matches
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Time of Birth */}
            <div className="space-y-2">
              <Label className="text-card-gold font-medium">Time of Birth</Label>
              <Input
                type="time"
                value={data.timeOfBirth || ''}
                onChange={(e) => updateData({ timeOfBirth: e.target.value })}
                className="bg-card-black border-card-gold/30 text-white"
              />
              {errors.timeOfBirth && (
                <p className="text-red-400 text-sm">{errors.timeOfBirth}</p>
              )}
            </div>

            {/* Place of Birth */}
            <div className="space-y-2">
              <Label className="text-card-gold font-medium">Place of Birth</Label>
              <Input
                placeholder="City, State, Country"
                value={data.placeOfBirth}
                onChange={(e) => updateData({ placeOfBirth: e.target.value })}
                className="bg-card-black border-card-gold/30 text-white placeholder:text-gray-400"
              />
              {errors.placeOfBirth && (
                <p className="text-red-400 text-sm">{errors.placeOfBirth}</p>
              )}
            </div>

            {/* Rashi */}
            <div className="space-y-2">
              <Label className="text-card-gold font-medium">Rashi (Moon Sign)</Label>
              <Select value={data.rashi} onValueChange={(value) => updateData({ rashi: value })}>
                <SelectTrigger className="bg-card-black border-card-gold/30 text-white">
                  <SelectValue placeholder="Select your Rashi" />
                </SelectTrigger>
                <SelectContent className="bg-card-dark-gray border-card-gold/20">
                  {RASHIS.map((rashi) => (
                    <SelectItem key={rashi} value={rashi} className="text-white hover:bg-card-gold/10">
                      {rashi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.rashi && (
                <p className="text-red-400 text-sm">{errors.rashi}</p>
              )}
            </div>

            {/* Nakshatra */}
            <div className="space-y-2">
              <Label className="text-card-gold font-medium">Nakshatra (Birth Star)</Label>
              <Select value={data.nakshatra} onValueChange={(value) => updateData({ nakshatra: value })}>
                <SelectTrigger className="bg-card-black border-card-gold/30 text-white">
                  <SelectValue placeholder="Select your Nakshatra" />
                </SelectTrigger>
                <SelectContent className="bg-card-dark-gray border-card-gold/20">
                  {NAKSHATRAS.map((nakshatra) => (
                    <SelectItem key={nakshatra} value={nakshatra} className="text-white hover:bg-card-gold/10">
                      {nakshatra}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.nakshatra && (
                <p className="text-red-400 text-sm">{errors.nakshatra}</p>
              )}
            </div>

            {/* Gothra */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-card-gold font-medium">Gothra</Label>
              <Input
                placeholder="Enter your Gothra"
                value={data.gothra}
                onChange={(e) => updateData({ gothra: e.target.value })}
                className="bg-card-black border-card-gold/30 text-white placeholder:text-gray-400"
              />
              {errors.gothra && (
                <p className="text-red-400 text-sm">{errors.gothra}</p>
              )}
            </div>
          </div>

          {/* Dosha Section */}
          <div className="space-y-4">
            <Label className="text-card-gold font-medium">Manglik/Dosha Status</Label>
            <RadioGroup
              value={
                data.dosha === 'None' ? 'no' : 
                data.dosha === 'Unknown' ? 'dont-know' : 
                data.dosha ? 'yes' : ''
              }
              onValueChange={handleDoshaChange}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="dosha-no" />
                <Label htmlFor="dosha-no" className="text-white cursor-pointer">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="dosha-yes" />
                <Label htmlFor="dosha-yes" className="text-white cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dont-know" id="dosha-unknown" />
                <Label htmlFor="dosha-unknown" className="text-white cursor-pointer">Don't Know</Label>
              </div>
            </RadioGroup>

            {/* Specific Dosha Input */}
            {data.dosha !== 'None' && data.dosha !== 'Unknown' && (
              <div className="mt-4">
                <Input
                  placeholder="Specify dosha (e.g., Kuja Dosha, Naga Dosha)"
                  value={data.dosha}
                  onChange={(e) => updateData({ dosha: e.target.value })}
                  className="bg-card-black border-card-gold/30 text-white placeholder:text-gray-400"
                />
              </div>
            )}
            {errors.dosha && (
              <p className="text-red-400 text-sm">{errors.dosha}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <TrustNote />
    </div>
  );
};

export default Step4JathakaDetails;
