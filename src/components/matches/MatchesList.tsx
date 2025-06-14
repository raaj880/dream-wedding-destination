
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="text-6xl mb-4">
        {isFilterActive ? '🔍' : '💌'}
      </div>
      <h3 className="text-lg font-semibold text-deep-blue mb-2">
        {isFilterActive ? 'No matches found' : 'No matches yet'}
      </h3>
      <p className="text-gray-600 mb-6">
        {isFilterActive ? 'Try adjusting your filters to see more profiles.' : 'Keep swiping to find your perfect match!'}
      </p>
      <div className="space-y-2">
        <Button className="bg-deep-blue text-white hover:bg-deep-blue/90" asChild>
          <Link to="/swipe">
            Explore Profiles
          </Link>
        </Button>
        {isFilterActive && (
          <Button variant="outline" asChild>
            <Link to="/filter">
              Adjust Filters
            </Link>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default MatchesList;
