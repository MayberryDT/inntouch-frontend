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
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const mockMenu = {
  breakfast: [
    {
      id: 'b1',
      name: 'Continental Breakfast',
      description: 'Freshly baked croissants, jam, butter, coffee or tea',
      price: 18,
      image: 'https://source.unsplash.com/800x600/?breakfast'
    },
    {
      id: 'b2',
      name: 'American Breakfast',
      description: 'Eggs any style, bacon, toast, hash browns, coffee or tea',
      price: 22,
      image: 'https://source.unsplash.com/800x600/?eggs'
    }
  ],
  lunch: [
    {
      id: 'l1',
      name: 'Caesar Salad',
      description: 'Romaine lettuce, croutons, parmesan cheese, caesar dressing',
      price: 16,
      image: 'https://source.unsplash.com/800x600/?salad'
    },
    {
      id: 'l2',
      name: 'Club Sandwich',
      description: 'Triple-decker with turkey, bacon, lettuce, tomato',
      price: 20,
      image: 'https://source.unsplash.com/800x600/?sandwich'
    }
  ],
  dinner: [
    {
      id: 'd1',
      name: 'Grilled Salmon',
      description: 'Fresh salmon with seasonal vegetables and rice',
      price: 32,
      image: 'https://source.unsplash.com/800x600/?salmon'
    },
    {
      id: 'd2',
      name: 'Beef Tenderloin',
      description: '8oz tenderloin with mashed potatoes and asparagus',
      price: 38,
      image: 'https://source.unsplash.com/800x600/?steak'
    }
  ]
};

const RoomService = () => {
  const [category, setCategory] = useState('breakfast');
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleAddToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const handleRemoveFromCart = (item) => {
    setCart(prev => {
      const newCount = (prev[item.id] || 0) - 1;
      const newCart = { ...prev };
      if (newCount <= 0) {
        delete newCart[item.id];
      } else {
        newCart[item.id] = newCount;
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = [...mockMenu.breakfast, ...mockMenu.lunch, ...mockMenu.dinner]
        .find(item => item.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItems = () => {
    return Object.entries(cart).map(([itemId, quantity]) => {
      const item = [...mockMenu.breakfast, ...mockMenu.lunch, ...mockMenu.dinner]
        .find(item => item.id === itemId);
      return { ...item, quantity };
    });
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log('Order placed:', {
      items: getCartItems(),
      total: getCartTotal(),
      specialInstructions
    });
    setCart({});
    setSpecialInstructions('');
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Room Service Menu</Typography>
        <IconButton
          color="primary"
          onClick={() => setIsCartOpen(true)}
        >
          <Badge badgeContent={Object.values(cart).reduce((a, b) => a + b, 0)} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      <Tabs
        value={category}
        onChange={(e, newValue) => setCategory(newValue)}
        sx={{ mb: 4 }}
      >
        <Tab value="breakfast" label="Breakfast" />
        <Tab value="lunch" label="Lunch" />
        <Tab value="dinner" label="Dinner" />
      </Tabs>

      <Grid container spacing={3}>
        {mockMenu[category].map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${item.price}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {cart[item.id] > 0 && (
                      <>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{cart[item.id]}</Typography>
                      </>
                    )}
                    <IconButton
                      color="primary"
                      onClick={() => handleAddToCart(item)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>Your Order</Typography>
          <List>
            {getCartItems().map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price} x ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="body2">
                      ${item.price * item.quantity}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Total: ${getCartTotal()}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setIsCheckoutOpen(true)}
              disabled={getCartItems().length === 0}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Dialog
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <TextField
            label="Special Instructions"
            multiline
            rows={4}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Any allergies or special requests?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCheckoutOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCheckout}
          >
            Place Order (${getCartTotal()})
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoomService; 