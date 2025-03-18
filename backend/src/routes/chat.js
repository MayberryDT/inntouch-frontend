const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Add a test endpoint that doesn't require authentication
router.get('/test', (req, res) => {
  console.log('Chat test endpoint called');
  return res.sendSuccess({ message: 'Chat API is working!' }, 'Chat API test successful');
});

// Mock guest data
const mockGuest = {
  _id: '67d52dba90d75c3bd006eabc',
  name: 'John Smith',
  roomNumber: '304',
  checkInTime: new Date('2023-03-15'),
  checkOutTime: new Date('2023-03-20'),
  email: 'john.smith@example.com'
};

// Mock message store (in-memory for demo)
const mockMessages = [
  { 
    _id: '1', 
    guestId: '67d52dba90d75c3bd006eabc', 
    sender: 'system', 
    text: 'Welcome to InnTouch! How can I assist you today?', 
    timestamp: new Date(Date.now() - 3600000) 
  },
  { 
    _id: '2', 
    guestId: '67d52dba90d75c3bd006eabc', 
    sender: 'guest', 
    text: 'What time is breakfast served?', 
    timestamp: new Date(Date.now() - 3500000) 
  },
  { 
    _id: '3', 
    guestId: '67d52dba90d75c3bd006eabc', 
    sender: 'system', 
    text: 'Breakfast is served from 7:00 AM to 10:30 AM in the main dining room on the first floor.', 
    timestamp: new Date(Date.now() - 3400000) 
  }
];

// Add a non-protected guest endpoint for testing
router.get('/guests/:guestId/public', (req, res) => {
  const { guestId } = req.params;
  console.log(`Fetching public guest info for: ${guestId}`);
  
  // Return mock data for testing
  if (guestId === mockGuest._id) {
    return res.sendSuccess(mockGuest, 'Guest information retrieved successfully (public)');
  }
  
  return res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Guest not found'
    }
  });
});

// Get guest information
router.get('/guests/:guestId', protect, (req, res) => {
  const { guestId } = req.params;
  console.log(`Fetching guest info for: ${guestId}`);
  
  // For now, return mock data
  if (guestId === mockGuest._id) {
    return res.sendSuccess(mockGuest, 'Guest information retrieved successfully');
  }
  
  return res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Guest not found'
    }
  });
});

// Get chat history for a specific guest
router.get('/guests/:guestId/messages', protect, (req, res) => {
  const { guestId } = req.params;
  console.log(`Fetching messages for guest: ${guestId}`);
  
  // For now, return mock data
  const guestMessages = mockMessages.filter(msg => msg.guestId === guestId);
  return res.sendSuccess(guestMessages, 'Chat history retrieved successfully');
});

// Send a new message
router.post('/guests/:guestId/messages', protect, (req, res) => {
  const { guestId } = req.params;
  const { text, sender } = req.body;
  
  console.log(`New message from ${sender} for guest ${guestId}: ${text}`);
  
  // Validate request
  if (!text) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Message text is required'
      }
    });
  }
  
  if (!sender) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Sender is required'
      }
    });
  }
  
  // Create message
  const newMessage = {
    _id: `msg-${Date.now()}`,
    guestId,
    text,
    sender,
    timestamp: new Date()
  };
  
  // Add to mock store
  mockMessages.push(newMessage);
  
  // Generate AI response if it's a guest message
  if (sender === 'guest') {
    // Simple pattern matching for common questions
    const question = text.toLowerCase();
    let aiResponse = "I'm sorry, I don't have an answer for that right now. The hotel staff will get back to you shortly.";
    
    if (question.includes('checkout') || question.includes('check out') || question.includes('leaving')) {
      aiResponse = `Your checkout time is 11:00 AM on ${new Date(mockGuest.checkOutTime).toLocaleDateString()}. If you need a late checkout, please let us know and we'll check availability.`;
    } else if (question.includes('wifi') || question.includes('internet') || question.includes('password')) {
      aiResponse = 'The WiFi network name is "InnTouch-Guest" and the password is provided on the keycard holder in your room.';
    } else if (question.includes('breakfast') || question.includes('dining')) {
      aiResponse = 'Breakfast is served daily from 7:00 AM to 10:30 AM in the main dining room on the first floor.';
    } else if (question.includes('pool') || question.includes('swimming')) {
      aiResponse = 'The pool is open from 7:00 AM to 10:00 PM. Towels are provided poolside.';
    } else if (question.includes('gym') || question.includes('fitness')) {
      aiResponse = 'Our fitness center is open 24 hours a day. You can access it using your room key.';
    } else if (question.includes('spa')) {
      aiResponse = 'The spa is open from 9:00 AM to 8:00 PM. We recommend booking treatments in advance at the front desk.';
    } else if (question.includes('restaurant') || question.includes('dinner')) {
      aiResponse = 'Our main restaurant is open for dinner from 6:00 PM to 10:00 PM. We also have a bar and lounge open from noon until midnight.';
    }
    
    // Add AI response
    const systemMessage = {
      _id: `msg-${Date.now() + 1}`,
      guestId,
      text: aiResponse,
      sender: 'system',
      timestamp: new Date()
    };
    
    mockMessages.push(systemMessage);
  }
  
  return res.sendCreated(newMessage, 'Message sent successfully');
});

module.exports = router; 