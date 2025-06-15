
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const ChatSkeleton = () => {
  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header Skeleton */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/matches"><ArrowLeft className="w-6 h-6 text-primary" /></Link>
          </Button>
          <div className="flex items-center space-x-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
        <Skeleton className="w-6 h-6" />
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 px-4 py-6 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
      
      {/* Input Skeleton */}
      <div className="bg-background/80 backdrop-blur-md border-t border-border px-4 py-3 sticky bottom-0">
        <div className="flex items-center space-x-3 max-w-2xl mx-auto">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-10 flex-1 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};
