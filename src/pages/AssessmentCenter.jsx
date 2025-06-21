import React, { useState } from 'react';
import { Search, Filter, Clock, BookOpen, Award, Target, Users, Star } from 'lucide-react';

const AssessmentCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Mock data for assessments
  const mockAssessments = [
    {
      id: 1,
      title: 'Mathematics Mock Exam - Form 1',
      description: 'Comprehensive mathematics assessment covering algebra, geometry, and arithmetic',
      subject: 'Mathematics',
      educational_level: 'JHS',
      assessment_type: 'Mock Exam',
      duration: 120,
      questions_count: 50,
      difficulty: 'Medium',
      participants: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: 'English Language Practice Test',
      description: 'Reading comprehension, grammar, and essay writing assessment',
      subject: 'English',
      educational_level: 'SHS',
      assessment_type: 'Practice Test',
      duration: 90,
      questions_count: 40,
      difficulty: 'Hard',
      participants: 980,
      rating: 4.6
    },
    {
      id: 3,
      title: 'Science Quiz - Basic Education',
      description: 'Interactive science quiz covering biology, chemistry, and physics basics',
      subject: 'Science',
      educational_level: 'Basic',
      assessment_type: 'Quiz',
      duration: 45,
      questions_count: 25,
      difficulty: 'Easy',
      participants: 2100,
      rating: 4.9
    },
    {
      id: 4,
      title: 'Social Studies Assessment',
      description: 'Comprehensive test on Ghana\'s history, geography, and civic education',
      subject: 'Social Studies',
      educational_level: 'JHS',
      assessment_type: 'Assessment',
      duration: 75,
      questions_count: 35,
      difficulty: 'Medium',
      participants: 750,
      rating: 4.5
    },
    {
      id: 5,
      title: 'ICT Practical Exam',
      description: 'Hands-on ICT assessment covering computer applications and digital literacy',
      subject: 'ICT',
      educational_level: 'SHS',
      assessment_type: 'Practical Exam',
      duration: 60,
      questions_count: 20,
      difficulty: 'Medium',
      participants: 650,
      rating: 4.7
    },
    {
      id: 6,
      title: 'WASSCE Mathematics Prep',
      description: 'Intensive preparation test for WASSCE mathematics examination',
      subject: 'Mathematics',
      educational_level: 'SHS',
      assessment_type: 'Prep Test',
      duration: 180,
      questions_count: 60,
      difficulty: 'Hard',
      participants: 1800,
      rating: 4.9
    }
  ];

  const subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'ICT'];
  const educationalLevels = ['Basic', 'JHS', 'SHS', 'Tertiary'];
  const assessmentTypes = ['Mock Exam', 'Practice Test', 'Quiz', 'Assessment', 'Practical Exam', 'Prep Test'];

  // Filter assessments based on search and filters
  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || assessment.subject === selectedSubject;
    const matchesLevel = !selectedLevel || assessment.educational_level === selectedLevel;
    const matchesType = !selectedType || assessment.assessment_type === selectedType;
    
    return matchesSearch && matchesSubject && matchesLevel && matchesType;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'Mock Exam': 'bg-blue-100 text-blue-800',
      'Practice Test': 'bg-purple-100 text-purple-800',
      'Quiz': 'bg-green-100 text-green-800',
      'Assessment': 'bg-orange-100 text-orange-800',
      'Practical Exam': 'bg-red-100 text-red-800',
      'Prep Test': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Target className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Assessment Center</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your knowledge with our comprehensive collection of assessments, mock exams, 
            and practice tests designed to help you excel in your studies.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">Assessments</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">25,000+</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">92%</div>
            <div className="text-sm text-gray-600">Pass Rate</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.8/5</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Levels</option>
              {educationalLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              {assessmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <div key={assessment.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(assessment.assessment_type)}`}>
                    {assessment.assessment_type}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                    {assessment.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{assessment.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{assessment.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{assessment.subject} • {assessment.educational_level}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{assessment.duration} minutes • {assessment.questions_count} questions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{assessment.participants.toLocaleString()} participants</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {renderStars(assessment.rating)}
                    <span className="ml-2 text-sm text-gray-600">{assessment.rating}</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Start Assessment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
          <Award className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Ready to Test Your Knowledge?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Challenge yourself with our comprehensive assessments and track your progress 
            as you prepare for your examinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Browse All Assessments
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Create Custom Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCenter;

