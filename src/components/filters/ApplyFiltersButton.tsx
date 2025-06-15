
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ApplyFiltersButtonProps {
  onClick: () => void;
}

const ApplyFiltersButton: React.FC<ApplyFiltersButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <Button
          onClick={onClick}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Apply Filters & Find Matches
        </Button>
      </motion.div>
    </div>
  );
};

export default ApplyFiltersButton;
