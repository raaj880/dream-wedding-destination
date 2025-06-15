
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Users, Settings } from 'lucide-react';

interface FilterStatusProps {
  isActive: boolean;
  filteredCount: number;
}

const FilterStatus: React.FC<FilterStatusProps> = ({ isActive, filteredCount }) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mb-4"
    >
      <Card className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 border-soft-pink/30 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-soft-pink/20 rounded-full flex items-center justify-center">
                <Filter className="w-5 h-5 text-soft-pink" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-deep-blue">Filters Active</span>
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-deep-blue">{filteredCount} matches</span>
                </div>
                <p className="text-sm text-gray-600">
                  {filteredCount === 0 
                    ? "No matches found with current filters" 
                    : `Showing ${filteredCount} profile${filteredCount !== 1 ? 's' : ''} matching your preferences`
                  }
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-deep-blue hover:bg-soft-pink/20">
              <Link to="/filter" className="flex items-center space-x-1">
                <Settings className="w-4 h-4" />
                <span>Adjust</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilterStatus;
