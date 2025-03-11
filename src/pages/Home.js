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
      icon: <KeyIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Digital Keys',
      description: 'Access your room with a digital key on your smartphone. No more physical keys to lose or forget.',
      buttonText: 'Manage Keys',
      buttonLink: '/key'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Secure Access',
      description: 'State-of-the-art security ensures only authorized users can access your room.',
      buttonText: 'Learn More',
      buttonLink: '/key'
    },
    {
      icon: <PhoneIphoneIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Mobile Control',
      description: 'Manage your stay, access your room, and control your experience all from your smartphone.',
      buttonText: 'View Profile',
      buttonLink: '/profile'
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
            The smart way to access and manage your hotel room. 
            Experience the convenience of digital keys and seamless mobile control.
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
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
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