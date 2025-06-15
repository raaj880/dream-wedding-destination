
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
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Enhanced Icon Container */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-soft-pink/30 to-deep-blue/20 rounded-xl flex items-center justify-center shadow-md">
                  <Filter className="w-6 h-6 text-deep-blue" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-soft-pink rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-deep-blue">!</span>
                </div>
              </div>
              
              {/* Enhanced Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="font-bold text-lg text-deep-blue">Filters Active</h3>
                  <div className="flex items-center space-x-2 bg-white/80 rounded-full px-3 py-1 shadow-sm">
                    <Users className="w-4 h-4 text-deep-blue" />
                    <span className="text-sm font-semibold text-deep-blue">
                      {filteredCount} {filteredCount === 1 ? 'match' : 'matches'}
                    </span>
                  </div>
                </div>
                
                {/* Enhanced Status Message */}
                <div className="flex items-start space-x-2">
                  {filteredCount === 0 ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700 font-medium">
                          No matches found with current filters
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Try adjusting your preferences to discover more profiles
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700 font-medium">
                          Showing {filteredCount} profile{filteredCount !== 1 ? 's' : ''} matching your preferences
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Perfect! Your filters are helping you find relevant matches
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Enhanced Action Button */}
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="bg-white/90 text-deep-blue border-deep-blue/30 hover:bg-deep-blue hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Link to="/filter" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Adjust</span>
                </Link>
              </Button>
              
              {filteredCount === 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild 
                  className="text-xs text-soft-pink hover:text-deep-blue hover:bg-soft-pink/20"
                >
                  <Link to="/swipe">
                    View All
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          {/* Progress indicator for filtered results */}
          {filteredCount > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Filter effectiveness</span>
                <span className="font-medium text-deep-blue">
                  {filteredCount > 10 ? 'Excellent' : filteredCount > 5 ? 'Good' : 'Limited'}
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-soft-pink to-deep-blue h-1.5 rounded-full transition-all duration-500"
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
