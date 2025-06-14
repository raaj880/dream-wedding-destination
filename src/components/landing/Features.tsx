
import React from 'react';
import { Heart, Shield, Ring } from 'lucide-react'; // Using Ring for WeddingRings for simplicity, can be replaced with WeddingRings if available

const featuresData = [
  {
    icon: <Heart className="w-12 h-12 text-soft-pink fill-soft-pink" />,
    title: 'Swipe to Match',
    description: 'Like what you see? Swipe right to connect with serious matches.',
  },
  {
    icon: <Shield className="w-12 h-12 text-deep-blue" />,
    title: 'Verified Profiles',
    description: 'All profiles go through a multi-layer verification process.',
  },
  {
    icon: <Ring className="w-12 h-12 text-soft-pink" />, // Using Ring icon, can change to custom if needed
    title: 'Built for Marriage, not Dating',
    description: 'No casual flings. Just real people with marriage intent.',
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-deep-blue text-center mb-16">
          Why Wedder Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-deep-blue mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
