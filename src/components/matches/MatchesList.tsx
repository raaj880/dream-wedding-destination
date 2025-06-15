
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Search, Sparkles, Filter as FilterIcon } from 'lucide-react';
import MatchCard from './MatchCard';

interface MatchesListProps {
  matches: Array<{
    id: string;
    fullName: string;
    age: number;
    location: string;
    profession: string;
    religion: string;
    photos: string[];
    verified: boolean;
    status: string;
    lastSeen: string;
  }>;
  filteredCount: number;
  isFilterActive: boolean;
}

const MatchesList: React.FC<MatchesListProps> = ({ matches, filteredCount, isFilterActive }) => {
  if (matches.length > 0) {
    return (
      <div className="space-y-4">
        {matches.map((match, index) => (
          <MatchCard key={match.id} match={match} index={index} />
        ))}
      </div>
    );
  }

  // Empty state with enhanced messaging
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="max-w-md mx-auto">
        {isFilterActive ? (
          <>
            <div className="w-20 h-20 bg-gradient-to-br from-soft-pink/20 to-deep-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FilterIcon className="w-10 h-10 text-soft-pink" />
            </div>
            <h3 className="text-xl font-bold text-deep-blue mb-3">
              No matches with current filters
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Try expanding your search criteria to discover more potential matches. Sometimes the perfect person might be just outside your current preferences!
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-deep-blue text-white hover:bg-deep-blue/90" asChild>
                <Link to="/swipe">
                  <Search className="w-4 h-4 mr-2" />
                  Explore All Profiles
                </Link>
              </Button>
              <Button variant="outline" className="w-full border-soft-pink text-soft-pink hover:bg-soft-pink/10" asChild>
                <Link to="/filter">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Adjust Filters
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-gradient-to-br from-soft-pink/20 to-deep-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-soft-pink" />
            </div>
            <h3 className="text-xl font-bold text-deep-blue mb-3">
              Start Building Connections
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your matches will appear here when someone likes you back. Start exploring profiles and expressing interest to create meaningful connections!
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-deep-blue to-soft-pink text-white hover:from-deep-blue/90 hover:to-soft-pink/90" asChild>
                <Link to="/swipe">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Discover Profiles
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/filter">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Set Preferences
                </Link>
              </Button>
            </div>
          </>
        )}
        
        <div className="mt-8 p-4 bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 rounded-lg">
          <p className="text-sm text-gray-700 font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-gray-600">
            Complete your profile and add more photos to increase your chances of getting matches!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchesList;
