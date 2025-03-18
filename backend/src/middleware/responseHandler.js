/**
 * Standardized response formatting middleware
 */

// Success response formatter
const successResponse = (data = null, message = 'Operation successful') => {
  return {
    success: true,
    message,
    data
  };
};

// Add response utility methods to the response object
const responseHandler = (req, res, next) => {
  // Add a success response method to res
  res.sendSuccess = function(data, message, statusCode = 200) {
    return this.status(statusCode).json(successResponse(data, message));
  };

  // Add a created response method to res
  res.sendCreated = function(data, message = 'Resource created successfully') {
    return this.status(201).json(successResponse(data, message));
  };

  next();
};

module.exports = responseHandler; 