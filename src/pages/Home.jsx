import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Users, 
  Star,
  Play,
  Download,
  TrendingUp,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { contentAPI, newsAPI } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import '../App.css';

const Home = () => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [stats, setStats] = useState({
    totalContent: 0,
    totalUsers: 0,
    totalAssessments: 0,
    successRate: 0
  });
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedContent();
    fetchFeaturedNews();
    fetchStats();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      const response = await contentAPI.getContent({ 
        per_page: 6, 
        status: 'approved',
        is_premium: false 
      });
      setFeaturedContent(response.data.content || []);
    } catch (error) {
      console.error('Failed to fetch featured content:', error);
    }
  };

  const fetchFeaturedNews = async () => {
    try {
      const response = await newsAPI.getFeaturedNews({ limit: 3 });
      setFeaturedNews(response.data.featured_news || []);
    } catch (error) {
      console.error('Failed to fetch featured news:', error);
    }
  };

  const fetchStats = async () => {
    // Mock stats for now - in real app, these would come from API
    setStats({
      totalContent: 1500,
      totalUsers: 25000,
      totalAssessments: 500,
      successRate: 92
    });
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'Complete educational resources for Basic, JHS, SHS, and Tertiary levels aligned with Ghana\'s approved curriculum.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Trophy,
      title: 'Assessment Center',
      description: 'Mock exams, practice tests, and quizzes to help students prepare for their examinations effectively.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Teacher Resources',
      description: 'Comprehensive teaching materials, lesson plans, and professional development resources for educators.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: GraduationCap,
      title: 'Licensure Prep',
      description: 'Specialized content for GES and GHS licensure examinations and professional development.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const educationalLevels = [
    {
      title: 'Basic Education',
      description: 'Kindergarten to Primary 6',
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies'],
      href: '/curriculum/basic'
    },
    {
      title: 'Junior High School',
      description: 'JHS Forms 1-3',
      subjects: ['Core Mathematics', 'English Language', 'Integrated Science', 'ICT'],
      href: '/curriculum/jhs'
    },
    {
      title: 'Senior High School',
      description: 'SHS Forms 1-3',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Economics'],
      href: '/curriculum/shs'
    },
    {
      title: 'Tertiary Education',
      description: 'Universities & Colleges',
      subjects: ['Research Methods', 'Educational Psychology', 'Advanced Topics'],
      href: '/curriculum/tertiary'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 ghana-gradient opacity-10"></div>
        <div className="absolute inset-0 kente-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Ghana's Premier
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Educational Platform
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive curriculum resources, assessments, and teaching materials 
              for all educational levels in Ghana.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {isAuthenticated ? (
                <Button 
                  size="lg" 
                  onClick={() => navigate('/dashboard')}
                  className="text-lg px-8 py-6 group"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/register')}
                    className="text-lg px-8 py-6 group"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate('/curriculum')}
                    className="text-lg px-8 py-6 group"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    Explore Content
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stats.totalContent.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary">{stats.totalUsers.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">{stats.totalAssessments}+</div>
                <div className="text-sm text-muted-foreground">Assessments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stats.successRate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive educational resources designed to support learning and teaching 
              at every level of Ghana's education system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Educational Levels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Curriculum by Educational Level
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Structured learning paths aligned with Ghana's educational system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationalLevels.map((level, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate(level.href)}>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {level.title}
                  </CardTitle>
                  <CardDescription>{level.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {level.subjects.map((subject, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Explore Level
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      {featuredContent.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Featured Content
                </h2>
                <p className="text-xl text-muted-foreground">
                  Popular resources from our educational library
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate('/curriculum')}>
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredContent.slice(0, 6).map((content) => (
                <Card key={content.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate(`/content/${content.id}`)}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {content.educational_level?.name}
                      </Badge>
                      {content.is_premium && (
                        <Badge className="text-xs bg-accent text-accent-foreground">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {content.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {content.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{content.subject?.name}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{content.view_count}</span>
                        </div>
                        {content.is_downloadable && (
                          <Download className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Latest News & Updates
                </h2>
                <p className="text-xl text-muted-foreground">
                  Stay informed with the latest from Ghana's education sector
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate('/news')}>
                View All News
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredNews.map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate(`/news/${article.slug}`)}>
                  {article.featured_image_url && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={article.featured_image_url} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {article.category?.replace('_', ' ')}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(article.published_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.summary}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students and teachers who are already using EduGhana 
            to achieve their educational goals.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/register')}
                className="text-lg px-8 py-6"
              >
                Start Learning Today
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/curriculum')}
                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Browse Content
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

