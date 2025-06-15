
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FilterStatusBannerProps {
  hasActiveFilters: boolean;
}

const FilterStatusBanner: React.FC<FilterStatusBannerProps> = ({ hasActiveFilters }) => {
  if (!hasActiveFilters) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
    >
      <Card className="bg-dusky-rose/10 border-dusky-rose/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground">🎯 Search filters are active</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/filter" className="text-foreground text-xs">
                Manage Filters
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilterStatusBanner;
