
import React from 'react';
import { Heart, Shield, Gem } from 'lucide-react'; // Changed Ring to Gem

const featuresData = [
  {
    icon: <Heart className="w-12 h-12 text-primary fill-primary" />,
    title: 'Swipe to Match',
    description: 'Like what you see? Swipe right to connect with serious matches.',
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: 'Verified Profiles',
    description: 'All profiles go through a multi-layer verification process.',
  },
  {
    icon: <Gem className="w-12 h-12 text-primary" />, // Changed Ring to Gem
    title: 'Built for Marriage, not Dating',
    description: 'No casual flings. Just real people with marriage intent.',
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
          Why Wedder Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
