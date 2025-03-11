/**
 * Validation utility functions
 */

/**
 * Validates an email address
 * 
 * @param {string} email - The email address to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password meets minimum requirements
 * 
 * @param {string} password - The password to validate
 * @param {Object} options - Validation options
 * @param {number} options.minLength - Minimum password length (default: 8)
 * @param {boolean} options.requireUppercase - Whether to require uppercase letters (default: true)
 * @param {boolean} options.requireLowercase - Whether to require lowercase letters (default: true)
 * @param {boolean} options.requireNumber - Whether to require numbers (default: true)
 * @param {boolean} options.requireSpecial - Whether to require special characters (default: true)
 * @returns {Object} Validation result with isValid flag and error message
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecial = true,
  } = options;
  
  if (!password) {
    return {
      isValid: false,
      message: 'Password is required',
    };
  }
  
  if (password.length < minLength) {
    return {
      isValid: false,
      message: `Password must be at least ${minLength} characters`,
    };
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }
  
  if (requireNumber && !/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }
  
  if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character',
    };
  }
  
  return {
    isValid: true,
    message: '',
  };
};

/**
 * Validates that a field is not empty
 * 
 * @param {string} value - The value to validate
 * @param {string} fieldName - The name of the field for the error message
 * @returns {Object} Validation result with isValid flag and error message
 */
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }
  
  return {
    isValid: true,
    message: '',
  };
};

/**
 * Validates a phone number
 * 
 * @param {string} phone - The phone number to validate
 * @returns {Object} Validation result with isValid flag and error message
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return {
      isValid: true, // Phone is optional
      message: '',
    };
  }
  
  // Remove spaces and other formatting characters
  const cleanPhone = phone.replace(/\s+/g, '').replace(/[()-]/g, '');
  
  // Check if it's a valid phone number (10-15 digits, may start with +)
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  
  if (!phoneRegex.test(cleanPhone)) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number',
    };
  }
  
  return {
    isValid: true,
    message: '',
  };
}; 