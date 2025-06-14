
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Filter, MapPin, Heart, GraduationCap, Church, Users, Languages, Calendar, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FilterOptions } from '@/types/filters';

interface FilterSummaryProps {
  filters: FilterOptions;
  onClearFilter: (key: keyof FilterOptions) => void;
  onClearAll: () => void;
}

const FilterSummary: React.FC<FilterSummaryProps> = ({ filters, onClearFilter, onClearAll }) => {
  const activeFilters = [];

  // Age range
  if (filters.ageRange[0] !== 20 || filters.ageRange[1] !== 45) {
    activeFilters.push({
      key: 'ageRange',
      label: `Age ${filters.ageRange[0]}-${filters.ageRange[1]}`,
      icon: Calendar
    });
  }

  // Location
  if (filters.location) {
    activeFilters.push({
      key: 'location',
      label: filters.location,
      icon: MapPin
    });
  }

  // Religions
  if (filters.religions.length > 0) {
    activeFilters.push({
      key: 'religions',
      label: filters.religions.length === 1 ? filters.religions[0] : `${filters.religions.length} religions`,
      icon: Church
    });
  }

  // Community
  if (filters.community) {
    activeFilters.push({
      key: 'community',
      label: filters.community,
      icon: Users
    });
  }

  // Education
  if (filters.education) {
    activeFilters.push({
      key: 'education',
      label: filters.education,
      icon: GraduationCap
    });
  }

  // Languages
  if (filters.languages.length > 0) {
    activeFilters.push({
      key: 'languages',
      label: filters.languages.length === 1 ? filters.languages[0] : `${filters.languages.length} languages`,
      icon: Languages
    });
  }

  // Verified only
  if (filters.verifiedOnly) {
    activeFilters.push({
      key: 'verifiedOnly',
      label: 'Verified only',
      icon: Shield
    });
  }

  if (activeFilters.length === 0) return null;

  return (
    <Card className="bg-soft-pink/10 border-soft-pink">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-deep-blue flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Active Filters
          </h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs">
              Clear All
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-xs">
              <Link to="/filter">
                Edit
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <Badge
                key={filter.key}
                variant="secondary"
                className="bg-white text-deep-blue border border-soft-pink flex items-center"
              >
                <IconComponent className="w-3 h-3 mr-1" />
                <span className="text-xs">{filter.label}</span>
                <button
                  onClick={() => onClearFilter(filter.key as keyof FilterOptions)}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSummary;
