import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import AmenityCard from './AmenityCard';

const AmenitiesPage = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Load sample data instead of fetching from API
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      const sampleAmenities = [
        {
          id: '1',
          name: 'Luxury Spa Treatment',
          description: 'Indulge in our signature full-body massage and facial treatment, designed to rejuvenate your body and mind.',
          price: 150,
          duration: 120,
          maxParticipants: 1,
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '2',
          name: 'Morning Yoga Class',
          description: 'Start your day with a rejuvenating yoga session led by our certified instructor. Suitable for all experience levels.',
          price: 25,
          duration: 60,
          maxParticipants: 12,
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '3',
          name: 'Infinity Pool Access',
          description: 'Enjoy all-day access to our stunning infinity pool with panoramic views of the surrounding landscape.',
          price: 35,
          duration: 480,
          maxParticipants: 1,
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '4',
          name: 'Tennis Court Rental',
          description: 'Reserve our professional-grade tennis court. Equipment provided upon request at no additional charge.',
          price: 45,
          duration: 60,
          maxParticipants: 4,
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '5',
          name: 'Gourmet Cooking Class',
          description: 'Learn to prepare local cuisine with our executive chef in this hands-on culinary experience.',
          price: 85,
          duration: 150,
          maxParticipants: 8,
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '6',
          name: 'Private City Tour',
          description: 'Discover the hidden gems of the city with our knowledgeable local guide on this exclusive tour.',
          price: 120,
          duration: 240,
          maxParticipants: 6,
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1519112232436-9923c6ba3d26?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '7',
          name: 'Wine Tasting Experience',
          description: 'Sample a selection of premium local and international wines paired with artisanal cheeses.',
          price: 75,
          duration: 90,
          maxParticipants: 10,
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '8',
          name: 'Fitness Center Access',
          description: 'Full-day access to our state-of-the-art fitness center with cardio equipment, weights, and personal trainers available.',
          price: 20,
          duration: 480,
          maxParticipants: 1,
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '9',
          name: 'Sunset Yacht Cruise',
          description: 'Experience a breathtaking sunset from the water on our luxury yacht, including champagne and hors d\'oeuvres.',
          price: 195,
          duration: 180,
          maxParticipants: 12,
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=300&h=200&fit=crop&auto=format&q=80'
        }
      ];
      setAmenities(sampleAmenities);
      setLoading(false);
    }, 500); // Simulate loading delay
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Hotel Amenities
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Enhance your stay with our premium amenities and experiences. Book in advance to secure your spot from our available time slots.
        </Typography>
      </Box>

      {loading ? (
        <Typography>Loading amenities...</Typography>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {amenities.length > 0 ? (
            amenities.map((amenity) => (
              <Grid item xs={12} sm={6} md={4} key={amenity.id}>
                <AmenityCard amenity={amenity} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center">No amenities available at the moment.</Typography>
            </Grid>
          )}
        </Grid>
      )}

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AmenitiesPage; 