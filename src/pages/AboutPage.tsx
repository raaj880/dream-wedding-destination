
import React from 'react';
import { Heart, Users, Shield, Award, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-deep-blue" />,
      title: "Authentic Connections",
      description: "We believe in fostering genuine relationships built on trust and compatibility."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Community First",
      description: "Our platform celebrates the diversity and richness of Indian matrimonial traditions."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Privacy & Security",
      description: "Your personal information and privacy are our top priorities."
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: "Quality Matches",
      description: "Advanced algorithms help you find compatible partners based on your preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-blue/10 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 pt-12 pb-16 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-deep-blue dark:text-white hover:text-deep-blue/80 dark:hover:text-white/80">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            About Wedder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            India's modern marriage connection app that bridges tradition with technology to help you find your perfect life partner.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-deep-blue dark:text-white mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                <p className="mb-4">
                  Founded in 2024, Wedder emerged from a simple yet powerful belief: finding your life partner shouldn't be complicated or outdated. We recognized the need for a platform that respects traditional Indian values while embracing modern technology and user experience.
                </p>
                <p className="mb-4">
                  Our founders, having experienced the challenges of traditional matchmaking firsthand, set out to create a solution that puts users in control of their matrimonial journey while maintaining the cultural significance and family involvement that Indian marriages cherish.
                </p>
                <p>
                  Today, Wedder serves thousands of users across India, helping them connect with compatible partners through our innovative matching algorithm and user-friendly interface.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-deep-blue dark:text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-deep-blue dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <Card className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 dark:from-soft-pink/5 dark:to-deep-blue/5 border-0 shadow-lg">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-deep-blue dark:text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To revolutionize the Indian matrimonial experience by creating meaningful connections through technology, while honoring the traditions and values that make Indian marriages special.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
