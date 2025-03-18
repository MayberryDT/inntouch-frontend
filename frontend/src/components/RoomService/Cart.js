import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../context/CartContext';

const Cart = ({ open, onClose, onOrderSubmit }) => {
  const { items, removeFromCart, updateQuantity, updateNotes, clearCart } = useCart();
  const [roomNumber, setRoomNumber] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleNotesChange = (itemId, notes) => {
    updateNotes(itemId, notes);
  };

  const handleCheckout = async () => {
    if (!roomNumber) {
      setSnackbar({
        open: true,
        message: 'Please enter your room number',
        severity: 'error'
      });
      return;
    }

    if (items.length === 0) {
      setSnackbar({
        open: true,
        message: 'Your cart is empty',
        severity: 'error'
      });
      return;
    }

    try {
      // Simulate successful order
      console.log('Order placed:', {
        roomNumber,
        items,
        total: calculateTotal()
      });
      
      // Clear cart and show success message
      clearCart();
      setSnackbar({
        open: true,
        message: 'Your order has been placed successfully!',
        severity: 'success'
      });

      // Close cart and notify parent component
      onClose();
      if (onOrderSubmit) {
        onOrderSubmit();
      }
    } catch (err) {
      console.error('Order failed:', err);
      setSnackbar({
        open: true,
        message: `Order failed: ${err.message}`,
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Your Order
          </Typography>

          {items.length === 0 ? (
            <Typography variant="body1" sx={{ my: 4, textAlign: 'center' }}>
              Your cart is empty
            </Typography>
          ) : (
            <>
              <List>
                {items.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <Box sx={{ width: '100%' }}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle1">{item.name}</Typography>
                          <Typography variant="subtitle1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" mt={1}>
                          <Button
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                          <Button
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>

                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => removeFromCart(item.id)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </Box>

                        <TextField
                          placeholder="Special instructions"
                          variant="outlined"
                          size="small"
                          fullWidth
                          margin="dense"
                          value={item.notes || ''}
                          onChange={(e) => handleNotesChange(item.id, e.target.value)}
                        />
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>

              <Box mt={2}>
                <TextField
                  label="Room Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  required
                />
              </Box>

              <Box mt={3} mb={2}>
                <Typography variant="h6" gutterBottom>
                  Total: ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleCheckout}
                disabled={items.length === 0 || !roomNumber}
              >
                Place Order
              </Button>
            </>
          )}
        </Box>
      </Drawer>

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
    </>
  );
};

export default Cart; 