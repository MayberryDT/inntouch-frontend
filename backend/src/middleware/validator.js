const { validationResult, matchedData } = require('express-validator');
const { ApiError } = require('./errorHandler');

/**
 * Middleware to validate request data using express-validator
 * @param {Array} validations - Array of express-validator validation chains
 * @returns {Function} Express middleware
 */
const validate = (validations) => {
  return async (req, res, next) => {
    try {
      // Run all validations
      await Promise.all(validations.map(validation => validation.run(req)));
      
      // Check if there are validation errors
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        // Format errors for consistent API response
        const formattedErrors = errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }));
        
        // Create API error with validation errors
        throw new ApiError('Validation error', 422, 'VALIDATION_ERROR', formattedErrors);
      }
      
      // Add validated data to req.validated
      req.validated = matchedData(req);
      
      next();
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else {
        next(new ApiError('Validation error', 422, 'VALIDATION_ERROR'));
      }
    }
  };
};

module.exports = { validate }; 