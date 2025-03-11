import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication state and methods
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactNode} The AuthProvider component
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
        // In a real app, we would fetch user data here
        setUser({ email: 'user@example.com', name: 'Demo User' });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock login - in a real app, this would call an API
      if (email === 'user@example.com' && password === 'password') {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        setUser({ email, name: 'Demo User' });
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'An error occurred during login' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    try {
      // Mock registration - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setUser({ email: userData.email, name: `${userData.firstName} ${userData.lastName}` });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred during registration' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the auth context
 * 
 * @returns {Object} The auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 