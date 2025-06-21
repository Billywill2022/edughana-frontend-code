import React, { useState, useEffect } from 'react';
import { Search, Calendar, Tag, ExternalLink, Bell, Filter } from 'lucide-react';

const NewsAlerts = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [error, setError] = useState(null);

  const categories = [
    'Education Policy',
    'Curriculum Updates',
    'Examination News',
    'Teacher Training',
    'Health Service Updates',
    'Professional Development',
    'Government Announcements',
    'Academic Calendar'
  ];

  const sources = [
    'Ghana Education Service (GES)',
    'Ghana Health Service (GHS)',
    'Ministry of Education',
    'National Teaching Council',
    'West African Examinations Council',
    'National Accreditation Board'
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll use mock data since the API might not be fully set up
      const mockNews = [
        {
          id: 1,
          title: "New Curriculum Guidelines Released for Basic Education",
          content: "The Ghana Education Service has released updated curriculum guidelines for basic education, focusing on improved literacy and numeracy outcomes.",
          category: "Education Policy",
          source: "Ghana Education Service (GES)",
          priority: "high",
          author: "GES Communications",
          created_at: "2024-01-15T10:00:00Z",
          external_url: "https://ges.gov.gh/news/curriculum-update"
        },
        {
          id: 2,
          title: "Teacher Training Workshop Scheduled for February",
          content: "A comprehensive teacher training workshop on modern pedagogical methods will be held across all regions in February 2024.",
          category: "Teacher Training",
          source: "National Teaching Council",
          priority: "medium",
          author: "NTC Admin",
          created_at: "2024-01-10T14:30:00Z",
          external_url: null
        },
        {
          id: 3,
          title: "WASSCE 2024 Registration Opens",
          content: "Registration for the West African Senior School Certificate Examination (WASSCE) 2024 is now open for all eligible candidates.",
          category: "Examination News",
          source: "West African Examinations Council",
          priority: "high",
          author: "WAEC Ghana",
          created_at: "2024-01-08T09:00:00Z",
          external_url: "https://waecgh.org/registration"
        }
      ];
      
      setNews(mockNews);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news. Please try again later.');
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesSource = !selectedSource || item.source === selectedSource;
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return colors[priority] || colors.medium;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading News</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchNews}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Bell className="h-8 w-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">News & Alerts</h1>
          </div>
          <p className="text-lg text-gray-600">
            Stay updated with the latest news from Ghana Education Service, Ghana Health Service, and other professional bodies.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search news and alerts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option value="">All Sources</option>
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No News Found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory || selectedSource 
                ? "No news matches your current filters. Try adjusting your search criteria."
                : "No news articles are currently available. Check back later for updates."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredNews.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(item.priority)}`}>
                          {item.priority?.toUpperCase() || 'MEDIUM'}
                        </span>
                        {item.category && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            <Tag className="h-3 w-3 mr-1" />
                            {item.category}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 mb-4">
                    {item.content}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(item.created_at)}
                    </div>
                    {item.source && (
                      <div className="font-medium text-red-600">
                        {item.source}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      By {item.author || 'Admin'}
                    </div>
                    {item.external_url && (
                      <a
                        href={item.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200"
                      >
                        Read More
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-yellow-500 rounded-lg shadow-lg">
          <div className="px-6 py-8 sm:px-8">
            <div className="text-center">
              <Bell className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Never Miss Important Updates
              </h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest educational news, policy updates, and professional announcements delivered directly to your inbox.
              </p>
              <div className="max-w-md mx-auto flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 border border-transparent rounded-l-lg focus:ring-2 focus:ring-white focus:border-white"
                />
                <button className="px-6 py-2 bg-white text-red-600 font-semibold rounded-r-lg hover:bg-gray-50 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAlerts;

