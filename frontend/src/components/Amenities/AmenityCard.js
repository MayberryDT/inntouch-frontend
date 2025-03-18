import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AmenityCard = ({ amenity }) => {
  const navigate = useNavigate();
  
  // Generate a reliable Unsplash image based on the amenity name
  const getUnsplashImage = (amenityName) => {
    // Using a specific Unsplash photo ID for spa/hotel amenities to ensure images load
    return `https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=200&fit=crop&auto=format&q=80`;
  };
  
  const handleBook = () => {
    navigate(`/amenities/${amenity.id}/book`);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={amenity.imageUrl || getUnsplashImage(amenity.name)}
        alt={amenity.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {amenity.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {amenity.description}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" color="primary">
            ${amenity.price.toFixed(2)}
          </Typography>
          
          <Box>
            {amenity.duration && (
              <Chip 
                label={`${amenity.duration} min`} 
                size="small" 
                sx={{ mr: 1 }}
              />
            )}
            {amenity.maxParticipants && (
              <Chip 
                label={`Max ${amenity.maxParticipants} people`} 
                size="small" 
              />
            )}
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleBook}
          disabled={!amenity.isActive}
        >
          View Available Slots
        </Button>
      </CardContent>
    </Card>
  );
};

export default AmenityCard; 