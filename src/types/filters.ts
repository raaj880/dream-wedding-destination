
export interface FilterOptions {
  ageRange: [number, number];
  location: string;
  nearbyOnly: boolean;
  religions: string[];
  community: string;
  education: string;
  maritalIntent: string;
  languages: string[];
  verifiedOnly: boolean;
}

export const initialFilterOptions: FilterOptions = {
  ageRange: [18, 65], // Expanded age range to be more inclusive
  location: '',
  nearbyOnly: false,
  religions: [], // Empty array means no religion filter
  community: '',
  education: '',
  maritalIntent: '',
  languages: [], // Empty array means no language filter
  verifiedOnly: false, // Don't require verification by default
};

export interface FilterState {
  filters: FilterOptions;
  appliedFilters: FilterOptions;
  isActive: boolean;
}
