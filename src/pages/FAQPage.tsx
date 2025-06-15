
import React from 'react';
import { HelpCircle, Search, MessageCircle, Shield, Heart, Users, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const faqCategories = [
    {
      title: 'Getting Started',
      icon: <HelpCircle className="w-6 h-6" />,
      questions: [
        {
          question: 'How do I create a profile on Wedder?',
          answer: 'Creating a profile is simple! Click "Join Now" on our homepage, provide your email and create a password. Then complete our step-by-step profile setup wizard with your photos, basic details, preferences, and a brief bio about yourself.'
        },
        {
          question: 'Is Wedder free to use?',
          answer: 'Yes, Wedder is free to join, create a profile, and browse matches. We offer optional premium features for an enhanced experience, including unlimited swipes, advanced filters, and priority customer support.'
        },
        {
          question: 'What age group is Wedder designed for?',
          answer: 'Wedder is specifically designed for Gen Z and Millennials (ages 22-40) who are serious about finding a life partner for marriage. Our platform caters to modern Indians who want a contemporary approach to matrimony.'
        }
      ]
    },
    {
      title: 'Matching & Communication',
      icon: <Heart className="w-6 h-6" />,
      questions: [
        {
          question: 'How does the matching algorithm work?',
          answer: 'Our AI-powered algorithm considers multiple factors including your preferences for age, location, religion, education, lifestyle choices, and values. We also analyze compatibility based on your answers to personality questions and relationship goals.'
        },
        {
          question: 'What happens when I match with someone?',
          answer: 'When you both swipe right on each other, you\'ll get a match notification! You can then start chatting through our secure messaging system. Take your time to get to know each other before deciding to meet in person.'
        },
        {
          question: 'Can I video call my matches?',
          answer: 'Yes! Once you\'ve been chatting for a while and feel comfortable, you can initiate secure video calls within the app. This helps you connect face-to-face before meeting in person.'
        }
      ]
    },
    {
      title: 'Safety & Privacy',
      icon: <Shield className="w-6 h-6" />,
      questions: [
        {
          question: 'How does Wedder verify profiles?',
          answer: 'We have a multi-layer verification process that includes phone number verification, photo verification using AI, and optional identity document verification. Verified profiles get a blue checkmark badge.'
        },
        {
          question: 'Is my data safe on Wedder?',
          answer: 'Absolutely. We use industry-standard encryption to protect your personal information. Your data is stored securely, and we never sell your information to third parties. You have full control over your privacy settings and profile visibility.'
        },
        {
          question: 'How do I report inappropriate behavior?',
          answer: 'We take safety seriously. You can report any inappropriate behavior by clicking the report button on any profile or message. Our moderation team reviews all reports within 24 hours and takes appropriate action.'
        }
      ]
    },
    {
      title: 'Family & Cultural Values',
      icon: <Users className="w-6 h-6" />,
      questions: [
        {
          question: 'Can families be involved in the process?',
          answer: 'While Wedder empowers individuals to find their partners, we understand the importance of family in Indian marriages. Users can choose to share profiles and involve family members at their discretion when they feel ready.'
        },
        {
          question: 'How is Wedder different from other matrimonial apps?',
          answer: 'Wedder focuses on a modern, intuitive swipe-based experience specifically for Gen Z and Millennials serious about marriage. We prioritize verified profiles, meaningful connections, and a balance of individual choice with family values.'
        },
        {
          question: 'Do you support different religions and communities?',
          answer: 'Yes! Wedder welcomes users from all religions, communities, and backgrounds. You can set preferences for religion and community in your profile, and our matching algorithm will respect these preferences.'
        }
      ]
    },
    {
      title: 'Premium Features',
      icon: <Search className="w-6 h-6" />,
      questions: [
        {
          question: 'What premium features do you offer?',
          answer: 'Premium members get unlimited swipes, advanced search filters, priority customer support, read receipts for messages, and the ability to see who liked their profile before matching.'
        },
        {
          question: 'How much does premium cost?',
          answer: 'We offer flexible premium plans starting from ₹999/month, ₹2499/3 months, or ₹4999/year. Premium features help you find your perfect match faster with enhanced visibility and advanced tools.'
        },
        {
          question: 'Can I cancel my premium subscription?',
          answer: 'Yes, you can cancel your premium subscription at any time from your account settings. If you cancel, you\'ll continue to have premium access until the end of your current billing period.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-blue/10 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-deep-blue dark:text-white hover:text-deep-blue/80 dark:hover:text-white/80">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about using Wedder. Can't find what you're looking for? Contact our support team!
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-deep-blue dark:text-white">
                  {category.icon}
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem key={questionIndex} value={`${categoryIndex}-${questionIndex}`}>
                      <AccordionTrigger className="text-left text-deep-blue dark:text-white hover:text-deep-blue/80">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 dark:from-soft-pink/5 dark:to-deep-blue/5 rounded-2xl p-8 mt-16">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-deep-blue dark:text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-deep-blue dark:text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our friendly support team is here to help! We typically respond to all inquiries within 24 hours.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-deep-blue dark:text-white mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">support@wedder.com</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-deep-blue dark:text-white mb-2">Phone Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">+91 80-1234-5678</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-deep-blue dark:text-white mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Available 9 AM - 9 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
