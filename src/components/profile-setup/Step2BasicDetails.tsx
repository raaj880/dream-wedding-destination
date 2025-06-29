
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
    <Card className="w-full animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-semibold text-card-gold flex items-center">
          Tell Us About You <span className="ml-2">👤</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        <div>
          <Label htmlFor="fullName" className="text-gray-300 font-medium">Full Name</Label>
          <Input
            id="fullName"
            placeholder="E.g. Jane Doe"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            className={cn(
              "mt-1 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-card-gold focus:ring-card-gold/20",
              errors.fullName && "border-red-500"
            )}
          />
          {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <Label htmlFor="dob" className="text-gray-300 font-medium">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal mt-1 bg-slate-800 border-slate-600 text-white hover:bg-slate-700 hover:text-white focus:border-card-gold",
                  !data.dob && "text-slate-400",
                  errors.dob && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.dob ? format(data.dob, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600 shadow-2xl z-[200]">
              <Calendar
                mode="single"
                selected={data.dob}
                onSelect={(date) => updateData({ dob: date || undefined })}
                initialFocus
                fromYear={1950}
                toYear={new Date().getFullYear() - 18}
                useCustomCaption
                className="pointer-events-auto"
                classNames={{
                  day: "text-white hover:bg-card-gold hover:text-slate-900 rounded-full",
                  day_selected: "bg-card-gold text-slate-900 focus:bg-card-gold focus:text-slate-900 rounded-full",
                  day_today: "text-card-gold border border-card-gold/50 rounded-full",
                  head_cell: "text-gray-400 font-medium",
                  caption: "text-white",
                  nav_button: "text-white hover:bg-slate-700",
                  table: "text-white"
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob}</p>}
        </div>

        <div>
          <Label className="text-gray-300 font-medium">Gender</Label>
          <RadioGroup
            value={data.gender}
            onValueChange={(value) => updateData({ gender: value as ProfileData['gender'] })}
            className={cn("flex space-x-4 mt-2", errors.gender && "border border-red-500 rounded-md p-2")}
          >
            {['male', 'female', 'other'].map((genderOption) => (
              <div key={genderOption} className="flex items-center space-x-2">
                <RadioGroupItem value={genderOption} id={`gender-${genderOption}`} className="border-card-gold/50 data-[state=checked]:bg-card-gold data-[state=checked]:text-card-black" />
                <Label htmlFor={`gender-${genderOption}`} className="capitalize text-gray-300">
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
