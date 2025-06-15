
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full px-4 md:px-8 pt-4 pb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-card-gold">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <Progress value={progressPercentage} className="w-full h-2 bg-card-black/20 [&>div]:bg-card-gold" />
    </div>
  );
};

export default ProgressBar;
