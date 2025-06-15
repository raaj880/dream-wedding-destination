
import React from 'react';
import { Shield, Eye, Lock, Users, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();
  const lastUpdated = "June 14, 2024";

  const sections = [
    {
      title: "Information We Collect",
      icon: <Eye className="w-5 h-5 text-blue-500" />,
      content: [
        "Personal information you provide when creating an account (name, email, phone number, date of birth)",
        "Profile information including photos, preferences, and biographical details",
        "Communication data when you interact with other users",
        "Usage data about how you use our service",
        "Device information and technical data for security purposes"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Users className="w-5 h-5 text-green-500" />,
      content: [
        "To provide and improve our matrimonial services",
        "To match you with compatible partners based on your preferences",
        "To communicate with you about our services and send notifications",
        "To ensure the safety and security of our platform",
        "To comply with legal obligations and resolve disputes"
      ]
    },
    {
      title: "Information Sharing",
      icon: <Shield className="w-5 h-5 text-red-500" />,
      content: [
        "We do not sell your personal information to third parties",
        "Profile information is shared with other users based on your privacy settings",
        "We may share information with service providers who help us operate our platform",
        "We may disclose information when required by law or to protect our rights",
        "In case of a business transfer, your information may be transferred to the new owner"
      ]
    },
    {
      title: "Data Security",
      icon: <Lock className="w-5 h-5 text-purple-500" />,
      content: [
        "We use industry-standard encryption to protect your data",
        "Regular security audits and monitoring of our systems",
        "Secure data storage with limited access controls",
        "Two-factor authentication options for your account",
        "Regular updates to our security measures and protocols"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-deep-blue dark:text-white hover:text-deep-blue/80 dark:hover:text-white/80">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md mb-8">
          <CardContent className="p-8">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At Wedder, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, share, and protect your information when you use our matrimonial services. 
              By using Wedder, you agree to the practices described in this policy.
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
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Your Rights */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md mt-8">
          <CardHeader>
            <CardTitle className="text-deep-blue dark:text-white">Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-deep-blue dark:text-white mb-2">Access Your Data</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You can access and download your personal data at any time through your account settings.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue dark:text-white mb-2">Update Information</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You can update your profile information and preferences at any time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue dark:text-white mb-2">Delete Account</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You can delete your account and all associated data from your settings.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue dark:text-white mb-2">Control Visibility</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manage who can see your profile and contact you through privacy settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 dark:from-soft-pink/5 dark:to-deep-blue/5 border-0 shadow-md mt-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-deep-blue dark:text-white mb-4">
              Questions About Our Privacy Policy?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you have any questions about this Privacy Policy or how we handle your data, please contact us.
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>Email: privacy@wedder.com</p>
              <p>Phone: +91 80-1234-5678</p>
              <p>Address: Bangalore, Karnataka, India</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
