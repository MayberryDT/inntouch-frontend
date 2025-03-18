/**
 * Custom error response handling middleware
 */

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || 'Server Error';
  let errorCode = err.code || 'SERVER_ERROR';

  // Format the error response using the standardized API format
  const response = {
    success: false,
    error: {
      code: errorCode,
      message: errorMessage
    }
  };

  // Add validation errors if available
  if (err.validationErrors) {
    response.error.validationErrors = err.validationErrors;
  }

  // Add stack trace in development environment
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

// Custom Error class for API errors
class ApiError extends Error {
  constructor(message, statusCode, code, validationErrors = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.validationErrors = validationErrors;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  ApiError
}; 