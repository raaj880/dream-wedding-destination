import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, HelpCircle, Book, MessageCircle, Shield, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useNavigate } from 'react-router-dom';

const HelpCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<number[]>([]);

  const helpCategories = [
    {
      icon: <Book className="w-6 h-6 text-blue-400" />,
      title: "Getting Started",
      description: "Learn the basics of using Wedder",
      articles: 12
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-400" />,
      title: "Profile & Matches",
      description: "Managing your profile and finding matches",
      articles: 8
    },
    {
      icon: <Shield className="w-6 h-6 text-red-400" />,
      title: "Privacy & Safety",
      description: "Keeping your information secure",
      articles: 6
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-purple-400" />,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 pt-6 pb-16 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-white hover:text-white/80">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Help Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
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
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border-gray-700 shadow-lg hover:bg-gray-800/50 transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {category.description}
                  </p>
                  <p className="text-blue-400 font-medium text-sm">
                    {category.articles} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqSections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="bg-gray-800/30 backdrop-blur-sm border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">
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
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-800/60 rounded-lg hover:bg-gray-700/80 transition-colors">
                            <span className="font-medium text-white">
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="p-4 text-gray-300">
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
        <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-300 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenterPage;
