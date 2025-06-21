import React, { useState, useEffect } from 'react';
import { Play, GamepadIcon, Calendar, Users, Trophy, Star, Clock, BookOpen, Zap, Heart } from 'lucide-react';

const EducationalEntertainment = () => {
  const [activeTab, setActiveTab] = useState('games');
  const [featuredContent, setFeaturedContent] = useState([]);

  const tabs = [
    { id: 'games', label: 'Educational Games', icon: GamepadIcon },
    { id: 'quizzes', label: 'Interactive Quizzes', icon: Trophy },
    { id: 'events', label: 'Live Events', icon: Calendar },
    { id: 'drama', label: 'Educational Drama', icon: Play },
  ];

  const games = [
    {
      id: 1,
      title: "Math Adventure Quest",
      description: "Embark on an exciting journey through mathematical challenges and puzzles.",
      category: "Mathematics",
      level: "Basic Education",
      players: "1-4 players",
      duration: "15-30 minutes",
      rating: 4.8,
      image: "/api/placeholder/300/200",
      difficulty: "Medium",
      featured: true
    },
    {
      id: 2,
      title: "Science Lab Explorer",
      description: "Conduct virtual experiments and discover the wonders of science.",
      category: "Science",
      level: "JHS",
      players: "1-2 players",
      duration: "20-45 minutes",
      rating: 4.9,
      image: "/api/placeholder/300/200",
      difficulty: "Hard",
      featured: false
    },
    {
      id: 3,
      title: "English Grammar Galaxy",
      description: "Navigate through space while mastering English grammar rules.",
      category: "English",
      level: "SHS",
      players: "1 player",
      duration: "10-25 minutes",
      rating: 4.7,
      image: "/api/placeholder/300/200",
      difficulty: "Easy",
      featured: true
    },
    {
      id: 4,
      title: "History Time Machine",
      description: "Travel through Ghana's rich history and learn about important events.",
      category: "History",
      level: "Basic Education",
      players: "1-6 players",
      duration: "30-60 minutes",
      rating: 4.6,
      image: "/api/placeholder/300/200",
      difficulty: "Medium",
      featured: false
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: "Ghana Independence Quiz",
      description: "Test your knowledge about Ghana's journey to independence.",
      category: "History",
      questions: 25,
      timeLimit: "15 minutes",
      difficulty: "Medium",
      participants: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: "Basic Mathematics Challenge",
      description: "Quick-fire math questions to sharpen your calculation skills.",
      category: "Mathematics",
      questions: 30,
      timeLimit: "20 minutes",
      difficulty: "Easy",
      participants: 2100,
      rating: 4.7
    },
    {
      id: 3,
      title: "Science Trivia Championship",
      description: "Comprehensive science quiz covering physics, chemistry, and biology.",
      category: "Science",
      questions: 40,
      timeLimit: "25 minutes",
      difficulty: "Hard",
      participants: 890,
      rating: 4.9
    }
  ];

  const events = [
    {
      id: 1,
      title: "Virtual Science Fair 2024",
      description: "Join students from across Ghana in showcasing innovative science projects.",
      date: "2024-02-15",
      time: "14:00 GMT",
      duration: "3 hours",
      participants: "500+ expected",
      type: "Competition",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Mathematics Olympiad Prep Session",
      description: "Interactive preparation session for the upcoming Mathematics Olympiad.",
      date: "2024-02-08",
      time: "16:00 GMT",
      duration: "2 hours",
      participants: "200+ registered",
      type: "Workshop",
      status: "upcoming"
    },
    {
      id: 3,
      title: "English Debate Championship",
      description: "Annual debate competition featuring students from all educational levels.",
      date: "2024-01-25",
      time: "10:00 GMT",
      duration: "4 hours",
      participants: "150 participants",
      type: "Competition",
      status: "completed"
    }
  ];

  const dramas = [
    {
      id: 1,
      title: "The Story of Kwame Nkrumah",
      description: "Educational drama depicting the life and achievements of Ghana's first president.",
      duration: "45 minutes",
      ageGroup: "10-18 years",
      subject: "History",
      rating: 4.9,
      views: 15000,
      language: "English/Twi"
    },
    {
      id: 2,
      title: "The Water Cycle Adventure",
      description: "Fun and engaging drama explaining the water cycle through storytelling.",
      duration: "30 minutes",
      ageGroup: "6-12 years",
      subject: "Science",
      rating: 4.8,
      views: 12500,
      language: "English"
    },
    {
      id: 3,
      title: "Mathematical Mysteries",
      description: "Detective story that teaches problem-solving and mathematical concepts.",
      duration: "35 minutes",
      ageGroup: "12-16 years",
      subject: "Mathematics",
      rating: 4.7,
      views: 9800,
      language: "English"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || colors.Medium;
  };

  const getEventStatusColor = (status) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800',
      live: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.upcoming;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'games':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <div key={game.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <GamepadIcon className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                    {game.featured && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{game.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {game.category} • {game.level}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {game.players}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {game.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {renderStars(game.rating)}
                      <span className="ml-2 text-sm text-gray-600">{game.rating}</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Play Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'quizzes':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-medium">{quiz.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-medium">{quiz.timeLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participants:</span>
                    <span className="font-medium">{quiz.participants.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {renderStars(quiz.rating)}
                    <span className="ml-2 text-sm text-gray-600">{quiz.rating}</span>
                  </div>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200">
                    Start Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'events':
        return (
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventStatusColor(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                      <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <div>{new Date(event.date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Time:</span>
                    <div>{event.time}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Duration:</span>
                    <div>{event.duration}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Participants:</span>
                    <div>{event.participants}</div>
                  </div>
                </div>

                <div className="flex justify-end">
                  {event.status === 'upcoming' ? (
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Register Now
                    </button>
                  ) : event.status === 'live' ? (
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                      Join Live
                    </button>
                  ) : (
                    <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                      View Recording
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'drama':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dramas.map((drama) => (
              <div key={drama.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{drama.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{drama.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{drama.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Age Group:</span>
                      <span className="font-medium">{drama.ageGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subject:</span>
                      <span className="font-medium">{drama.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Language:</span>
                      <span className="font-medium">{drama.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Views:</span>
                      <span className="font-medium">{drama.views.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {renderStars(drama.rating)}
                      <span className="ml-2 text-sm text-gray-600">{drama.rating}</span>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Educational Entertainment</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make learning fun and engaging with our collection of educational games, interactive quizzes, 
            live events, and educational dramas designed to enhance your educational experience.
          </p>
        </div>

        {/* Featured Content Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg mb-8 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">🎮 Featured This Week</h2>
              <p className="text-purple-100 mb-4">
                Join thousands of students in our most popular educational games and activities!
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>25,000+ Active Players</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>98% Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Explore Featured
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 mx-2 mb-2 rounded-lg font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {renderTabContent()}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Make Learning Fun?</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Join our community of learners and educators who are transforming education through 
            interactive and engaging content. Start your educational entertainment journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Create Account
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors duration-200">
              Browse as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalEntertainment;

