
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SettingsLoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export default SettingsLoadingSkeleton;
