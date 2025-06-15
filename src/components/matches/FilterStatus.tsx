
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Users, Settings, AlertCircle, Search } from 'lucide-react';

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
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-r from-soft-pink/20 via-white to-deep-blue/10 border-2 border-soft-pink/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Compact Icon Container */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-soft-pink/30 to-deep-blue/20 rounded-lg flex items-center justify-center shadow-sm">
                  <Filter className="w-4 h-4 text-deep-blue" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-soft-pink rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-deep-blue leading-none">!</span>
                </div>
              </div>
              
              {/* Compact Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold text-base text-deep-blue">Filters Active</h3>
                  <div className="flex items-center space-x-1 bg-white/80 rounded-full px-2 py-0.5 shadow-sm">
                    <Users className="w-3 h-3 text-deep-blue" />
                    <span className="text-xs font-semibold text-deep-blue">
                      {filteredCount} {filteredCount === 1 ? 'match' : 'matches'}
                    </span>
                  </div>
                </div>
                
                {/* Compact Status Message */}
                <div className="flex items-start space-x-1.5">
                  {filteredCount === 0 ? (
                    <>
                      <AlertCircle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-700 font-medium">
                          No matches found with current filters
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Try adjusting your preferences
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Search className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-700 font-medium">
                          Showing {filteredCount} profile{filteredCount !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Great! Your filters are working
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Compact Action Button */}
            <div className="flex flex-col space-y-1 flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="bg-white/90 text-deep-blue border-deep-blue/30 hover:bg-deep-blue hover:text-white transition-all duration-200 shadow-sm hover:shadow-md px-3 py-1.5 h-auto text-xs"
              >
                <Link to="/filter" className="flex items-center space-x-1">
                  <Settings className="w-3 h-3" />
                  <span className="font-medium">Adjust</span>
                </Link>
              </Button>
              
              {filteredCount === 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild 
                  className="text-xs text-soft-pink hover:text-deep-blue hover:bg-soft-pink/20 px-2 py-1 h-auto"
                >
                  <Link to="/swipe">
                    View All
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          {/* Compact Progress indicator */}
          {filteredCount > 0 && (
            <div className="mt-3 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Filter effectiveness</span>
                <span className="font-medium text-deep-blue">
                  {filteredCount > 10 ? 'Excellent' : filteredCount > 5 ? 'Good' : 'Limited'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-gradient-to-r from-soft-pink to-deep-blue h-1 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(100, (filteredCount / 20) * 100)}%` 
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilterStatus;
