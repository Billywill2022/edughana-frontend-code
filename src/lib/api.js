import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  getProfile: () => api.get('/api/auth/profile'),
};

export const contentAPI = {
  getEducationalLevels: () => api.get('/api/content/educational-levels'),
  getSubjects: () => api.get('/api/content/subjects'),
  getResources: (params) => api.get('/api/content/resources', { params }),
  getLessonNotes: (params) => api.get('/api/content/', { params: { ...params, content_type: 'lesson_note' } }),
};

export const assessmentAPI = {
  getAssessments: (params) => api.get('/api/assessments', { params }),
};

export const newsAPI = {
  getFeaturedNews: (params) => api.get('/api/news/featured', { params }),
  getNews: (params) => api.get('/api/news', { params }), // Added this line
};


