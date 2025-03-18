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
  Toolbar,
  FormLabel
} from '@mui/material';

const CheckOut = () => {
  const [formData, setFormData] = useState({
    guestId: '',
    feedback: {
      rating: 5,
      comment: ''
    }
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { guestId, feedback } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e) => {
    const value = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    setFormData({
      ...formData,
      feedback: {
        ...formData.feedback,
        rating: value
      }
    });
  };

  const handleCommentChange = (e) => {
    setFormData({
      ...formData,
      feedback: {
        ...formData.feedback,
        comment: e.target.value
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!guestId) {
      setError('Please enter your Guest ID');
      return;
    }

    try {
      const res = await axios.post('/api/checkout', formData);
      
      if (res.data.success) {
        setSuccess(true);
        setFormData({
          guestId: '',
          feedback: {
            rating: 5,
            comment: ''
          }
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Check-out failed. Please try again.');
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
      
      <Container className="checkout-container">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Guest Check-Out
          </Typography>
          
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Check-out successful! Thank you for your stay.
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="guestId"
                  label="Guest ID"
                  name="guestId"
                  value={guestId}
                  onChange={onChange}
                  helperText="You can find this in your check-in confirmation"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  How was your stay?
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <FormLabel component="legend">Rating (1-5)</FormLabel>
                <TextField
                  fullWidth
                  id="rating"
                  name="rating"
                  type="number"
                  inputProps={{ min: 1, max: 5 }}
                  value={feedback.rating}
                  onChange={handleRatingChange}
                  helperText="1 = Poor, 5 = Excellent"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="comment"
                  label="Comments (Optional)"
                  name="comment"
                  multiline
                  rows={4}
                  value={feedback.comment}
                  onChange={handleCommentChange}
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
                  Complete Check-Out
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default CheckOut; 