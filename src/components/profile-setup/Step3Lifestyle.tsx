
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileData } from '@/types/profile';
import { cn } from '@/lib/utils';

interface Step3LifestyleProps {
  data: ProfileData;
  updateData: (newData: Partial<ProfileData>) => void;
  errors: Record<string, string | undefined>;
}

// Example options, these can be expanded or fetched from an API
const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Jewish", "Atheist", "Agnostic", "Spiritual but not religious", "Other", "Prefer not to say"];
const educationOptions = ["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctorate", "Professional Degree", "Other"];

const Step3Lifestyle: React.FC<Step3LifestyleProps> = ({ data, updateData, errors }) => {
  return (
    <Card className="w-full animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-deep-blue dark:text-white flex items-center">
          Your Background & Beliefs <span className="ml-2">🌍</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="religion" className="text-gray-700 dark:text-gray-300">Religion</Label>
          <Select value={data.religion} onValueChange={(value) => updateData({ religion: value })}>
            <SelectTrigger className={cn("w-full mt-1", errors.religion && "border-red-500")}>
              <SelectValue placeholder="Select your religion" />
            </SelectTrigger>
            <SelectContent>
              {religionOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.religion && <p className="text-sm text-red-500 mt-1">{errors.religion}</p>}
        </div>

        <div>
          <Label htmlFor="community" className="text-gray-700 dark:text-gray-300">Community/Caste (Optional)</Label>
          <Input
            id="community"
            placeholder="E.g. Brahmin, Punjabi, etc."
            value={data.community}
            onChange={(e) => updateData({ community: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="languages" className="text-gray-700 dark:text-gray-300">Language(s) Spoken</Label>
          <Input
            id="languages"
            placeholder="E.g. English, Hindi, Spanish"
            value={data.languages}
            onChange={(e) => updateData({ languages: e.target.value })}
            className={cn("mt-1", errors.languages && "border-red-500")}
          />
          {errors.languages && <p className="text-sm text-red-500 mt-1">{errors.languages}</p>}
          <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Enter comma-separated languages. Multi-select chips can be added later.</p>
        </div>
        
        <div>
          <Label htmlFor="profession" className="text-gray-700 dark:text-gray-300">Profession</Label>
          <Input
            id="profession"
            placeholder="E.g. Software Engineer, Doctor, Teacher"
            value={data.profession}
            onChange={(e) => updateData({ profession: e.target.value })}
            className={cn("mt-1", errors.profession && "border-red-500")}
          />
          {errors.profession && <p className="text-sm text-red-500 mt-1">{errors.profession}</p>}
        </div>

        <div>
          <Label htmlFor="education" className="text-gray-700 dark:text-gray-300">Education</Label>
           <Select value={data.education} onValueChange={(value) => updateData({ education: value })}>
            <SelectTrigger className={cn("w-full mt-1", errors.education && "border-red-500")}>
              <SelectValue placeholder="Select your highest education" />
            </SelectTrigger>
            <SelectContent>
              {educationOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.education && <p className="text-sm text-red-500 mt-1">{errors.education}</p>}
        </div>

        <div>
          <Label htmlFor="height" className="text-gray-700 dark:text-gray-300">Height</Label>
          <Input
            id="height"
            placeholder={`E.g. 5' 10" or 178 cm`}
            value={data.height}
            onChange={(e) => updateData({ height: e.target.value })}
            className={cn("mt-1", errors.height && "border-red-500")}
          />
          {errors.height && <p className="text-sm text-red-500 mt-1">{errors.height}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3Lifestyle;
