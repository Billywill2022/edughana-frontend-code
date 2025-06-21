import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './hooks/useAuth.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CurriculumByLevel from './pages/CurriculumByLevel';
import SubjectsResources from './pages/SubjectsResources';
import AssessmentCenter from './pages/AssessmentCenter';
import LessonNotes from './pages/LessonNotes';
import LicensureAptitudeTests from './pages/LicensureAptitudeTests';
import NewsAlerts from './pages/NewsAlerts'; // Import the new component
import EducationalEntertainment from './pages/EducationalEntertainment';
import SubscriptionPlans from './pages/SubscriptionPlans';
import ContactSupport from './pages/ContactSupport';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/curriculum" element={<CurriculumByLevel />} />
                <Route path="/subjects-resources" element={<SubjectsResources />} />
                <Route path="/assessments" element={<AssessmentCenter />} />
                <Route path="/lesson-notes" element={<LessonNotes />} />
                <Route path="/licensure-aptitude-tests" element={<LicensureAptitudeTests />} />
                <Route path="/news" element={<NewsAlerts />} /> {/* Add the new route here */}
                <Route path="/entertainment" element={<EducationalEntertainment />} />
                <Route path="/subscription" element={<SubscriptionPlans />} />
                <Route path="/about" element={<div className="p-8 text-center">About page coming soon...</div>} />
                <Route path="/contact" element={<ContactSupport />} />
                <Route path="/profile" element={<div className="p-8 text-center">Profile page coming soon...</div>} />
                <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;


