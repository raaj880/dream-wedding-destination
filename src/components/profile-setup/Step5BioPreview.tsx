
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileData } from '@/types/profile';
import { User } from 'lucide-react';
import { formatDistanceToNowStrict, differenceInYears } from 'date-fns';
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
          <div className="border border-card-gold/20 rounded-2xl p-4 space-y-3 shadow-premium bg-card-dark-gray">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 border-2 border-card-gold">
                <AvatarImage src={data.photoPreviews[0]} alt={data.fullName} />
                <AvatarFallback className="bg-card-charcoal">
                  <User className="w-10 h-10 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-card-gold">{data.fullName || "Your Name"}</h3>
                <p className="text-sm text-gray-400">
                  {getAge(data.dob)} yrs old {data.gender ? `· ${data.gender}` : ''}
                </p>
                 <p className="text-sm text-gray-400">{data.location || "Your Location"}</p>
              </div>
            </div>
            {data.profession && <p className="text-sm text-gray-300">Profession: {data.profession}</p>}
            {data.bio && (
              <div>
                <h4 className="text-sm font-medium text-card-gold mb-1">About Me:</h4>
                <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed max-h-24 overflow-y-auto">
                  {data.bio}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step5BioPreview;
