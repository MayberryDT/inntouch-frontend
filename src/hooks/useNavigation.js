import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook for navigation that provides easy access to common navigation functions
 * 
 * @returns {Object} Navigation utilities
 */
const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    /**
     * Navigate to the home page
     */
    goToHome: () => navigate('/'),
    
    /**
     * Navigate to the login page
     */
    goToLogin: () => navigate('/login'),
    
    /**
     * Navigate to the register page
     */
    goToRegister: () => navigate('/register'),
    
    /**
     * Navigate to the digital key page
     */
    goToKey: () => navigate('/key'),
    
    /**
     * Navigate to the profile page
     */
    goToProfile: () => navigate('/profile'),
    
    /**
     * Navigate back to the previous page
     */
    goBack: () => navigate(-1),
    
    /**
     * Navigate to a specific path
     * 
     * @param {string} path - The path to navigate to
     * @param {Object} options - Navigation options
     */
    navigateTo: (path, options) => navigate(path, options),
    
    /**
     * Get the current location
     */
    currentLocation: location,
    
    /**
     * Get the previous location if it was saved in state
     */
    previousLocation: location.state?.from
  };
};

export default useNavigation; 