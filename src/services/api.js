import axios from 'axios';

// Create axios instance with base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

// Digital Key API calls
export const keyAPI = {
  getKeys: async () => {
    try {
      const response = await api.get('/keys');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getKey: async (keyId) => {
    try {
      const response = await api.get(`/keys/${keyId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  activateKey: async (keyId) => {
    try {
      const response = await api.post(`/keys/activate`, { keyId });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  deactivateKey: async (keyId) => {
    try {
      const response = await api.post(`/keys/deactivate`, { keyId });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getAccessLog: async () => {
    try {
      const response = await api.get('/keys/access-log');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

// Export the axios instance for custom API calls
export default api; 