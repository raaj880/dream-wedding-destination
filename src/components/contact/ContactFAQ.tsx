
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactFAQ: React.FC = () => {
  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">
              How do I delete my account?
            </h4>
            <p className="text-sm text-gray-300">
              You can delete your account from Settings {'->'} Account Settings {'->'} Deactivate Account.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">
              Is my personal information safe?
            </h4>
            <p className="text-sm text-gray-300">
              Yes, we use industry-standard encryption and security measures to protect your data.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">
              How does the matching algorithm work?
            </h4>
            <p className="text-sm text-gray-300">
              Our algorithm considers your preferences, interests, and compatibility factors to suggest suitable matches.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactFAQ;
