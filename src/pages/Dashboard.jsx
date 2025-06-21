import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Trophy, 
  Users, 
  TrendingUp, 
  Calendar,
  Clock,
  Star,
  Award,
  Download,
  Eye,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../hooks/useAuth';
import { contentAPI, assessmentAPI, newsAPI } from '../lib/api';
import '../App.css';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [recentContent, setRecentContent] = useState([]);
  const [recentAssessments, setRecentAssessments] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [stats, setStats] = useState({
    contentViewed: 0,
    assessmentsTaken: 0,
    hoursLearned: 0,
    achievements: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch recent content
      const contentResponse = await contentAPI.getContent({ 
        per_page: 6, 
        status: 'approved' 
      });
      setRecentContent(contentResponse.data.content || []);

      // Fetch recent assessments
      const assessmentResponse = await assessmentAPI.getAssessments({ 
        per_page: 4, 
        status: 'active' 
      });
      setRecentAssessments(assessmentResponse.data.assessments || []);

      // Fetch recent news
      const newsResponse = await newsAPI.getFeaturedNews({ limit: 3 });
      setRecentNews(newsResponse.data.featured_news || []);

      // Mock user stats - in real app, these would come from user activity API
      setStats({
        contentViewed: 45,
        assessmentsTaken: 12,
        hoursLearned: 28,
        achievements: 8
      });

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickActions = [
    {
      title: 'Browse Content',
      description: 'Explore curriculum resources',
      icon: BookOpen,
      href: '/curriculum',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Take Assessment',
      description: 'Practice with mock exams',
      icon: Trophy,
      href: '/assessments',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Read News',
      description: 'Stay updated with education news',
      icon: Users,
      href: '/news',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'View Progress',
      description: 'Track your learning journey',
      icon: TrendingUp,
      href: '/progress',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {getGreeting()}, {user?.first_name}! 👋
              </h1>
              <p className="text-xl text-muted-foreground">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Badge variant="secondary" className="text-sm">
                {user?.user_type?.charAt(0).toUpperCase() + user?.user_type?.slice(1)}
              </Badge>
              {user?.subscription_type === 'premium' && (
                <Badge className="text-sm bg-accent text-accent-foreground">
                  Premium
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{stats.contentViewed}</div>
              <p className="text-sm text-muted-foreground">Content Viewed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-secondary">{stats.assessmentsTaken}</div>
              <p className="text-sm text-muted-foreground">Assessments Taken</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">{stats.hoursLearned}</div>
              <p className="text-sm text-muted-foreground">Hours Learned</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{stats.achievements}</div>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(action.href)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Recent Content</h2>
              <Button variant="outline" onClick={() => navigate('/curriculum')}>
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentContent.slice(0, 4).map((content) => (
                <Card 
                  key={content.id} 
                  className="group hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/content/${content.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {content.title}
                          </h3>
                          {content.is_premium && (
                            <Badge className="text-xs bg-accent text-accent-foreground ml-2">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {content.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{content.subject?.name}</span>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{content.view_count}</span>
                            </div>
                            {content.is_downloadable && (
                              <Download className="w-3 h-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Assessments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Assessments</h3>
                <Button variant="ghost" size="sm" onClick={() => navigate('/assessments')}>
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentAssessments.slice(0, 3).map((assessment) => (
                  <Card 
                    key={assessment.id} 
                    className="group hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/assessments/${assessment.id}`)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Trophy className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {assessment.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{assessment.subject?.name}</span>
                            {assessment.duration_minutes && (
                              <>
                                <span>•</span>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{assessment.duration_minutes}min</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent News */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Latest News</h3>
                <Button variant="ghost" size="sm" onClick={() => navigate('/news')}>
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentNews.map((article) => (
                  <Card 
                    key={article.id} 
                    className="group hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/news/${article.slug}`)}
                  >
                    <CardContent className="p-3">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs capitalize">
                          {article.category?.replace('_', ' ')}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(article.published_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">First Assessment</p>
                      <p className="text-xs text-muted-foreground">Completed your first quiz</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Content Explorer</p>
                      <p className="text-xs text-muted-foreground">Viewed 10+ resources</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

