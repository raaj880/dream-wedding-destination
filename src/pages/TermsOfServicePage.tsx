
import React from 'react';
import { FileText, Scale, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfServicePage: React.FC = () => {
  const lastUpdated = "June 14, 2024";

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      content: `By accessing and using Wedder, you accept and agree to be bound by the terms and provision of this agreement. 
      If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: "Description of Service",
      icon: <Users className="w-5 h-5 text-green-500" />,
      content: `Wedder is a matrimonial platform that connects individuals seeking marriage partners. Our service includes 
      profile creation, matching algorithms, communication tools, and related features to facilitate meaningful connections 
      for matrimonial purposes.`
    },
    {
      title: "User Responsibilities",
      icon: <Scale className="w-5 h-5 text-purple-500" />,
      content: [
        "Provide accurate and truthful information in your profile",
        "Respect other users and communicate appropriately",
        "Do not share false or misleading information",
        "Protect your account credentials and notify us of any unauthorized access",
        "Comply with all applicable laws and regulations",
        "Report any inappropriate behavior or content"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      content: [
        "Creating fake profiles or impersonating others",
        "Harassment, abuse, or threatening behavior toward other users",
        "Sharing inappropriate, offensive, or illegal content",
        "Attempting to bypass security measures or hack the platform",
        "Using the service for commercial purposes without authorization",
        "Spamming or sending unsolicited messages"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please read these terms carefully before using our matrimonial services.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md mb-8">
          <CardContent className="p-8">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to Wedder. These Terms of Service ("Terms") govern your use of our matrimonial platform and services. 
              By creating an account or using our services, you agree to be bound by these Terms. If you disagree with any 
              part of these terms, then you may not access the service.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-deep-blue dark:text-white">
                  {section.icon}
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-deep-blue dark:text-white">Privacy & Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                use, and protect your personal information.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-deep-blue dark:text-white">Account Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We reserve the right to terminate or suspend accounts that violate these terms or engage in 
                inappropriate behavior on our platform.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-deep-blue dark:text-white">Service Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                While we strive for continuous service, we do not guarantee that the service will be uninterrupted 
                or error-free. Maintenance and updates may cause temporary disruptions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-deep-blue dark:text-white">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We may update these Terms from time to time. We will notify users of any significant changes 
                through our platform or email notifications.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 dark:from-soft-pink/5 dark:to-deep-blue/5 border-0 shadow-md mt-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-deep-blue dark:text-white mb-4">
              Questions About These Terms?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you have any questions about these Terms of Service, please don't hesitate to contact us.
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>Email: legal@wedder.com</p>
              <p>Phone: +91 80-1234-5678</p>
              <p>Address: Bangalore, Karnataka, India</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
