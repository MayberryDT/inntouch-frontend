import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Alert,
  Divider,
  IconButton,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(loading);
  const [errorMessage, setErrorMessage] = useState(error);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
    
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrorMessage('');
      
      try {
        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        // Get Firebase token
        const token = await userCredential.user.getIdToken();
        
        // Call backend API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            email: formData.email,
            rememberMe: formData.rememberMe
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        
        // Store token if remember me is checked
        if (formData.rememberMe) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }
        
        onSubmit(data);
      } catch (error) {
        // Handle Firebase specific error codes
        let message = 'Login failed';
        if (error.code === 'auth/user-not-found') {
          message = 'No account found with this email address';
        } else if (error.code === 'auth/wrong-password') {
          message = 'Invalid password';
        } else if (error.code === 'auth/too-many-requests') {
          message = 'Too many failed attempts. Please try again later';
        } else if (error.code === 'auth/user-disabled') {
          message = 'This account has been disabled';
        } else if (error.code === 'auth/invalid-email') {
          message = 'Invalid email address';
        }
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const authProvider = provider === 'Google' ? googleProvider : facebookProvider;
      const result = await signInWithPopup(auth, authProvider);
      
      // Get Firebase token
      const token = await result.user.getIdToken();
      
      // Call backend API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Social login failed');
      }

      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate aria-label="Login form">
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }} role="alert">
          {errorMessage}
        </Alert>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        error={!!validationErrors.email}
        helperText={validationErrors.email}
        inputProps={{
          'aria-required': 'true',
          'aria-invalid': !!validationErrors.email,
          'aria-describedby': validationErrors.email ? 'email-error' : undefined
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        error={!!validationErrors.password}
        helperText={validationErrors.password}
        inputProps={{
          'aria-required': 'true',
          'aria-invalid': !!validationErrors.password,
          'aria-describedby': validationErrors.password ? 'password-error' : undefined
        }}
      />
      
      <FormControlLabel
        control={
          <Checkbox 
            name="rememberMe" 
            color="primary" 
            checked={formData.rememberMe}
            onChange={handleChange}
          />
        }
        label="Remember me"
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
      
      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <IconButton
          aria-label="Sign in with Google"
          onClick={() => handleSocialLogin('Google')}
          disabled={isLoading}
          sx={{ 
            color: '#DB4437',
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            p: 1
          }}
        >
          <GoogleIcon />
        </IconButton>
        
        <IconButton
          aria-label="Sign in with Facebook"
          onClick={() => handleSocialLogin('Facebook')}
          disabled={isLoading}
          sx={{ 
            color: '#4267B2',
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            p: 1
          }}
        >
          <FacebookIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

LoginForm.defaultProps = {
  loading: false,
  error: ''
};

export default LoginForm; 