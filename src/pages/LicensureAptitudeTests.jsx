import React, { useState, useEffect } from 'react';
import { assessmentAPI, contentAPI } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Award, Clock, BookOpen } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const LicensureAptitudeTests = () => {
  const [tests, setTests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [educationalLevels, setEducationalLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [testType, setTestType] = useState('all'); // 'licensure_exam', 'aptitude_test', 'all'

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching licensure and aptitude tests data...');
        const [testsResponse, subjectsResponse, levelsResponse] = await Promise.all([
          assessmentAPI.getAssessments({ assessment_type: testType === 'all' ? null : testType }),
          contentAPI.getSubjects(),
          contentAPI.getEducationalLevels()
        ]);
        console.log('Tests API response:', testsResponse.data);
        console.log('Subjects API response:', subjectsResponse.data);
        console.log('Educational Levels API response:', levelsResponse.data);

        setTests(testsResponse.data.assessments);
        setSubjects(subjectsResponse.data.subjects);
        setEducationalLevels(levelsResponse.data.educational_levels);
        console.log('State updated: tests, subjects, educationalLevels');
      } catch (err) {
        console.error('Error fetching tests data:', err);
        setError('Failed to load tests. Please try again later.');
      } finally {
        setLoading(false);
        console.log('Loading state set to false.');
      }
    };
    fetchData();
  }, [testType]); // Refetch when testType changes

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };

  const getLevelName = (levelId) => {
    const level = educationalLevels.find(l => l.id === levelId);
    return level ? level.name : 'Unknown Level';
  };

  const filteredTests = Array.isArray(tests) ? tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject ? test.subject_id === parseInt(selectedSubject) : true;
    const matchesLevel = selectedLevel ? test.educational_level_id === parseInt(selectedLevel) : true;
    console.log(`Test: ${test.title}, matchesSearch: ${matchesSearch}, matchesSubject: ${matchesSubject}, matchesLevel: ${matchesLevel}`);
    return matchesSearch && matchesSubject && matchesLevel;
  }) : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  console.log('Filtered tests for rendering:', filteredTests);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">Licensure & Aptitude Tests</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tests..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select onValueChange={setSelectedSubject} value={selectedSubject || ''}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Subjects</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject.id} value={subject.id.toString()}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedLevel} value={selectedLevel || ''}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Levels</SelectItem>
            {educationalLevels.map(level => (
              <SelectItem key={level.id} value={level.id.toString()}>
                {level.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setTestType} value={testType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Test Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="licensure_exam">Licensure Exams</SelectItem>
            <SelectItem value="aptitude_test">Aptitude Tests</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.length > 0 ? (
          filteredTests.map(test => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground line-clamp-2">{test.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{getSubjectName(test.subject_id)} - {getLevelName(test.educational_level_id)}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{test.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration_minutes || 'N/A'} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{test.num_questions || 'N/A'} Questions</span>
                  </div>
                </div>
                <Link to={`/tests/${test.id}`}>
                  <Button variant="default" className="w-full">
                    Start Test
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground text-lg">
            No licensure or aptitude tests found matching your criteria.
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-muted-foreground">Are you an organization or institution looking to offer aptitude or licensure exams?</p>
        <Link to="/contact">
          <Button variant="link" className="text-primary text-lg">Contact us to partner</Button>
        </Link>
      </div>
    </div>
  );
};

export default LicensureAptitudeTests;

