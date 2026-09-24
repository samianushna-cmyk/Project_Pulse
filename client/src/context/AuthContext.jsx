import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('projectpulse_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('projectpulse_token') || null;
  });

  const [loading, setLoading] = useState(true);

  // Helper to determine dashboard path based on role
  const getDashboardPath = (role) => {
    switch (role?.toLowerCase()) {
      case 'leader':
        return '/leader/dashboard';
      case 'faculty':
        return '/faculty/dashboard';
      case 'student':
      default:
        return '/student/dashboard';
    }
  };

  // Restore & verify session on application startup
  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('projectpulse_token');
      if (storedToken) {
        try {
          const { data } = await api.get('/auth/me');
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('projectpulse_user', JSON.stringify(data.user));
          }
        } catch (error) {
          console.warn('[AuthContext] Session expired or invalid, logging out.');
          localStorage.removeItem('projectpulse_token');
          localStorage.removeItem('projectpulse_user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  // Register / Sign up
  const signup = async (formData) => {
    try {
      const { data } = await api.post('/auth/register', formData);
      if (data.success && data.token && data.user) {
        localStorage.setItem('projectpulse_token', data.token);
        localStorage.setItem('projectpulse_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return { success: true, user: data.user, role: data.user.role };
      }
      throw new Error(data.message || 'Registration failed');
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  // Login
  const login = async (formData) => {
    try {
      const { data } = await api.post('/auth/login', formData);
      if (data.success && data.token && data.user) {
        localStorage.setItem('projectpulse_token', data.token);
        localStorage.setItem('projectpulse_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return { success: true, user: data.user, role: data.user.role };
      }
      throw new Error(data.message || 'Login failed');
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Invalid credentials';
      return { success: false, error: message };
    }
  };

  // Update current user state and sync with localStorage
  const updateUser = (userData) => {
    if (!userData) return;
    setUser((prev) => {
      const updated = { ...prev, ...userData };
      localStorage.setItem('projectpulse_user', JSON.stringify(updated));
      return updated;
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('projectpulse_token');
    localStorage.removeItem('projectpulse_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    login,
    signup,
    logout,
    updateUser,
    getDashboardPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
