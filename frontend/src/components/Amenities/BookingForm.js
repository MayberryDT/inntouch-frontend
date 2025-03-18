import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  Alert,
  Snackbar,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, addDays } from 'date-fns';

const BookingForm = () => {
  const { amenityId } = useParams();
  const navigate = useNavigate();
  
  const [amenity, setAmenity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [participants, setParticipants] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');
  const [availableSlots, setAvailableSlots] = useState({});
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
          name: 'Spa Treatment',
          description: 'Relaxing full-body massage and facial treatment',
          price: 120,
          duration: 90,
          maxParticipants: 1,
          isActive: true,
          imageUrl: 'https://via.placeholder.com/300x200?text=Spa+Treatment'
        },
        {
          id: '2',
          name: 'Yoga Class',
          description: 'Morning yoga session with professional instructor',
          price: 25,
          duration: 60,
          maxParticipants: 10,
          isActive: true,
          imageUrl: 'https://via.placeholder.com/300x200?text=Yoga+Class'
        },
        {
          id: '3',
          name: 'Pool Access',
          description: 'All-day access to our luxury swimming pool',
          price: 15,
          duration: 480,
          maxParticipants: 1,
          isActive: true,
          imageUrl: 'https://via.placeholder.com/300x200?text=Pool+Access'
        },
        {
          id: '4',
          name: 'Tennis Court',
          description: 'Tennis court rental with equipment',
          price: 40,
          duration: 60,
          maxParticipants: 4,
          isActive: true,
          imageUrl: 'https://via.placeholder.com/300x200?text=Tennis+Court'
        },
        {
          id: '5',
          name: 'Cooking Class',
          description: 'Learn to cook local cuisine with our chef',
          price: 75,
          duration: 120,
          maxParticipants: 8,
          isActive: true,
          imageUrl: 'https://via.placeholder.com/300x200?text=Cooking+Class'
        },
        {
          id: '6',
          name: 'Guided Tour',
          description: 'Guided tour of local attractions',
          price: 50,
          duration: 180,
          maxParticipants: 12,
          isActive: true,
          imageUrl: 'https://via.placeholder.com/300x200?text=Guided+Tour'
        }
      ];
      
      const foundAmenity = sampleAmenities.find(a => a.id === amenityId);
      setAmenity(foundAmenity || null);
      
      // Simulate available slots for the next 7 days
      const slots = {};
      const today = new Date();
      
      for (let i = 0; i < 7; i++) {
        const date = addDays(today, i);
        const dateStr = format(date, 'yyyy-MM-dd');
        
        // Different slots based on amenity type
        if (foundAmenity) {
          if (foundAmenity.id === '3' || foundAmenity.id === '8') {
            // All-day access amenities (pool, fitness center)
            slots[dateStr] = [
              { startTime: '09:00 AM', endTime: '09:00 PM', available: true }
            ];
          } else if (foundAmenity.id === '1') {
            // Spa treatments - hourly slots
            slots[dateStr] = [
              { startTime: '10:00 AM', endTime: '11:30 AM', available: true },
              { startTime: '12:00 PM', endTime: '01:30 PM', available: i % 2 === 0 },
              { startTime: '02:00 PM', endTime: '03:30 PM', available: true },
              { startTime: '04:00 PM', endTime: '05:30 PM', available: i % 3 !== 0 }
            ];
          } else {
            // Default slots for other amenities
            slots[dateStr] = [
              { startTime: '09:00 AM', endTime: '10:00 AM', available: true },
              { startTime: '10:30 AM', endTime: '11:30 AM', available: i % 2 === 0 },
              { startTime: '01:00 PM', endTime: '02:00 PM', available: i % 3 !== 0 },
              { startTime: '02:30 PM', endTime: '03:30 PM', available: true },
              { startTime: '04:00 PM', endTime: '05:00 PM', available: i % 2 !== 0 }
            ];
          }
        }
      }
      
      setAvailableSlots(slots);
      setLoading(false);
    }, 500); // Simulate loading delay
  }, [amenityId]);

  // Get available time slots for the selected date
  const getAvailableSlotsForDate = () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return availableSlots[dateStr] || [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTimeSlot) {
      setSnackbar({
        open: true,
        message: 'Please select an available time slot',
        severity: 'error'
      });
      return;
    }
    
    try {
      // Simulate successful booking
      setSnackbar({
        open: true,
        message: 'Booking successful! You will receive a confirmation shortly.',
        severity: 'success'
      });
      
      // Redirect to amenities page after a short delay
      setTimeout(() => {
        navigate('/amenities');
      }, 2000);
      
    } catch (err) {
      console.error('Booking failed:', err);
      setSnackbar({
        open: true,
        message: `Booking failed: ${err.message}`,
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedTimeSlot(''); // Reset selected time slot when date changes
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Loading amenity details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!amenity) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">Amenity not found. Please select a valid amenity from the list.</Alert>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => navigate('/amenities')}>
            Back to Amenities
          </Button>
        </Box>
      </Container>
    );
  }

  const timeSlots = getAvailableSlotsForDate();
  const isAllDayAmenity = amenity.id === '3' || amenity.id === '8';

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Book {amenity.name}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {amenity.description}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                  minDate={new Date()}
                  disablePast
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="participants-label">Number of Participants</InputLabel>
                <Select
                  labelId="participants-label"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  label="Number of Participants"
                  required
                >
                  {[...Array(amenity.maxParticipants || 1).keys()].map((num) => (
                    <MuiMenuItem key={num + 1} value={num + 1}>
                      {num + 1}
                    </MuiMenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Available Time Slots
              </Typography>
              
              {timeSlots.length === 0 ? (
                <Alert severity="info">No available slots for the selected date. Please choose another date.</Alert>
              ) : (
                <FormControl component="fieldset" fullWidth required>
                  <RadioGroup
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  >
                    {timeSlots.map((slot, index) => (
                      <FormControlLabel
                        key={index}
                        value={`${slot.startTime}-${slot.endTime}`}
                        control={<Radio />}
                        label={isAllDayAmenity ? 'All-day access' : `${slot.startTime} - ${slot.endTime}`}
                        disabled={!slot.available}
                        sx={{
                          opacity: slot.available ? 1 : 0.5,
                          mb: 1
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Special Requests or Notes"
                multiline
                rows={4}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  Total: ${(amenity.price * participants).toFixed(2)}
                </Typography>
                
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  disabled={timeSlots.length === 0 || !selectedTimeSlot}
                >
                  Book Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
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

export default BookingForm; 