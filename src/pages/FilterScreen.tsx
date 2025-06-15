
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { motion } from 'framer-motion';
import { useFilters } from '@/hooks/useFilters';
import { useToast } from '@/hooks/use-toast';

const FilterScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { filters, updateFilter, applyFilters, resetFilters } = useFilters();

  const handleApplyFilters = () => {
    applyFilters();
    toast({
      title: "Filters Applied",
      description: "Your match preferences have been updated.",
    });
    navigate('/matches');
  };

  const handleReset = () => {
    resetFilters();
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  const religionOptions = ['Hindu', 'Muslim', 'Christian', 'Jain', 'Sikh', 'Buddhist', 'Any'];
  const communityOptions = ['Lingayat', 'Brahmin', 'Kuruba', 'SC/ST', 'Others', 'Prefer not to say'];
  const educationOptions = ['10th', '12th', 'Diploma', 'UG', 'PG', 'PhD', 'Other'];
  const languageOptions = ['Kannada', 'English', 'Hindi', 'Telugu', 'Tamil', 'Marathi'];
  const locationOptions = ['Bengaluru', 'Mysuru', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur'];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/matches">
                <ArrowLeft className="w-6 h-6 text-deep-blue" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-deep-blue">Filter Matches</h1>
          </div>
          
          <Button variant="ghost" onClick={handleReset} className="text-gray-500 hover:text-gray-700">
            Reset All
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Age Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold text-deep-blue mb-4 block">Age Range</Label>
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-deep-blue">
                  {filters.ageRange[0]} – {filters.ageRange[1]} years
                </span>
              </div>
              <Slider
                value={filters.ageRange}
                onValueChange={(value) => updateFilter('ageRange', value as [number, number])}
                max={65}
                min={18}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>18</span>
                <span>65</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold text-deep-blue mb-4 block">Location</Label>
              <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <Label htmlFor="nearby" className="text-sm font-medium">Nearby only</Label>
                <Switch
                  id="nearby"
                  checked={filters.nearbyOnly}
                  onCheckedChange={(checked) => updateFilter('nearbyOnly', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Religion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold text-deep-blue mb-4 block">Religion</Label>
              <ToggleGroup 
                type="multiple" 
                value={filters.religions} 
                onValueChange={(value) => updateFilter('religions', value)}
              >
                <div className="flex flex-wrap gap-2">
                  {religionOptions.map((religion) => (
                    <ToggleGroupItem
                      key={religion}
                      value={religion}
                      className="data-[state=on]:bg-soft-pink data-[state=on]:text-deep-blue"
                    >
                      {religion}
                    </ToggleGroupItem>
                  ))}
                </div>
              </ToggleGroup>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold text-deep-blue mb-4 block">Community / Caste</Label>
              <Select value={filters.community} onValueChange={(value) => updateFilter('community', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select community" />
                </SelectTrigger>
                <SelectContent>
                  {communityOptions.map((option) => (
                    <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold text-deep-blue mb-4 block">Education</Label>
              <Select value={filters.education} onValueChange={(value) => updateFilter('education', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationOptions.map((option) => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Marital Intent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold text-deep-blue mb-4 block">
                Looking to marry in:
              </Label>
              <RadioGroup value={filters.maritalIntent} onValueChange={(value) => updateFilter('maritalIntent', value)}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6months" id="6months" />
                    <Label htmlFor="6months" className="text-sm font-medium">
                      &lt; 6 months
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1year" id="1year" />
                    <Label htmlFor="1year" className="text-sm font-medium">
                      Within 1 year
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-timeline" id="no-timeline" />
                    <Label htmlFor="no-timeline" className="text-sm font-medium">
                      No timeline yet
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold text-deep-blue mb-4 block">Languages Spoken</Label>
              <ToggleGroup 
                type="multiple" 
                value={filters.languages} 
                onValueChange={(value) => updateFilter('languages', value)}
              >
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((language) => (
                    <ToggleGroupItem
                      key={language}
                      value={language}
                      className="data-[state=on]:bg-soft-pink data-[state=on]:text-deep-blue"
                    >
                      {language}
                    </ToggleGroupItem>
                  ))}
                </div>
              </ToggleGroup>
            </CardContent>
          </Card>
        </motion.div>

        {/* Show Verified Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">👁️</span>
                  <Label htmlFor="verified" className="text-lg font-semibold text-deep-blue">
                    Only show verified profiles
                  </Label>
                </div>
                <Switch
                  id="verified"
                  checked={filters.verifiedOnly}
                  onCheckedChange={(checked) => updateFilter('verifiedOnly', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Apply Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <Button
            onClick={handleApplyFilters}
            className="w-full bg-deep-blue text-white hover:bg-deep-blue/90 h-12 text-lg font-semibold rounded-xl"
          >
            Apply Filters
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FilterScreen;
