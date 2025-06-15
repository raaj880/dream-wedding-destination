
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface VerifiedFilterProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const VerifiedFilter: React.FC<VerifiedFilterProps> = ({ checked, onCheckedChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.7 }}
    >
      <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <Label className="text-lg font-semibold text-foreground">
                  Verified Profiles Only
                </Label>
                <p className="text-sm text-muted-foreground">Show only identity-verified profiles</p>
              </div>
            </div>
            <Switch
              checked={checked}
              onCheckedChange={onCheckedChange}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VerifiedFilter;
