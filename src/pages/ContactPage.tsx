import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-deep-blue" />,
      title: "Email Us",
      details: "support@wedder.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-500" />,
      title: "Call Us",
      details: "+91 80-1234-5678",
      description: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-500" />,
      title: "Visit Us",
      details: "Bangalore, Karnataka, India",
      description: "Come say hello at our office"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      title: "Business Hours",
      details: "Mon-Fri: 9am-6pm IST",
      description: "Weekend support available"
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
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions or need help? We're here to assist you on your matrimonial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-deep-blue dark:text-white mb-8">Get in Touch</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-blue dark:text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                          {info.details}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <Card className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 dark:from-soft-pink/5 dark:to-deep-blue/5 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-deep-blue dark:text-white">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-deep-blue dark:text-white mb-2">
                      How do I delete my account?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You can delete your account from Settings {'->'} Account Settings {'->'} Deactivate Account.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-blue dark:text-white mb-2">
                      Is my personal information safe?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Yes, we use industry-standard encryption and security measures to protect your data.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-blue dark:text-white mb-2">
                      How does the matching algorithm work?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Our algorithm considers your preferences, interests, and compatibility factors to suggest suitable matches.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-deep-blue dark:text-white">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-deep-blue dark:text-white">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-deep-blue dark:text-white">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-deep-blue dark:text-white">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-deep-blue dark:text-white">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-deep-blue dark:text-white">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="mt-1"
                    />
                  </div>

                  <Button className="w-full bg-deep-blue text-white hover:bg-deep-blue/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
