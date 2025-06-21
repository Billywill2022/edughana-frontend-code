import React, { useState, useEffect } from 'react';
import { contentAPI } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Download } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const LessonNotes = () => {
  const [lessonNotes, setLessonNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [educationalLevels, setEducationalLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching lesson notes data...');
        const [lessonNotesResponse, subjectsResponse, levelsResponse] = await Promise.all([
          contentAPI.getLessonNotes(),
          contentAPI.getSubjects(),
          contentAPI.getEducationalLevels()
        ]);
        console.log('Lesson Notes API response:', lessonNotesResponse.data);
        console.log('Subjects API response:', subjectsResponse.data);
        console.log('Educational Levels API response:', levelsResponse.data);

        setLessonNotes(lessonNotesResponse.data.content); // Corrected: access 'content' key
        setSubjects(subjectsResponse.data.subjects);
        setEducationalLevels(levelsResponse.data.educational_levels);
        console.log('State updated: lessonNotes, subjects, educationalLevels');
      } catch (err) {
        console.error('Error fetching lesson notes data:', err);
        setError('Failed to load lesson notes. Please try again later.');
      } finally {
        setLoading(false);
        console.log('Loading state set to false.');
      }
    };
    fetchData();
  }, []);

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };

  const getLevelName = (levelId) => {
    const level = educationalLevels.find(l => l.id === levelId);
    return level ? level.name : 'Unknown Level';
  };

  const filteredLessonNotes = Array.isArray(lessonNotes) ? lessonNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject ? note.subject_id === parseInt(selectedSubject) : true;
    const matchesLevel = selectedLevel ? note.educational_level_id === parseInt(selectedLevel) : true;
    return matchesSearch && matchesSubject && matchesLevel;
  }) : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson notes...</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">Lesson Notes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search lesson notes..."
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessonNotes.length > 0 ? (
          filteredLessonNotes.map(note => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground line-clamp-2">{note.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{getSubjectName(note.subject_id)} - {getLevelName(note.educational_level_id)}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{note.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{note.pages || 'N/A'} Pages</span>
                  </div>
                  {note.is_downloadable && (
                    <Button variant="outline" size="sm" onClick={() => window.open(note.file_url, '_blank')} className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </Button>
                  )}
                </div>
                <Link to={`/lesson-notes/${note.id}`}>
                  <Button variant="default" className="w-full">
                    View Lesson Note
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground text-lg">
            No lesson notes found matching your criteria.
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-muted-foreground">Are you an educator? Share your lesson notes with the community!</p>
        <Link to="/contact">
          <Button variant="link" className="text-primary text-lg">Contact us to become a verified educator</Button>
        </Link>
      </div>
    </div>
  );
};

export default LessonNotes;

