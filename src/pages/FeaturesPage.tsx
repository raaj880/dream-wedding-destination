
import React from 'react';
import { Heart, Shield, Gem, Users, MessageCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeaturesPage: React.FC = () => {
  const mainFeatures = [
    {
      icon: <Heart className="w-12 h-12 text-soft-pink fill-soft-pink" />,
      title: 'Swipe to Match',
      description: 'Like what you see? Swipe right to connect with serious matches.',
      details: 'Our intuitive swipe interface makes finding your perfect match fun and effortless. Swipe right on profiles that interest you and get notified instantly when you match!'
    },
    {
      icon: <Shield className="w-12 h-12 text-deep-blue" />,
      title: 'Verified Profiles',
      description: 'All profiles go through a multi-layer verification process.',
      details: 'We verify phone numbers, photos, and identity documents to ensure authentic profiles. Your safety and trust are our top priorities.'
    },
    {
      icon: <Gem className="w-12 h-12 text-soft-pink" />,
      title: 'Built for Marriage, not Dating',
      description: 'No casual flings. Just real people with marriage intent.',
      details: 'Every user on Wedder is looking for a serious relationship leading to marriage. No time wasters, just genuine connections.'
    },
    {
      icon: <Users className="w-12 h-12 text-deep-blue" />,
      title: 'Smart Matching Algorithm',
      description: 'AI-powered matching based on compatibility and preferences.',
      details: 'Our advanced algorithm considers your preferences, values, and lifestyle to suggest the most compatible matches for you.'
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-soft-pink" />,
      title: 'Secure Messaging',
      description: 'Chat safely with your matches in our secure environment.',
      details: 'End-to-end encrypted messaging ensures your conversations remain private and secure. Get to know each other before meeting in person.'
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-deep-blue" />,
      title: 'Family Integration',
      description: 'Involve your family in the process when you\'re ready.',
      details: 'Share profiles with family members and get their input when you\'re ready to take the next step. Modern approach with traditional values.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Why Wedder Works
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the features that make Wedder the most trusted matrimonial platform for modern Indians seeking meaningful relationships.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-deep-blue dark:text-white mb-2">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  {feature.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {feature.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 dark:from-soft-pink/5 dark:to-deep-blue/5 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-deep-blue dark:text-white text-center mb-8">
            More Features Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-deep-blue dark:text-white mb-2">Video Calls</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect face-to-face with your matches through secure video calls before meeting in person.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-deep-blue dark:text-white mb-2">Compatibility Score</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get detailed compatibility scores based on personality, values, and lifestyle preferences.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-deep-blue dark:text-white mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who have found their perfect match on Wedder.
          </p>
          <a
            href="/auth"
            className="inline-block bg-soft-pink text-deep-blue font-bold rounded-2xl px-8 py-4 text-lg hover:bg-pink-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
