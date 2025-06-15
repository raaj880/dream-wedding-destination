
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ProfileData } from '@/types/profile';
import { cn } from '@/lib/utils';
import LocationSelect from './LocationSelect';

interface Step2BasicDetailsProps {
  data: ProfileData;
  updateData: (newData: Partial<ProfileData>) => void;
  errors: Record<string, string | undefined>;
}

const Step2BasicDetails: React.FC<Step2BasicDetailsProps> = ({ data, updateData, errors }) => {
  return (
    <Card className="w-full animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-deep-blue dark:text-white flex items-center">
          Tell Us About You <span className="ml-2">👤</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">Full Name</Label>
          <Input
            id="fullName"
            placeholder="E.g. Jane Doe"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            className={cn("mt-1", errors.fullName && "border-red-500")}
          />
          {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <Label htmlFor="dob" className="text-gray-700 dark:text-gray-300">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal mt-1",
                  !data.dob && "text-muted-foreground",
                  errors.dob && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.dob ? format(data.dob, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.dob}
                onSelect={(date) => updateData({ dob: date || undefined })}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={1950}
                toYear={new Date().getFullYear() - 18} // Must be at least 18
              />
            </PopoverContent>
          </Popover>
          {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob}</p>}
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300">Gender</Label>
          <RadioGroup
            value={data.gender}
            onValueChange={(value) => updateData({ gender: value as ProfileData['gender'] })}
            className={cn("flex space-x-4 mt-2", errors.gender && "border border-red-500 rounded-md p-2")}
          >
            {['male', 'female', 'other'].map((genderOption) => (
              <div key={genderOption} className="flex items-center space-x-2">
                <RadioGroupItem value={genderOption} id={`gender-${genderOption}`} />
                <Label htmlFor={`gender-${genderOption}`} className="capitalize text-gray-700 dark:text-gray-300">
                  {genderOption}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
        </div>

        <LocationSelect
          value={data.location}
          onChange={(value) => updateData({ location: value })}
          error={errors.location}
        />
      </CardContent>
    </Card>
  );
};

export default Step2BasicDetails;
