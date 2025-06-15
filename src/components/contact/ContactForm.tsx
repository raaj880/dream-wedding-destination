
import React from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactForm: React.FC = () => {
  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">Send us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-white">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-white">
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
            <Label htmlFor="email" className="text-white">
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
            <Label htmlFor="subject" className="text-white">
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="What is this regarding?"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-white">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us how we can help you..."
              rows={6}
              className="mt-1"
            />
          </div>

          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
