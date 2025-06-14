
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  onComplete?: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextDisabled = false,
  onComplete,
}) => {
  return (
    <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200 dark:border-gray-700">
      {currentStep > 1 ? (
        <Button variant="outline" onClick={onBack} className="text-deep-blue border-deep-blue hover:bg-deep-blue/10 dark:text-soft-pink dark:border-soft-pink dark:hover:bg-soft-pink/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      ) : (
        <div /> // Placeholder to keep Next button to the right
      )}
      {currentStep < totalSteps ? (
        <Button onClick={onNext} disabled={isNextDisabled} className="bg-deep-blue text-white hover:bg-deep-blue/90 dark:bg-soft-pink dark:text-deep-blue dark:hover:bg-soft-pink/90">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={onComplete} disabled={isNextDisabled} className="bg-green-500 text-white hover:bg-green-600">
          Complete Profile <CheckCircle className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
