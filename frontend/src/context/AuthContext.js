import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      if (token) {
        try {
          // Set auth token header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Get user data
          const res = await axios.get('/api/auth/me');
          
          setUser(res.data);
        } catch (err) {
          // If token is invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      
      setLoading(false);
    };

    checkLoggedIn();
  }, [token]);

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Set user
      setUser(res.data.user);
      
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed'
      };
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setToken(null);
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 