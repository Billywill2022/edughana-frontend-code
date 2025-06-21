import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';

const SubjectsResources = () => {
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [educationalLevels, setEducationalLevels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsResponse, resourcesResponse, levelsResponse] = await Promise.all([
          contentAPI.getSubjects(),
          contentAPI.getContent(), // Fetch all content initially
          contentAPI.getEducationalLevels()
        ]);
        setSubjects(subjectsResponse.data.subjects);
        setResources(resourcesResponse.data.content);
        setEducationalLevels(levelsResponse.data.educational_levels);
      } catch (err) {
        setError('Failed to load subjects and resources.');
        console.error(err);
      } finally {
        setLoading(false);
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

  const filterResources = () => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject ? resource.subject_id === parseInt(selectedSubject) : true;
      const matchesLevel = selectedLevel ? resource.educational_level_id === parseInt(selectedLevel) : true;
      return matchesSearch && matchesSubject && matchesLevel;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading subjects and resources...</p>
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

  const filteredResources = filterResources();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">Subjects & Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select onValueChange={setSelectedSubject} value={selectedSubject}>
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
        <Select onValueChange={setSelectedLevel} value={selectedLevel}>
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
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground line-clamp-2">{resource.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{getSubjectName(resource.subject_id)} - {getLevelName(resource.educational_level_id)}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{resource.description}</p>
                <Link to={`/resources/${resource.id}`}>
                  <Button variant="outline" className="w-full">
                    View Resource <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground text-lg">
            No resources found matching your criteria.
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-muted-foreground">Want to contribute resources?</p>
        <Link to="/contact">
          <Button variant="link" className="text-primary text-lg">Contact us to become a verified educator</Button>
        </Link>
      </div>
    </div>
  );
};

export default SubjectsResources;


