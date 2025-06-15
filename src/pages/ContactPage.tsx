
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ContactInfoGrid from '@/components/contact/ContactInfoGrid';
import ContactFAQ from '@/components/contact/ContactFAQ';
import ContactForm from '@/components/contact/ContactForm';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 pt-6 pb-16 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-white hover:text-white/80">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions or need help? We're here to assist you on your matrimonial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information & FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
            <ContactInfoGrid />
            <ContactFAQ />
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
