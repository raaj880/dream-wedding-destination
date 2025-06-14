
import React from 'react';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useFilters } from '@/hooks/useFilters';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FilterStatusBanner from '@/components/dashboard/FilterStatusBanner';
import QuickActionsGrid from '@/components/dashboard/QuickActionsGrid';
import StatsGrid from '@/components/dashboard/StatsGrid';
import QuickTipsCard from '@/components/dashboard/QuickTipsCard';
import PremiumCTA from '@/components/dashboard/PremiumCTA';
import TestDataGenerator from '@/components/admin/TestDataGenerator';
import ManualTestDataCreator from '@/components/admin/ManualTestDataCreator';

const Dashboard: React.FC = () => {
  const stats = useDashboardStats();
  const { isActive: hasActiveFilters } = useFilters();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        <FilterStatusBanner hasActiveFilters={hasActiveFilters} />
        <QuickActionsGrid totalMatches={stats.totalMatches} />
        <StatsGrid stats={stats} />
        
        {/* Test Data Generator - Remove this in production */}
        <div className="border-2 border-dashed border-orange-200 p-4 rounded-lg bg-orange-50">
          <h2 className="text-lg font-semibold text-orange-800 mb-4">🧪 Development Tools</h2>
          <div className="space-y-6">
            <TestDataGenerator />
            <div className="border-t border-orange-300 pt-4">
              <h3 className="text-md font-medium text-orange-700 mb-2">Manual User Creation</h3>
              <ManualTestDataCreator />
            </div>
          </div>
        </div>
        
        <QuickTipsCard />
        <PremiumCTA />
      </div>
    </div>
  );
};

export default Dashboard;
