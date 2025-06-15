
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FilterCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  contentClassName?: string;
}

const FilterCard: React.FC<FilterCardProps> = ({ title, children, delay = 0, contentClassName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className={`pt-0 ${contentClassName || ''}`}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilterCard;
