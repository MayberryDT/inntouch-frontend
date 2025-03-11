import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttractionsIcon from '@mui/icons-material/Attractions';

const mockAttractions = [
  {
    id: 1,
    name: 'City Museum',
    description: 'Explore the rich history of our city through interactive exhibits and guided tours.',
    image: 'https://source.unsplash.com/800x600/?museum',
    rating: 4.5,
    price: 25,
    duration: '2-3 hours',
    location: 'Downtown',
    category: 'Culture'
  },
  {
    id: 2,
    name: 'Adventure Park',
    description: 'Experience thrilling rides and outdoor activities in our famous adventure park.',
    image: 'https://source.unsplash.com/800x600/?park',
    rating: 4.8,
    price: 45,
    duration: '4-5 hours',
    location: 'West Side',
    category: 'Adventure'
  },
  {
    id: 3,
    name: 'Local Food Tour',
    description: 'Taste the best local cuisine with our expert food guides.',
    image: 'https://source.unsplash.com/800x600/?food',
    rating: 4.7,
    price: 65,
    duration: '3 hours',
    location: 'City Center',
    category: 'Food'
  }
];

const Attractions = () => {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [participants, setParticipants] = useState(1);

  const handleBookNow = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleCloseDialog = () => {
    setSelectedAttraction(null);
    setBookingDate('');
    setBookingTime('');
    setParticipants(1);
  };

  const handleConfirmBooking = () => {
    // TODO: Implement booking logic
    console.log('Booking confirmed:', {
      attraction: selectedAttraction,
      date: bookingDate,
      time: bookingTime,
      participants
    });
    handleCloseDialog();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Local Attractions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and book amazing experiences in our city
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {mockAttractions.map((attraction) => (
          <Grid item xs={12} md={4} key={attraction.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={attraction.image}
                alt={attraction.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {attraction.name}
                </Typography>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={attraction.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({attraction.rating})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {attraction.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<LocationOnIcon />}
                    label={attraction.location}
                    size="small"
                  />
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={attraction.duration}
                    size="small"
                  />
                  <Chip
                    icon={<AttractionsIcon />}
                    label={attraction.category}
                    size="small"
                  />
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${attraction.price} per person
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBookNow(attraction)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedAttraction} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Book {selectedAttraction?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Date"
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Time"
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Number of Participants</InputLabel>
              <Select
                value={participants}
                label="Number of Participants"
                onChange={(e) => setParticipants(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <MenuItem key={num} value={num}>{num}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedAttraction && (
              <Typography variant="h6" color="primary">
                Total: ${selectedAttraction.price * participants}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmBooking}
            variant="contained"
            disabled={!bookingDate || !bookingTime}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Attractions; 