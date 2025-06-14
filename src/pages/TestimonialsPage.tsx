
import React from 'react';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsPage: React.FC = () => {
  const UserPhotoPlaceholder = ({ name }: { name: string }) => (
    <div className="w-16 h-16 rounded-full bg-deep-blue text-white flex items-center justify-center text-xl font-semibold">
      {name.split(' ').map(n => n[0]).join('')}
    </div>
  );

  const detailedTestimonials = [
    {
      name: 'Aditi & Rohan',
      location: 'Mumbai, India',
      quote: "We swiped right in 2024, and now we're planning our wedding! Wedder made it so easy to find someone with the same values and goals. The verification process gave us confidence that we were meeting genuine people.",
      imagePlaceholder: 'AR',
      rating: 5,
      story: "We both were tired of casual dating apps and wanted something serious. Wedder's focus on marriage intent was exactly what we needed."
    },
    {
      name: 'Priya & Sameer',
      location: 'Bangalore, India',
      quote: "Found my soulmate on Wedder! The verified profiles gave us peace of mind. The matching algorithm really works - we had so much in common from day one.",
      imagePlaceholder: 'PS',
      rating: 5,
      story: "What impressed us most was how the app filtered for serious relationships. No time wasters, just people genuinely looking for marriage."
    },
    {
      name: 'Neha & Vikram',
      location: 'Delhi, India',
      quote: "Tired of casual dating apps, Wedder was a breath of fresh air. We connected on shared values and goals. Our families love that we met through such a respectful platform.",
      imagePlaceholder: 'NV',
      rating: 5,
      story: "The family integration feature was amazing. When we were ready, we could involve our parents in the process seamlessly."
    },
    {
      name: 'Kavya & Arjun',
      location: 'Hyderabad, India',
      quote: "Wedder's verification process made us feel safe. We knew everyone was serious about marriage. The chat features helped us get to know each other before meeting.",
      imagePlaceholder: 'KA',
      rating: 5,
      story: "The secure messaging and video call features helped us build trust before our first in-person meeting."
    },
    {
      name: 'Riya & Karthik',
      location: 'Chennai, India',
      quote: "The compatibility matching on Wedder is incredible. We matched on everything from career goals to family values. Planning our engagement for next month!",
      imagePlaceholder: 'RK',
      rating: 5,
      story: "We appreciated how Wedder focused on compatibility beyond just photos. The detailed profiles helped us find a perfect match."
    },
    {
      name: 'Ananya & Rohan',
      location: 'Pune, India',
      quote: "Modern approach with traditional values - that's what we loved about Wedder. Found my life partner in just 2 months! The process was smooth and respectful.",
      imagePlaceholder: 'AR2',
      rating: 5,
      story: "Wedder respected our cultural values while providing a modern platform. Perfect balance for today's generation."
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Successful Matches' },
    { number: '5,000+', label: 'Marriages' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '2.5', label: 'Average Months to Match' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Real Stories. Real Connections.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how Wedder has helped thousands of people find their perfect life partners. These are real stories from real couples who found love on our platform.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-deep-blue dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {detailedTestimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <UserPhotoPlaceholder name={testimonial.imagePlaceholder} />
                  <div className="ml-4">
                    <h3 className="font-semibold text-deep-blue dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.story}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Highlight */}
        <div className="bg-gradient-to-r from-soft-pink/10 to-deep-blue/10 dark:from-soft-pink/5 dark:to-deep-blue/5 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-deep-blue dark:text-white text-center mb-8">
            What Makes Our Success Stories Possible
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-deep-blue dark:text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-deep-blue dark:text-white mb-2">
                Verified Profiles
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every profile is verified for authenticity and serious marriage intent.
              </p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-soft-pink mx-auto mb-4 fill-current" />
              <h3 className="text-xl font-semibold text-deep-blue dark:text-white mb-2">
                Smart Matching
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced algorithms match you based on compatibility and values.
              </p>
            </div>
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-deep-blue dark:text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-deep-blue dark:text-white mb-2">
                Safe Communication
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Secure messaging and video calls to build trust before meeting.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-deep-blue dark:text-white mb-4">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of couples who found their perfect match on Wedder.
          </p>
          <a
            href="/auth"
            className="inline-block bg-soft-pink text-deep-blue font-bold rounded-2xl px-8 py-4 text-lg hover:bg-pink-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
