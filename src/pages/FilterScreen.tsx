
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilters } from '@/hooks/useFilters';
import { useToast } from '@/hooks/use-toast';

import FilterHeader from '@/components/filters/FilterHeader';
import AgeRangeFilter from '@/components/filters/AgeRangeFilter';
import LocationFilter from '@/components/filters/LocationFilter';
import ReligionFilter from '@/components/filters/ReligionFilter';
import CommunityFilter from '@/components/filters/CommunityFilter';
import EducationFilter from '@/components/filters/EducationFilter';
import MaritalIntentFilter from '@/components/filters/MaritalIntentFilter';
import LanguageFilter from '@/components/filters/LanguageFilter';
import VerifiedFilter from '@/components/filters/VerifiedFilter';
import ApplyFiltersButton from '@/components/filters/ApplyFiltersButton';

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
    <div className="min-h-screen bg-background text-foreground">
      <FilterHeader onReset={handleReset} isActive={isActive} />

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6 pb-32">
        <AgeRangeFilter 
          value={filters.ageRange} 
          onValueChange={(value) => updateFilter('ageRange', value)} 
        />
        <LocationFilter
          location={filters.location}
          nearbyOnly={filters.nearbyOnly}
          onLocationChange={(value) => updateFilter('location', value)}
          onNearbyChange={(checked) => updateFilter('nearbyOnly', checked)}
          locationOptions={locationOptions}
        />
        <ReligionFilter
          value={filters.religions}
          onValueChange={(value) => updateFilter('religions', value)}
          religionOptions={religionOptions}
        />
        <CommunityFilter
          value={filters.community}
          onValueChange={(value) => updateFilter('community', value)}
          communityOptions={communityOptions}
        />
        <EducationFilter
          value={filters.education}
          onValueChange={(value) => updateFilter('education', value)}
          educationOptions={educationOptions}
        />
        <MaritalIntentFilter
          value={filters.maritalIntent}
          onValueChange={(value) => updateFilter('maritalIntent', value)}
        />
        <LanguageFilter
          value={filters.languages}
          onValueChange={(value) => updateFilter('languages', value)}
          languageOptions={languageOptions}
        />
        <VerifiedFilter
          checked={filters.verifiedOnly}
          onCheckedChange={(checked) => updateFilter('verifiedOnly', checked)}
        />
      </div>

      <ApplyFiltersButton onClick={handleApplyFilters} />
    </div>
  );
};

export default FilterScreen;
