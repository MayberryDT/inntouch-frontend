const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { expect } = require('chai');
const sinon = require('sinon');
const { protect, authorize } = require('../../src/middleware/auth');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('protect middleware', () => {
    it('should return 401 if no token is provided', async () => {
      await protect(req, res, next);
      
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.args[0][0].success).to.be.false;
      expect(res.json.args[0][0].error.code).to.equal('AUTHENTICATION_FAILED');
    });

    it('should call next() if token is valid', async () => {
      // Arrange
      const id = new mongoose.Types.ObjectId().toString();
      const user = { id, role: 'user' };
      const token = jwt.sign({ id }, 'test_secret');
      
      req.headers.authorization = `Bearer ${token}`;
      
      sinon.stub(jwt, 'verify').returns({ id });
      sinon.stub(mongoose.Model, 'findById').resolves(user);
      
      // Act
      await protect(req, res, next);
      
      // Assert
      expect(next.calledOnce).to.be.true;
      expect(req.user).to.deep.equal(user);
    });
  });

  describe('authorize middleware', () => {
    it('should return 403 if user role is not authorized', () => {
      // Arrange
      req.user = { role: 'user' };
      const authMiddleware = authorize('admin');
      
      // Act
      authMiddleware(req, res, next);
      
      // Assert
      expect(res.status.calledWith(403)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.args[0][0].success).to.be.false;
      expect(res.json.args[0][0].error.code).to.equal('AUTHORIZATION_FAILED');
    });

    it('should call next() if user role is authorized', () => {
      // Arrange
      req.user = { role: 'admin' };
      const authMiddleware = authorize('admin');
      
      // Act
      authMiddleware(req, res, next);
      
      // Assert
      expect(next.calledOnce).to.be.true;
    });
  });
}); 