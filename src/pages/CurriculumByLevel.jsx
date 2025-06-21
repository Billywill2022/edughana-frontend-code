import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const CurriculumByLevel = () => {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await contentAPI.getEducationalLevels();
        setLevels(response.data.educational_levels);
      } catch (err) {
        setError('Failed to load educational levels.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading curriculum levels...</p>
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
      <h1 className="text-4xl font-bold text-center text-primary mb-10">Curriculum by Educational Level</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {levels.map((level) => (
          <Card key={level.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                {level.name}
              </CardTitle>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{level.description}</p>
              <Link to={`/curriculum/${level.slug}`}>
                <Button className="w-full">
                  Explore Resources <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-muted-foreground">Can't find what you're looking for?</p>
        <Link to="/contact">
          <Button variant="link" className="text-primary text-lg">Contact Support</Button>
        </Link>
      </div>
    </div>
  );
};

export default CurriculumByLevel;

