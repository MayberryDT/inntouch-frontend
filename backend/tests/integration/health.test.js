const request = require('supertest');
const { expect } = require('chai');
const express = require('express');
const responseHandler = require('../../src/middleware/responseHandler');

describe('Health Check Endpoint', () => {
  let app;

  beforeEach(() => {
    // Setup a test app with just the necessary middleware and routes
    app = express();
    app.use(responseHandler);
    
    // Add the health check route
    app.get('/api/health', (req, res) => {
      res.sendSuccess({ status: 'ok', time: new Date().toISOString() }, 'InnTouch API is running');
    });
  });

  it('should return a 200 status code', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).to.equal(200);
  });

  it('should return success: true in the response', async () => {
    const response = await request(app).get('/api/health');
    expect(response.body.success).to.be.true;
  });

  it('should return a status property with value "ok"', async () => {
    const response = await request(app).get('/api/health');
    expect(response.body.data.status).to.equal('ok');
  });

  it('should return a time property with valid ISO date string', async () => {
    const response = await request(app).get('/api/health');
    expect(response.body.data.time).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(new Date(response.body.data.time)).to.be.an.instanceOf(Date);
  });

  it('should return the correct message', async () => {
    const response = await request(app).get('/api/health');
    expect(response.body.message).to.equal('InnTouch API is running');
  });
}); 