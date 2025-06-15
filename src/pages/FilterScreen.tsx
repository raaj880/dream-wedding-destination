
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const { filters, updateFilter, applyFilters, resetFilters, isActive } = useFilters();

  const handleApplyFilters = () => {
    applyFilters();
    toast({
      title: "✅ Filters Applied Successfully",
      description: "Your match preferences have been updated and applied.",
    });
    navigate('/matches');
  };

  const handleReset = () => {
    resetFilters();
    toast({
      title: "🔄 Filters Reset",
      description: "All filters have been cleared and reset to defaults.",
    });
  };

  const religionOptions = ['Hindu', 'Muslim', 'Christian', 'Jain', 'Sikh', 'Buddhist', 'Any'];
  const communityOptions = ['Lingayat', 'Brahmin', 'Kuruba', 'SC/ST', 'Others', 'Prefer not to say'];
  const educationOptions = ['10th', '12th', 'Diploma', 'UG', 'PG', 'PhD', 'Other'];
  const languageOptions = ['Kannada', 'English', 'Hindi', 'Telugu', 'Tamil', 'Marathi'];
  const locationOptions = ['Bengaluru', 'Mysuru', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 flex-1">
            <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100 flex-shrink-0">
              <Link to="/matches">
                <ArrowLeft className="w-5 h-5 text-deep-blue" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-deep-blue">Filter Preferences</h1>
              <p className="text-xs text-gray-500">Customize your match criteria</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {isActive && (
              <div className="flex items-center text-xs text-soft-pink font-medium">
                <Check className="w-3 h-3 mr-1" />
                Active
              </div>
            )}
            <Button variant="ghost" onClick={handleReset} className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-sm px-3">
              <X className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6 pb-24">
        {/* Age Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-deep-blue flex items-center">
                🎂 Age Range
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-deep-blue">
                  {filters.ageRange[0]} – {filters.ageRange[1]}
                </span>
                <span className="text-gray-500 ml-2">years old</span>
              </div>
              <Slider
                value={filters.ageRange}
                onValueChange={(value) => updateFilter('ageRange', value as [number, number])}
                max={65}
                min={18}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-3">
                <span>18 years</span>
                <span>65 years</span>
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
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-deep-blue flex items-center">
                📍 Location Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Preferred City</Label>
                <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any city" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    <SelectItem value="any-city">Any city</SelectItem>
                    {locationOptions.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-soft-pink" />
                  <div>
                    <Label className="text-sm font-medium text-gray-800">Nearby Only</Label>
                    <p className="text-xs text-gray-600">Show profiles within 50km</p>
                  </div>
                </div>
                <Switch
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
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-deep-blue flex items-center">
                🕉️ Religion
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ToggleGroup 
                type="multiple" 
                value={filters.religions} 
                onValueChange={(value) => updateFilter('religions', value)}
                className="justify-start"
              >
                <div className="flex flex-wrap gap-2">
                  {religionOptions.map((religion) => (
                    <ToggleGroupItem
                      key={religion}
                      value={religion}
                      className="data-[state=on]:bg-soft-pink data-[state=on]:text-deep-blue data-[state=on]:border-soft-pink border-2 hover:border-soft-pink/50 transition-colors"
                      size="sm"
                    >
                      {religion}
                    </ToggleGroupItem>
                  ))}
                </div>
              </ToggleGroup>
              {filters.religions.length > 0 && (
                <p className="text-xs text-gray-600 mt-3">
                  {filters.religions.length} religion{filters.religions.length > 1 ? 's' : ''} selected
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-deep-blue flex items-center">
                👥 Community / Caste
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Select value={filters.community} onValueChange={(value) => updateFilter('community', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any community" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  <SelectItem value="any-community">Any community</SelectItem>
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
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-deep-blue flex items-center">
                🎓 Education Level
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Select value={filters.education} onValueChange={(value) => updateFilter('education', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any education level" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  <SelectItem value="any-education">Any education level</SelectItem>
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
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-deep-blue flex items-center">
                💍 Marriage Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <RadioGroup value={filters.maritalIntent} onValueChange={(value) => updateFilter('maritalIntent', value)}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="6months" id="6months" />
                    <Label htmlFor="6months" className="text-sm font-medium cursor-pointer">
                      Within 6 months
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="1year" id="1year" />
                    <Label htmlFor="1year" className="text-sm font-medium cursor-pointer">
                      Within 1 year
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="no-timeline" id="no-timeline" />
                    <Label htmlFor="no-timeline" className="text-sm font-medium cursor-pointer">
                      No specific timeline
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
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-deep-blue flex items-center">
                🗣️ Languages Spoken
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ToggleGroup 
                type="multiple" 
                value={filters.languages} 
                onValueChange={(value) => updateFilter('languages', value)}
                className="justify-start"
              >
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((language) => (
                    <ToggleGroupItem
                      key={language}
                      value={language}
                      className="data-[state=on]:bg-soft-pink data-[state=on]:text-deep-blue data-[state=on]:border-soft-pink border-2 hover:border-soft-pink/50 transition-colors"
                      size="sm"
                    >
                      {language}
                    </ToggleGroupItem>
                  ))}
                </div>
              </ToggleGroup>
              {filters.languages.length > 0 && (
                <p className="text-xs text-gray-600 mt-3">
                  {filters.languages.length} language{filters.languages.length > 1 ? 's' : ''} selected
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Verified Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <Label className="text-lg font-semibold text-deep-blue">
                      Verified Profiles Only
                    </Label>
                    <p className="text-sm text-gray-600">Show only identity-verified profiles</p>
                  </div>
                </div>
                <Switch
                  checked={filters.verifiedOnly}
                  onCheckedChange={(checked) => updateFilter('verifiedOnly', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <Button
            onClick={handleApplyFilters}
            className="w-full bg-gradient-to-r from-deep-blue to-soft-pink text-white hover:from-deep-blue/90 hover:to-soft-pink/90 h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Apply Filters & Find Matches
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FilterScreen;
