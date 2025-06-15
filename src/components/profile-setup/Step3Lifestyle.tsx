
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileData } from '@/types/profile';
import { cn } from '@/lib/utils';
import LanguageSelect from './LanguageSelect';
import CommunitySelect from './CommunitySelect';

interface Step3LifestyleProps {
  data: ProfileData;
  updateData: (newData: Partial<ProfileData>) => void;
  errors: Record<string, string | undefined>;
}

// Updated to match filter options exactly
const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Jewish", "Atheist", "Agnostic", "Spiritual but not religious", "Other", "Prefer not to say"];
const educationOptions = ["10th", "12th", "Diploma", "UG", "PG", "PhD", "Other"];

const Step3Lifestyle: React.FC<Step3LifestyleProps> = ({ data, updateData, errors }) => {
  return (
    <Card className="w-full animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-semibold text-card-gold flex items-center">
          Your Background & Beliefs <span className="ml-2">🌍</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        <div>
          <Label htmlFor="religion" className="text-gray-300">Religion</Label>
          <Select value={data.religion} onValueChange={(value) => updateData({ religion: value })}>
            <SelectTrigger className={cn("w-full mt-1 bg-card-charcoal border-card-gold/30 text-white focus:border-card-gold", errors.religion && "border-red-500")}>
              <SelectValue placeholder="Select your religion" />
            </SelectTrigger>
            <SelectContent className="bg-card-charcoal border-card-gold/50 text-white">
              {religionOptions.map(option => <SelectItem key={option} value={option} className="focus:bg-card-gold/20">{option}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.religion && <p className="text-sm text-red-500 mt-1">{errors.religion}</p>}
        </div>

        <CommunitySelect
          value={data.community}
          onChange={(value) => updateData({ community: value })}
        />

        <LanguageSelect
          value={data.languages}
          onChange={(value) => updateData({ languages: value })}
          error={errors.languages}
        />
        
        <div>
          <Label htmlFor="profession" className="text-gray-300">Profession</Label>
          <Input
            id="profession"
            placeholder="E.g. Software Engineer, Doctor, Teacher"
            value={data.profession}
            onChange={(e) => updateData({ profession: e.target.value })}
            className={cn("mt-1 bg-card-charcoal border-card-gold/30 text-white focus:border-card-gold", errors.profession && "border-red-500")}
          />
          {errors.profession && <p className="text-sm text-red-500 mt-1">{errors.profession}</p>}
        </div>

        <div>
          <Label htmlFor="education" className="text-gray-300">Education</Label>
           <Select value={data.education} onValueChange={(value) => updateData({ education: value })}>
            <SelectTrigger className={cn("w-full mt-1 bg-card-charcoal border-card-gold/30 text-white focus:border-card-gold", errors.education && "border-red-500")}>
              <SelectValue placeholder="Select your highest education" />
            </SelectTrigger>
            <SelectContent className="bg-card-charcoal border-card-gold/50 text-white">
              {educationOptions.map(option => <SelectItem key={option} value={option} className="focus:bg-card-gold/20">{option}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.education && <p className="text-sm text-red-500 mt-1">{errors.education}</p>}
        </div>

        <div>
          <Label htmlFor="height" className="text-gray-300">Height</Label>
          <Input
            id="height"
            placeholder={`E.g. 5' 10" or 178 cm`}
            value={data.height}
            onChange={(e) => updateData({ height: e.target.value })}
            className={cn("mt-1 bg-card-charcoal border-card-gold/30 text-white focus:border-card-gold", errors.height && "border-red-500")}
          />
          {errors.height && <p className="text-sm text-red-500 mt-1">{errors.height}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3Lifestyle;
