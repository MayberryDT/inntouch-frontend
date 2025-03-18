const { expect } = require('chai');
const sinon = require('sinon');
const { errorHandler, ApiError } = require('../../src/middleware/errorHandler');

describe('Error Handler Middleware', () => {
  let req, res, next;
  
  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should handle errors with status code and error code', () => {
    // Arrange
    const error = new ApiError('Test error message', 400, 'TEST_ERROR');
    
    // Act
    errorHandler(error, req, res, next);
    
    // Assert
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    
    const responseBody = res.json.args[0][0];
    expect(responseBody.success).to.be.false;
    expect(responseBody.error.code).to.equal('TEST_ERROR');
    expect(responseBody.error.message).to.equal('Test error message');
  });

  it('should use default values for missing status code and error code', () => {
    // Arrange
    const error = new Error('Default error message');
    
    // Act
    errorHandler(error, req, res, next);
    
    // Assert
    expect(res.status.calledWith(500)).to.be.true;
    
    const responseBody = res.json.args[0][0];
    expect(responseBody.success).to.be.false;
    expect(responseBody.error.code).to.equal('SERVER_ERROR');
    expect(responseBody.error.message).to.equal('Default error message');
  });

  it('should include stack trace in development environment', () => {
    // Arrange
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    const error = new Error('Development error');
    error.stack = 'Test stack trace';
    
    // Act
    errorHandler(error, req, res, next);
    
    // Assert
    const responseBody = res.json.args[0][0];
    expect(responseBody.error.stack).to.equal('Test stack trace');
    
    // Restore environment
    process.env.NODE_ENV = originalEnv;
  });

  it('should not include stack trace in production environment', () => {
    // Arrange
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    const error = new Error('Production error');
    error.stack = 'Test stack trace';
    
    // Act
    errorHandler(error, req, res, next);
    
    // Assert
    const responseBody = res.json.args[0][0];
    expect(responseBody.error.stack).to.be.undefined;
    
    // Restore environment
    process.env.NODE_ENV = originalEnv;
  });
});

describe('ApiError Class', () => {
  it('should create an error with the specified properties', () => {
    // Act
    const error = new ApiError('Custom API error', 422, 'VALIDATION_ERROR');
    
    // Assert
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal('Custom API error');
    expect(error.statusCode).to.equal(422);
    expect(error.code).to.equal('VALIDATION_ERROR');
    expect(error.stack).to.exist;
  });
}); 