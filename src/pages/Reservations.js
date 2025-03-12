import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';

const Reservations = () => {
  // Placeholder data for reservations
  const reservations = [
    {
      id: 1,
      roomNumber: '101',
      checkIn: '2024-03-10',
      checkOut: '2024-03-15',
      status: 'confirmed',
    },
    {
      id: 2,
      roomNumber: '205',
      checkIn: '2024-04-01',
      checkOut: '2024-04-05',
      status: 'upcoming',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Reservations
        </Typography>
        <Grid container spacing={3}>
          {reservations.map((reservation) => (
            <Grid item xs={12} md={6} key={reservation.id}>
              <Paper elevation={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Room {reservation.roomNumber}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Check-in: {reservation.checkIn}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Check-out: {reservation.checkOut}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={reservation.status}
                        color={getStatusColor(reservation.status)}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          This is a placeholder page. Real reservation functionality will be implemented soon.
        </Typography>
      </Box>
    </Container>
  );
};

export default Reservations; 