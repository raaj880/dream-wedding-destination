
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileData } from '@/types/profile';
import { User, MapPin, Briefcase } from 'lucide-react';
import { differenceInYears } from 'date-fns';
import { cn } from '@/lib/utils';

interface Step5BioPreviewProps {
  data: ProfileData;
  updateData: (newData: Partial<ProfileData>) => void;
  errors: Record<string, string | undefined>;
}

const Step5BioPreview: React.FC<Step5BioPreviewProps> = ({ data, updateData, errors }) => {
  const getAge = (dob?: Date) => {
    if (!dob) return 'N/A';
    return differenceInYears(new Date(), dob);
  };

  const capitalizedGender = data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : '';

  return (
    <div className="w-full animate-in fade-in-50 duration-500 space-y-6">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl font-semibold text-card-gold flex items-center">
            Write a Short Bio <span className="ml-2">✍️</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Label htmlFor="bio" className="text-gray-300">Your Bio (max 500 characters)</Label>
          <Textarea
            id="bio"
            placeholder="E.g. I'm a software engineer who loves coffee, books, and travel. Looking for a kind-hearted partner to build a meaningful life with."
            value={data.bio}
            onChange={(e) => updateData({ bio: e.target.value })}
            maxLength={500}
            className={cn("mt-1 min-h-[120px] bg-card-charcoal border-card-gold/30 text-white focus:border-card-gold", errors.bio && "border-red-500")}
          />
          {errors.bio && <p className="text-sm text-red-500 mt-1">{errors.bio}</p>}
          <p className="text-xs text-right text-gray-500 mt-1">{data.bio.length}/500</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-0">
          <CardTitle className="text-xl font-semibold text-card-gold">Profile Preview</CardTitle>
          <CardDescription className="text-gray-400">This is how your basic profile will look to others.</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="border border-card-gold/20 rounded-2xl p-5 space-y-5 shadow-premium bg-card-dark-gray/80 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24 border-2 border-card-gold">
                <AvatarImage src={data.photoPreviews[0]} alt={data.fullName} />
                <AvatarFallback className="bg-card-charcoal">
                  <User className="w-12 h-12 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white">{data.fullName || "Your Name"}</h3>
                <p className="text-base text-gray-300">
                  {getAge(data.dob)} yrs old {capitalizedGender ? `· ${capitalizedGender}` : ''}
                </p>
                 <p className="text-base text-gray-400 flex items-center pt-1">
                    <MapPin className="w-4 h-4 mr-2 text-card-gold/70" />
                    {data.location || "Your Location"}
                 </p>
              </div>
            </div>
            
            <div className="border-t border-card-gold/10"></div>

            <div className="space-y-4">
                {data.profession && (
                    <div className="flex items-start space-x-3">
                        <Briefcase className="w-5 h-5 mt-1 text-card-gold/80 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-400">Profession</p>
                            <p className="text-base text-gray-200 font-medium">{data.profession}</p>
                        </div>
                    </div>
                )}
                {data.bio && (
                  <div>
                    <h4 className="text-base font-semibold text-card-gold mb-2">About Me</h4>
                    <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed max-h-24 overflow-y-auto border-l-2 border-card-gold/20 pl-4">
                      {data.bio}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step5BioPreview;
