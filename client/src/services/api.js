import axios from 'axios';

// Automatically determine base API URL for local development and deployed instances
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    let url = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
    if (!url.endsWith('/api')) {
      url = `${url}/api`;
    }
    return url;
  }

  // If running in local development
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1')
  ) {
    return 'http://localhost:5000/api';
  }

  // Deployed Render backend fallback
  return 'https://project-pulse-f162.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Authorization Bearer token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('projectpulse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthenticated responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is invalid or expired
    if (error.response && error.response.status === 401) {
      // Don't clear token on login/register attempt failures
      const isAuthEndpoint = error.config.url.includes('/auth/login') || error.config.url.includes('/auth/register');
      if (!isAuthEndpoint) {
        localStorage.removeItem('projectpulse_token');
        localStorage.removeItem('projectpulse_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
