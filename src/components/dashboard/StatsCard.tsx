
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  color?: string;
  onClick?: () => void;
  loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  color = 'text-gray-400',
  onClick,
  loading = false
}) => {
  const CardWrapper = onClick ? Button : 'div';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`shadow-sm ${onClick ? 'cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-slate-800 border-slate-700' : ''}`}>
        <CardContent className="p-4 text-center">
          {onClick ? (
            <Button 
              variant="ghost" 
              className="w-full h-auto p-0 flex flex-col items-center space-y-2 hover:bg-transparent group"
              onClick={onClick}
            >
              <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-300`} />
              <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {loading ? '...' : value}
              </div>
              <div className="text-xs font-medium text-muted-foreground group-hover:text-slate-300 transition-colors duration-300">{title}</div>
              <div className="text-xs text-muted-foreground group-hover:text-slate-300 transition-colors duration-300">{description}</div>
            </Button>
          ) : (
            <>
              <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-foreground">
                {loading ? '...' : value}
              </div>
              <div className="text-xs font-medium text-muted-foreground">{title}</div>
              <div className="text-xs text-muted-foreground">{description}</div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
