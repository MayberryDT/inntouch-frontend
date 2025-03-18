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
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthContext from '../context/AuthContext';

const Chat = () => {
  const { guestId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Fetch guest information and chat history
  useEffect(() => {
    const fetchGuestDetails = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch data from your API
        // Simulate API call for guest information
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock guest data
        const guestData = {
          id: guestId || '12345',
          name: 'John Smith',
          room: '304',
          checkIn: '2023-03-15',
          checkOut: '2023-03-20',
          email: 'john.smith@example.com'
        };
        
        setGuestInfo(guestData);
        
        // Mock chat history
        const chatHistory = [
          { id: 1, sender: 'system', text: 'Welcome to InnTouch! How can I assist you today?', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { id: 2, sender: 'guest', text: 'What time is breakfast served?', timestamp: new Date(Date.now() - 3500000).toISOString() },
          { id: 3, sender: 'system', text: 'Breakfast is served from 7:00 AM to 10:30 AM in the main dining room on the first floor.', timestamp: new Date(Date.now() - 3400000).toISOString() }
        ];
        
        setMessages(chatHistory);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guest details:', err);
        setError('Unable to load guest information. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchGuestDetails();
  }, [guestId]);

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
      
      // Add guest message to chat
      const guestMessage = {
        id: messages.length + 1,
        sender: 'guest',
        text: newMessage,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, guestMessage]);
      setNewMessage('');
      
      // Simulate AI response with a delay
      setTimeout(() => {
        // Generate AI response based on the question
        let aiResponse = "I'm sorry, I don't have an answer for that right now. The hotel staff will get back to you shortly.";
        
        // Simple pattern matching for common questions
        const question = newMessage.toLowerCase();
        if (question.includes('checkout') || question.includes('check out') || question.includes('leaving')) {
          aiResponse = `Your checkout time is 11:00 AM on ${guestInfo.checkOut}. If you need a late checkout, please let us know and we'll check availability.`;
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
        
        const systemMessage = {
          id: messages.length + 2,
          sender: 'system',
          text: aiResponse,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, systemMessage]);
        setSending(false);
      }, 1500);
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      setSending(false);
    }
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
        <Button variant="contained" onClick={handleBackToDashboard} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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
                  <strong>Room:</strong> {guestInfo.room}
                </Typography>
                <Typography variant="body1">
                  <strong>Check-in:</strong> {guestInfo.checkIn}
                </Typography>
                <Typography variant="body1">
                  <strong>Check-out:</strong> {guestInfo.checkOut}
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
                      key={message.id}
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
                              component="div"
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 1 }}
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
      </Box>
    </Container>
  );
};

export default Chat; 