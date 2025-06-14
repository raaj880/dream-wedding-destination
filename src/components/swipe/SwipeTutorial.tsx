
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, X, Star, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

interface SwipeTutorialProps {
  onComplete: () => void;
}

const SwipeTutorial: React.FC<SwipeTutorialProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Discover!",
      content: "Find your perfect match by swiping through profiles",
      icon: "👋",
      action: null
    },
    {
      title: "Swipe Right to Like",
      content: "If you're interested, swipe right or tap the heart button",
      icon: "❤️",
      action: <ArrowRight className="w-8 h-8 text-green-500" />
    },
    {
      title: "Swipe Left to Pass",
      content: "Not interested? Swipe left or tap the X button",
      icon: "✕",
      action: <ArrowLeft className="w-8 h-8 text-red-500" />
    },
    {
      title: "Super Like",
      content: "Really interested? Swipe up or tap the star for a Super Like!",
      icon: "⭐",
      action: <ArrowUp className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Get Matched!",
      content: "When someone you liked also likes you back, it's a match!",
      icon: "💕",
      action: null
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const skipTutorial = () => {
    onComplete();
  };

  const step = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">{step.icon}</div>
              
              <h2 className="text-2xl font-bold text-deep-blue mb-4">
                {step.title}
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {step.content}
              </p>

              {step.action && (
                <div className="flex justify-center mb-6">
                  {step.action}
                </div>
              )}

              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={skipTutorial}
                  className="text-gray-500"
                >
                  Skip Tutorial
                </Button>

                <div className="flex space-x-2">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep ? 'bg-deep-blue' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextStep}
                  className="bg-deep-blue text-white"
                >
                  {currentStep === tutorialSteps.length - 1 ? 'Start Swiping!' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SwipeTutorial;
