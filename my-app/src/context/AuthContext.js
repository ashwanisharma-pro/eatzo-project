import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app start if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.success) {
          setUser(res.data.data);
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to load user', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });

    if (res.data && res.data.success) {
      const { token, user: userData } = res.data.data || {};

      if (token) {
        localStorage.setItem('token', token);
      }
      setUser(userData || res.data.data);

      return res.data;
    }

    return null;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });

    if (res.data && res.data.success) {
      const { token, user: userData } = res.data.data || {};

      if (token) {
        localStorage.setItem('token', token);
      }
      setUser(userData || res.data.data);

      return res.data;
    }

    return null;
  };

  const loginWithMockGoogle = () => {
    const mockUser = {
      _id: 'google_user_123',
      name: 'Google User',
      email: 'user@google.com',
    };
    const mockToken = 'mock_google_token_abc123';

    localStorage.setItem('token', mockToken);
    setUser(mockUser);

    return { success: true, data: { user: mockUser, token: mockToken } };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loginWithMockGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};