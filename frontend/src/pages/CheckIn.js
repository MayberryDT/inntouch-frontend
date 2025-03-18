import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  Grid,
  AppBar,
  Toolbar
} from '@mui/material';

const CheckIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reservationId: '',
    estimatedArrival: new Date().toISOString().slice(0, 16)
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { name, email, phone, reservationId, estimatedArrival } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const res = await axios.post('/api/checkin', formData);
      
      if (res.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          reservationId: '',
          estimatedArrival: new Date().toISOString().slice(0, 16)
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Check-in failed. Please try again.');
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            InnTouch
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            Staff Login
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container className="checkin-container">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Guest Check-In
          </Typography>
          
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Check-in successful! Thank you for using InnTouch.
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="reservationId"
                  label="Reservation ID"
                  name="reservationId"
                  value={reservationId}
                  onChange={onChange}
                  helperText="You can find this in your confirmation email"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="estimatedArrival"
                  label="Estimated Arrival Time"
                  name="estimatedArrival"
                  type="datetime-local"
                  value={estimatedArrival}
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Complete Check-In
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default CheckIn; 