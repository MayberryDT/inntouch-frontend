import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Container
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import SecurityIcon from '@mui/icons-material/Security';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HotelIcon from '@mui/icons-material/Hotel';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import ChatIcon from '@mui/icons-material/Chat';
import ExploreIcon from '@mui/icons-material/Explore';

const FeatureCard = ({ icon, title, description, buttonText, buttonLink }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {icon}
      </Box>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button 
        size="small" 
        component={RouterLink} 
        to={buttonLink} 
        fullWidth
        variant="contained"
      >
        {buttonText}
      </Button>
    </CardActions>
  </Card>
);

const Home = () => {
  const features = [
    {
      title: 'Digital Check-in',
      description: 'Skip the front desk and check in directly from your phone. Fast, convenient, and contactless.',
      icon: <HotelIcon />
    },
    {
      title: 'Room Service',
      description: 'Order food and amenities directly to your room. Track your order in real-time.',
      icon: <RoomServiceIcon />
    },
    {
      title: 'Chat Support',
      description: 'Get instant help from our staff or AI concierge. Available 24/7 for all your needs.',
      icon: <ChatIcon />
    },
    {
      title: 'Local Attractions',
      description: 'Discover and book local experiences. Get personalized recommendations and exclusive deals.',
      icon: <ExploreIcon />
    }
  ];

  return (
    <>
      <Box sx={{ pt: 8, pb: 6 }}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to InnTouch
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Experience modern hospitality with our comprehensive digital services.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" component={RouterLink} to="/key" sx={{ mx: 1 }}>
              Manage Keys
            </Button>
            <Button variant="outlined" component={RouterLink} to="/login" sx={{ mx: 1 }}>
              Login
            </Button>
          </Box>
        </Container>
      </Box>
      
      <Container sx={{ py: 8 }} maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, bgcolor: 'background.paper' }}>
          <Typography variant="h4" gutterBottom align="center">
            How It Works
          </Typography>
          <Box sx={{ my: 3 }}>
            <Typography variant="body1" paragraph>
              <strong>1. Register:</strong> Create your account with InnTouch to get started.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>2. Book:</strong> Book your stay at any InnTouch-enabled hotel.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>3. Receive:</strong> Get your digital key directly on your smartphone.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>4. Access:</strong> Use your smartphone to unlock your room and enjoy your stay.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              variant="contained" 
              component={RouterLink} 
              to="/register"
              size="large"
            >
              Get Started
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Home; 