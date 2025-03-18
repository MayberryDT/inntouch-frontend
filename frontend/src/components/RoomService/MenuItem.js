import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Generate a reliable Unsplash image based on the item name
  const getUnsplashImage = (itemName) => {
    const query = encodeURIComponent(itemName.toLowerCase());
    // Using a specific Unsplash photo ID for food items to ensure images load
    return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&auto=format&q=80`;
  };

  const handleAddToCart = () => {
    addToCart({
      id: item.id || item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      notes: ''
    });
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image={item.imageUrl || getUnsplashImage(item.name)}
          alt={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {item.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary">
              ${item.price ? item.price.toFixed(2) : '0.00'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={!item.isAvailable}
            >
              {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {item.name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MenuItem; 