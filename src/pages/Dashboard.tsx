
import React from 'react';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useFilters } from '@/hooks/useFilters';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FilterStatusBanner from '@/components/dashboard/FilterStatusBanner';
import QuickActionsGrid from '@/components/dashboard/QuickActionsGrid';
import StatsGrid from '@/components/dashboard/StatsGrid';
import QuickTipsCard from '@/components/dashboard/QuickTipsCard';
import PremiumCTA from '@/components/dashboard/PremiumCTA';

const Dashboard: React.FC = () => {
  const stats = useDashboardStats();
  const { isActive: hasActiveFilters } = useFilters();

  return (
    <div className="min-h-screen bg-tinder-bg">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        <FilterStatusBanner hasActiveFilters={hasActiveFilters} />
        <QuickActionsGrid totalMatches={stats.totalMatches} />
        <StatsGrid stats={stats} />
        <QuickTipsCard />
        <PremiumCTA />
      </div>
    </div>
  );
};

export default Dashboard;
