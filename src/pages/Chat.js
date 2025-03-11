import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Grid
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock messages for demonstration
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: 'Hello! How can I help you today?',
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: 'I understand. Let me help you with that.',
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ height: 'calc(100vh - 100px)', mt: 2 }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12}>
            <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Chat Support</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            <List>
              {messages.map((message) => (
                <ListItem
                  key={message.id}
                  sx={{
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                    gap: 1
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      backgroundColor: message.sender === 'user' ? 'primary.light' : 'grey.100'
                    }}
                  >
                    <ListItemText
                      primary={message.text}
                      secondary={new Date(message.timestamp).toLocaleTimeString()}
                    />
                  </Paper>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Divider />
            <Box sx={{ p: 2 }}>
              <form onSubmit={handleSendMessage}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <IconButton
                    type="submit"
                    color="primary"
                    sx={{ p: '10px' }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Chat; 