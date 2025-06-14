
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, HelpCircle, Book, MessageCircle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<number[]>([]);

  const helpCategories = [
    {
      icon: <Book className="w-6 h-6 text-blue-500" />,
      title: "Getting Started",
      description: "Learn the basics of using Wedder",
      articles: 12
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      title: "Profile & Matches",
      description: "Managing your profile and finding matches",
      articles: 8
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "Privacy & Safety",
      description: "Keeping your information secure",
      articles: 6
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-purple-500" />,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: 10
    }
  ];

  const faqSections = [
    {
      title: "Account Management",
      questions: [
        {
          question: "How do I create a Wedder account?",
          answer: "To create an account, click 'Join Now' on our homepage, fill in your basic details, verify your email, and complete your profile setup through our guided wizard."
        },
        {
          question: "How can I edit my profile information?",
          answer: "Go to your Profile page and click 'Edit Profile' or visit Settings > Account Settings > Edit Profile Information to make changes to your profile."
        },
        {
          question: "Can I temporarily hide my profile?",
          answer: "Yes, you can hide your profile by going to Settings > Privacy & Security and toggling 'Hide from Search'. This will make your profile invisible to other users."
        }
      ]
    },
    {
      title: "Matching & Communication",
      questions: [
        {
          question: "How does the matching algorithm work?",
          answer: "Our algorithm considers your preferences (age, location, education, profession), lifestyle choices, and compatibility factors to suggest the most suitable matches."
        },
        {
          question: "How do I send a message to a match?",
          answer: "Once you have a mutual match, you can start a conversation by clicking 'Connect' on their profile or going to your Matches page and selecting the person you want to message."
        },
        {
          question: "What should I include in my first message?",
          answer: "Keep it genuine and personal. Mention something from their profile that caught your attention, ask about their interests, and be respectful and authentic."
        }
      ]
    },
    {
      title: "Privacy & Security",
      questions: [
        {
          question: "Is my personal information safe on Wedder?",
          answer: "Yes, we use industry-standard encryption to protect your data. We never share your personal information with third parties without your consent."
        },
        {
          question: "How do I report inappropriate behavior?",
          answer: "You can report any user by clicking the three dots on their profile and selecting 'Report User'. Our team reviews all reports within 24 hours."
        },
        {
          question: "Can I block someone?",
          answer: "Yes, you can block any user by going to their profile, clicking the three dots, and selecting 'Block User'. They won't be able to contact you or see your profile."
        }
      ]
    }
  ];

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to your questions and get the help you need.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-deep-blue dark:text-white text-center mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-deep-blue dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {category.description}
                  </p>
                  <p className="text-soft-pink font-medium text-sm">
                    {category.articles} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-deep-blue dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqSections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-deep-blue dark:text-white">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.questions.map((faq, faqIndex) => {
                      const uniqueIndex = sectionIndex * 100 + faqIndex;
                      const isOpen = openSections.includes(uniqueIndex);
                      
                      return (
                        <Collapsible key={faqIndex} open={isOpen} onOpenChange={() => toggleSection(uniqueIndex)}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <span className="font-medium text-deep-blue dark:text-white">
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-500" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 dark:from-soft-pink/5 dark:to-deep-blue/5 border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-deep-blue dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Button className="bg-deep-blue text-white hover:bg-deep-blue/90 dark:bg-soft-pink dark:text-deep-blue dark:hover:bg-soft-pink/90">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenterPage;
