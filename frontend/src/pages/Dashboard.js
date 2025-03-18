import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box
} from '@mui/material';
import AuthContext from '../context/AuthContext';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpaIcon from '@mui/icons-material/Spa';
import ChatIcon from '@mui/icons-material/Chat';
import BarChartIcon from '@mui/icons-material/BarChart';
import HotelIcon from '@mui/icons-material/Hotel';
import ExitIcon from '@mui/icons-material/ExitToApp';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChatClick = () => {
    // Automatically sign in to chat with the current user's ID
    navigate(`/chat/${user.id}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Welcome, {user?.name || 'User'}!
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Hotel Management
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ display: 'flex', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <ChatIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h5" component="div">
                      Communication Hub
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Connect with guests through our AI-powered chat system. Answer questions and provide assistance instantly.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="large" variant="contained" onClick={handleChatClick}>
                    Open Chat
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ display: 'flex', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <BarChartIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h5" component="div">
                      Analytics Dashboard
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    View key metrics and insights about guest activity, revenue, and communication patterns.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="large" variant="contained" component={Link} to="/analytics">
                    View Analytics
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box sx={{ mr: 2 }}>
                    <img src="/logo192.png" alt="InnTouch Logo" width="40" height="40" />
                  </Box>
                  <Typography variant="h5" component="div">
                    Guest Management
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  View and manage all guest information and reservations in one place.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined" component={Link} to="/guests">
                  View Guests
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        
        <Typography variant="h5" gutterBottom>
          Guest Services
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <HotelIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" component="div">
                    Self Check-In
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Allow guests to check in remotely, submit personal information and documents.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined" component={Link} to="/checkin">
                  Check-In Form
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <ExitIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" component="div">
                    Self Check-Out
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Allow guests to check out remotely and provide feedback about their stay.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined" component={Link} to="/checkout">
                  Check-Out Form
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ display: 'flex', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <RestaurantIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h5" component="div">
                      Room Service
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Browse our extensive menu of delicious meals and beverages that can be delivered directly to guest rooms.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined" component={Link} to="/room-service">
                    View Menu
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ display: 'flex', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <SpaIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h5" component="div">
                      Hotel Amenities
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Explore our premium amenities and experiences designed to enhance guest stays.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined" component={Link} to="/amenities">
                    Browse Amenities
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 