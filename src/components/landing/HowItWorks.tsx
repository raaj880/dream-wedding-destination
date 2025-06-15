
import React from 'react';
import { UserPlus, CheckSquare, MessageCircle } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-12 h-12 text-primary mb-4" />,
    title: 'Create Profile',
    description: "Add your details and what you're looking for in a life partner.",
  },
  {
    icon: <CheckSquare className="w-12 h-12 text-primary mb-4" />,
    title: 'Swipe & Match',
    description: 'Browse through meaningful profiles and swipe right on potential connections.',
  },
  {
    icon: <MessageCircle className="w-12 h-12 text-primary mb-4" />,
    title: 'Chat & Connect',
    description: 'Start conversations and take the next step toward marriage.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
          How Wedder Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">{index + 1}. {step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
