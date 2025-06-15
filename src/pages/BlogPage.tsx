import React from 'react';
import { Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Creating an Attractive Matrimonial Profile",
      excerpt: "Learn how to make your profile stand out and attract the right matches with these expert tips.",
      author: "Priya Sharma",
      date: "June 10, 2024",
      category: "Profile Tips",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Understanding Compatibility: Beyond Horoscopes",
      excerpt: "Explore modern approaches to finding compatibility while respecting traditional values.",
      author: "Rajesh Kumar",
      date: "June 8, 2024",
      category: "Relationships",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "First Meeting Etiquette in Arranged Marriages",
      excerpt: "Navigate your first meeting with confidence using these time-tested guidelines.",
      author: "Anita Desai",
      date: "June 5, 2024",
      category: "Dating Tips",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "The Role of Family in Modern Indian Marriages",
      excerpt: "How to balance family involvement with personal choice in today's matrimonial landscape.",
      author: "Vikram Singh",
      date: "June 3, 2024",
      category: "Family & Culture",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Online Safety in Matrimonial Apps",
      excerpt: "Essential safety tips to protect yourself while searching for your life partner online.",
      author: "Dr. Meera Patel",
      date: "May 30, 2024",
      category: "Safety",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Wedding Planning 101: A Complete Guide",
      excerpt: "From engagement to the big day - everything you need to know about planning your Indian wedding.",
      author: "Kavya Reddy",
      date: "May 28, 2024",
      category: "Wedding Planning",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=400&h=250&fit=crop"
    }
  ];

  const categories = ["All", "Profile Tips", "Relationships", "Dating Tips", "Family & Culture", "Safety", "Wedding Planning"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 pt-6 pb-16 max-w-7xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-white hover:text-white/80">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Wedder Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, tips, and stories to help you navigate your matrimonial journey with confidence.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer hover:bg-blue-800/50 transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-gray-800/30 backdrop-blur-sm border-gray-700 shadow-lg hover:bg-gray-800/50 transition-shadow cursor-pointer group">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="text-lg font-semibold text-white line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
