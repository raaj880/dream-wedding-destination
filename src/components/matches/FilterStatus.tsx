
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
      <Card className="bg-soft-pink/10 border-soft-pink/20">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-deep-blue">
              🎯 Filters active - showing {filteredCount} matches
            </span>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/filter" className="text-deep-blue text-xs">
                Edit Filters
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilterStatus;
