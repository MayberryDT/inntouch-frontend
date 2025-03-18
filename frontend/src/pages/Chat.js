import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudIcon from '@mui/icons-material/Cloud';
import DevicesIcon from '@mui/icons-material/Devices';
import AuthContext from '../context/AuthContext';

// Define API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Configure axios
axios.defaults.baseURL = API_BASE_URL;

const Chat = () => {
  const { guestId } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [dataSource, setDataSource] = useState('loading');
  const [debugInfo, setDebugInfo] = useState({
    authStatus: 'checking',
    guestId: null,
    apiEndpoint: null,
    hasToken: false,
    userObject: null
  });

  // Fetch guest information and chat history
  useEffect(() => {
    const fetchGuestDetails = async () => {
      try {
        setLoading(true);
        
        // Debug info
        console.log('DEBUG - Chat Component Mount');
        console.log('DEBUG - guestId:', guestId);
        console.log('DEBUG - token:', token ? 'exists' : 'missing');
        console.log('DEBUG - user object:', user);
        
        setDebugInfo({
          authStatus: token ? 'has token' : 'no token',
          guestId: guestId,
          apiEndpoint: `/api/chat/guests/${guestId}`,
          hasToken: !!token,
          userObject: user
        });

        // Always use mock data as fallback
        const mockGuestData = {
          _id: guestId || '12345',
          name: 'John Smith',
          roomNumber: '304',
          checkInTime: new Date('2023-03-15').toISOString(),
          checkOutTime: new Date('2023-03-20').toISOString(),
          email: 'john.smith@example.com'
        };
        
        // Mock chat history
        const mockChatHistory = [
          { _id: '1', sender: 'system', text: 'Welcome to InnTouch! How can I assist you today?', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { _id: '2', sender: 'guest', text: 'What time is breakfast served?', timestamp: new Date(Date.now() - 3500000).toISOString() },
          { _id: '3', sender: 'system', text: 'Breakfast is served from 7:00 AM to 10:30 AM in the main dining room on the first floor.', timestamp: new Date(Date.now() - 3400000).toISOString() }
        ];

        // Check if we have auth token
        const authToken = token || localStorage.getItem('token');
        
        if (!authToken) {
          console.log('DEBUG - No auth token found, using mock data');
          setGuestInfo(mockGuestData);
          setMessages(mockChatHistory);
          setDataSource('mock');
          setLoading(false);
          return;
        }

        // Try to fetch data from API
        try {
          console.log(`DEBUG - Fetching from API: ${API_BASE_URL}/api/chat/guests/${guestId}`);
          console.log('DEBUG - Using auth token:', authToken.substring(0, 10) + '...');
          
          // First try the public endpoint that doesn't require auth
          try {
            console.log(`DEBUG - Trying public endpoint: ${API_BASE_URL}/api/chat/guests/${guestId}/public`);
            const publicGuestResponse = await axios.get(`/api/chat/guests/${guestId}/public`);
            console.log('DEBUG - Public API response:', publicGuestResponse);
            
            if (publicGuestResponse.data && publicGuestResponse.data.success) {
              console.log('DEBUG - Successfully fetched guest data from public endpoint');
              setGuestInfo(publicGuestResponse.data.data);
              setMessages(mockChatHistory); // Use mock chat history since we don't have a public endpoint for messages
              setDataSource('api-public');
              setLoading(false);
              return;
            }
          } catch (publicApiError) {
            console.log('DEBUG - Public API failed:', publicApiError.message);
          }
          
          // Try authenticated endpoint if public fails
          const guestResponse = await axios.get(`/api/chat/guests/${guestId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          });
          
          console.log('DEBUG - Guest API response:', guestResponse);
          
          // If we got here, the API is working
          let apiGuestData = mockGuestData; // Default to mock
          if (guestResponse.data && guestResponse.data.data) {
            apiGuestData = guestResponse.data.data;
            console.log('DEBUG - Using API guest data');
          } else if (guestResponse.data) {
            apiGuestData = guestResponse.data;
            console.log('DEBUG - Using direct API response data');
          }
          
          // Try to fetch messages
          const messagesResponse = await axios.get(`/api/chat/guests/${guestId}/messages`, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          });
          
          console.log('DEBUG - Messages API response:', messagesResponse);
          
          let apiMessages = mockChatHistory; // Default to mock
          if (messagesResponse.data && messagesResponse.data.data) {
            apiMessages = messagesResponse.data.data;
            console.log('DEBUG - Using API message data');
          } else if (messagesResponse.data) {
            apiMessages = messagesResponse.data;
            console.log('DEBUG - Using direct API response data for messages');
          }
          
          setGuestInfo(apiGuestData);
          setMessages(apiMessages);
          setDataSource('api');
        } catch (apiError) {
          // Log the complete error for debugging
          console.log('DEBUG - API Error details:', apiError);
          
          // Check if it's an authentication error
          if (apiError.response && apiError.response.status === 401) {
            console.log('DEBUG - Authentication error - invalid or expired token');
            // You might want to trigger a re-login here
          }
          
          console.log('DEBUG - Using mock data due to API error');
          setGuestInfo(mockGuestData);
          setMessages(mockChatHistory);
          setDataSource('mock');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('DEBUG - Fatal error in fetchGuestDetails:', err);
        setError('Unable to load guest information. Please try again later.');
        setDataSource('error');
        setLoading(false);
      }
    };
    
    fetchGuestDetails();
  }, [guestId, token, user]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    try {
      setSending(true);
      console.log('DEBUG - Sending message:', newMessage);
      
      // Create a temporary message for immediate display
      const tempId = `temp-${Date.now()}`;
      const tempMessage = {
        _id: tempId,
        guestId,
        text: newMessage,
        sender: 'guest',
        timestamp: new Date().toISOString()
      };
      
      // Optimistically update UI
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage('');
      
      // Prepare client-side AI response
      let aiResponse = "I'm sorry, I don't have an answer for that right now. The hotel staff will get back to you shortly.";
      
      // Simple pattern matching for common questions
      const question = newMessage.toLowerCase();
      if (question.includes('checkout') || question.includes('check out') || question.includes('leaving')) {
        aiResponse = `Your checkout time is 11:00 AM on ${new Date(guestInfo.checkOutTime).toLocaleDateString()}. If you need a late checkout, please let us know and we'll check availability.`;
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
      
      // Try API if we're using API data source
      if (dataSource === 'api' || dataSource === 'api-public') {
        const authToken = token || localStorage.getItem('token');
        if (authToken) {
          try {
            console.log('DEBUG - Trying to send message to API');
            
            // Send message to API
            const messageResponse = await axios.post(
              `/api/chat/guests/${guestId}/messages`,
              {
                text: newMessage,
                sender: 'guest'
              },
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            
            console.log('DEBUG - API message send response:', messageResponse);
            
            // Wait a moment for the AI response to be generated
            setTimeout(async () => {
              try {
                // Fetch updated messages
                const messagesResponse = await axios.get(`/api/chat/guests/${guestId}/messages`, {
                  headers: {
                    Authorization: `Bearer ${authToken}`
                  }
                });
                
                console.log('DEBUG - Updated messages from API:', messagesResponse);
                
                if (messagesResponse.data && messagesResponse.data.data) {
                  setMessages(messagesResponse.data.data);
                } else if (messagesResponse.data) {
                  setMessages(messagesResponse.data);
                } else {
                  // Fallback to client-side AI
                  console.log('DEBUG - No data in API response, using client-side AI');
                  addClientAIResponse(aiResponse);
                }
                
                setSending(false);
              } catch (fetchError) {
                console.log('DEBUG - Error fetching updated messages:', fetchError);
                addClientAIResponse(aiResponse);
                setSending(false);
              }
            }, 1000);
            
            return;
          } catch (apiError) {
            console.log('DEBUG - API message send failed:', apiError);
            console.log('DEBUG - Falling back to client-side AI');
          }
        }
      }
      
      // If we get here, we're using mock data or API failed
      setTimeout(() => {
        addClientAIResponse(aiResponse);
        setSending(false);
      }, 1000);
      
    } catch (err) {
      console.error('DEBUG - Error in handleSendMessage:', err);
      setError('Failed to send message. Please try again.');
      setSending(false);
    }
  };

  // Helper to add client-side AI response
  const addClientAIResponse = (text) => {
    const systemMessage = {
      _id: `temp-${Date.now() + 1}`,
      sender: 'system',
      text: text,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>Debug Info:</Typography>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflowX: 'auto' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
          <Button variant="contained" onClick={handleBackToDashboard} sx={{ mt: 2 }}>
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBackIcon />} 
              onClick={handleBackToDashboard}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Typography variant="h4" component="h1">
              Guest Communication Hub
            </Typography>
          </Box>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip 
              size="small" 
              sx={{ ml: 1 }}
              icon={dataSource === 'api' || dataSource === 'api-public' ? <CloudIcon /> : <DevicesIcon />}
              label={dataSource === 'api' || dataSource === 'api-public' ? 'Live API Data' : 'Mock Data'}
              color={dataSource === 'api' || dataSource === 'api-public' ? 'success' : 'warning'}
            />
          </Box>
        </Box>
        
        <Grid container spacing={3}>
          {/* Guest Information */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Guest Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  <strong>Name:</strong> {guestInfo.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Room:</strong> {guestInfo.roomNumber || guestInfo.room}
                </Typography>
                <Typography variant="body1">
                  <strong>Check-in:</strong> {guestInfo.checkInTime ? new Date(guestInfo.checkInTime).toLocaleDateString() : guestInfo.checkIn}
                </Typography>
                <Typography variant="body1">
                  <strong>Check-out:</strong> {guestInfo.checkOutTime ? new Date(guestInfo.checkOutTime).toLocaleDateString() : guestInfo.checkOut}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {guestInfo.email}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                How can we help?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our AI assistant can help with:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Hotel information and amenities" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Restaurant and dining options" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Local attractions and directions" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Room service requests" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Check-out information" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          {/* Chat Area */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '70vh' }}>
              <Typography variant="h6" gutterBottom>
                Messages
              </Typography>
              
              {/* Messages List */}
              <Box sx={{ 
                flexGrow: 1, 
                overflowY: 'auto', 
                mb: 2,
                p: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 1
              }}>
                <List>
                  {messages.map((message) => (
                    <ListItem 
                      key={message._id || message.id}
                      alignItems="flex-start"
                      sx={{ 
                        mb: 1,
                        backgroundColor: message.sender === 'guest' ? 'rgba(25, 118, 210, 0.08)' : 'white',
                        borderRadius: 2,
                        maxWidth: '80%',
                        marginLeft: message.sender === 'guest' ? 'auto' : 0
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {message.sender === 'guest' ? <PersonIcon /> : <SmartToyIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={message.sender === 'guest' ? 'You' : 'InnTouch Assistant'}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body1"
                              color="text.primary"
                            >
                              {message.text}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 1, display: 'block' }}
                            >
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                  <div ref={messagesEndRef} />
                </List>
              </Box>
              
              {/* Message Input */}
              <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={sending}
                  sx={{ mr: 1 }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  endIcon={<SendIcon />}
                  disabled={sending || !newMessage.trim()}
                >
                  {sending ? <CircularProgress size={24} /> : 'Send'}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Debug Panel */}
        <Paper elevation={1} sx={{ mt: 3, p: 2, display: 'none' }}>
          <Typography variant="h6">Debug Information</Typography>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflowX: 'auto' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </Paper>
      </Box>
    </Container>
  );
};

export default Chat; 