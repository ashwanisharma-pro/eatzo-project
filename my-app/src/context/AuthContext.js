import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if(res.data && res.data.success) {
            setUser(res.data.data);
          }
        } catch (error) {
          console.error('Failed to load user', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if(res.data && res.data.success) {
      localStorage.setItem('token', res.data.data.token);
      setUser(res.data.data);
      return res.data;
    }
    return null;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    if(res.data && res.data.success) {
      localStorage.setItem('token', res.data.data.token);
      setUser(res.data.data);
      return res.data;
    }
    return null;
  };

  const loginWithMockGoogle = () => {
    const mockUser = {
      _id: 'google_user_123',
      name: 'Google User',
      email: 'user@google.com',
      token: 'mock_google_token_abc123'
    };
    localStorage.setItem('token', mockUser.token);
    setUser(mockUser);
    return { success: true, data: mockUser };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithMockGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
