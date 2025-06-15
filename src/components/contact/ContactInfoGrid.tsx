
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6 text-blue-400" />,
    title: "Email Us",
    details: "support@wedder.com",
    description: "Send us an email anytime"
  },
  {
    icon: <Phone className="w-6 h-6 text-blue-400" />,
    title: "Call Us",
    details: "+91 80-1234-5678",
    description: "Mon-Fri from 9am to 6pm"
  },
  {
    icon: <MapPin className="w-6 h-6 text-green-400" />,
    title: "Visit Us",
    details: "Bangalore, Karnataka, India",
    description: "Come say hello at our office"
  },
  {
    icon: <Clock className="w-6 h-6 text-purple-400" />,
    title: "Business Hours",
    details: "Mon-Fri: 9am-6pm IST",
    description: "Weekend support available"
  }
];

const ContactInfoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      {contactInfo.map((info, index) => (
        <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border-gray-700 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {info.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {info.title}
                </h3>
                <p className="text-lg font-medium text-gray-200 mb-1">
                  {info.details}
                </p>
                <p className="text-sm text-gray-400">
                  {info.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContactInfoGrid;
