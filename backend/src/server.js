const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const responseHandler = require('./middleware/responseHandler');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(responseHandler); // Add standardized response formatting middleware

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
  next();
});

// Mock data for analytics
const mockData = {
  stats: {
    totalGuestInteractions: 842,
    avgResponseTime: 3.5,  // minutes
    guestSatisfactionScore: 92, // percentage
    totalRequests: 368
  },
  interactionsByChannel: [
    { channel: 'In-App Chat', count: 486 },
    { channel: 'SMS', count: 210 },
    { channel: 'Phone', count: 95 },
    { channel: 'Front Desk', count: 51 }
  ],
  requestCategories: [
    { category: 'Room Service', count: 127 },
    { category: 'Housekeeping', count: 86 },
    { category: 'Concierge', count: 74 },
    { category: 'Maintenance', count: 48 },
    { category: 'Amenities', count: 33 }
  ],
  responseTimeByDay: [
    { day: 'Mon', time: 2.8 },
    { day: 'Tue', time: 2.5 },
    { day: 'Wed', time: 3.2 },
    { day: 'Thu', time: 3.5 },
    { day: 'Fri', time: 4.1 },
    { day: 'Sat', time: 5.2 },
    { day: 'Sun', time: 4.3 }
  ],
  guestSatisfactionTrend: [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 87 },
    { month: 'Mar', score: 86 },
    { month: 'Apr', score: 89 },
    { month: 'May', score: 91 },
    { month: 'Jun', score: 92 }
  ]
};

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/checkin', require('./routes/checkin'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/guests', require('./routes/guests'));
app.use('/api/chat', require('./routes/chat'));

// Analytics endpoints
app.get('/api/analytics/overview', (req, res) => {
  console.log('Analytics overview endpoint accessed');
  res.sendSuccess(mockData.stats, 'Analytics overview data retrieved successfully');
});

app.get('/api/analytics/interactions/channels', (req, res) => {
  console.log('Interaction channels endpoint accessed');
  res.sendSuccess(mockData.interactionsByChannel, 'Interaction channels data retrieved successfully');
});

app.get('/api/analytics/requests/categories', (req, res) => {
  console.log('Request categories endpoint accessed');
  res.sendSuccess(mockData.requestCategories, 'Request categories data retrieved successfully');
});

app.get('/api/analytics/response-time/daily', (req, res) => {
  console.log('Daily response time endpoint accessed');
  res.sendSuccess(mockData.responseTimeByDay, 'Daily response time data retrieved successfully');
});

app.get('/api/analytics/satisfaction/trend', (req, res) => {
  console.log('Satisfaction trend endpoint accessed');
  res.sendSuccess(mockData.guestSatisfactionTrend, 'Satisfaction trend data retrieved successfully');
});

// Health check route
app.get('/api/health', (req, res) => {
  res.sendSuccess({ status: 'ok', time: new Date().toISOString() }, 'InnTouch API is running');
});

// Default 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Route ${req.originalUrl} not found`
    }
  });
});

// Centralized error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
}); 