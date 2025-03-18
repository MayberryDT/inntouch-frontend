import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuItem from './MenuItem';
import Cart from './Cart';

const RoomServicePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
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
      const sampleMenuItems = [
        // Breakfast items
        {
          id: '1',
          name: 'Continental Breakfast',
          description: 'Assorted pastries, fresh fruit, yogurt, and coffee or tea',
          price: 18.99,
          category: 'Breakfast',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '2',
          name: 'American Breakfast',
          description: 'Two eggs any style, bacon or sausage, toast, and breakfast potatoes',
          price: 22.99,
          category: 'Breakfast',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '3',
          name: 'Avocado Toast',
          description: 'Multigrain toast topped with avocado, poached eggs, and microgreens',
          price: 16.99,
          category: 'Breakfast',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=300&h=200&fit=crop&auto=format&q=80'
        },
        
        // Appetizers
        {
          id: '4',
          name: 'Bruschetta',
          description: 'Toasted baguette topped with diced tomatoes, basil, and balsamic glaze',
          price: 12.99,
          category: 'Appetizers',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '5',
          name: 'Shrimp Cocktail',
          description: 'Chilled jumbo shrimp served with cocktail sauce and lemon',
          price: 18.99,
          category: 'Appetizers',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1608176439783-556c7f59f263?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '6',
          name: 'Caesar Salad',
          description: 'Romaine lettuce with Caesar dressing, croutons, and parmesan',
          price: 14.99,
          category: 'Appetizers',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=200&fit=crop&auto=format&q=80'
        },
        
        // Main Courses
        {
          id: '7',
          name: 'Grilled Salmon',
          description: 'Atlantic salmon with lemon butter sauce, served with seasonal vegetables',
          price: 28.99,
          category: 'Main Courses',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '8',
          name: 'Filet Mignon',
          description: '8oz filet with red wine reduction, mashed potatoes, and asparagus',
          price: 42.99,
          category: 'Main Courses',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '9',
          name: 'Vegetable Risotto',
          description: 'Creamy arborio rice with seasonal vegetables and parmesan',
          price: 24.99,
          category: 'Main Courses',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop&auto=format&q=80'
        },
        
        // Desserts
        {
          id: '10',
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
          price: 12.99,
          category: 'Desserts',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '11',
          name: 'New York Cheesecake',
          description: 'Classic cheesecake with graham cracker crust and berry compote',
          price: 10.99,
          category: 'Desserts',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '12',
          name: 'Fresh Fruit Platter',
          description: 'Assortment of seasonal fruits',
          price: 14.99,
          category: 'Desserts',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=300&h=200&fit=crop&auto=format&q=80'
        },
        
        // Beverages
        {
          id: '13',
          name: 'Fresh Orange Juice',
          description: 'Freshly squeezed orange juice',
          price: 6.99,
          category: 'Beverages',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '14',
          name: 'Bottled Water',
          description: 'Still or sparkling water',
          price: 4.99,
          category: 'Beverages',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=300&h=200&fit=crop&auto=format&q=80'
        },
        {
          id: '15',
          name: 'Coffee or Tea',
          description: 'Freshly brewed coffee or selection of teas',
          price: 5.99,
          category: 'Beverages',
          isAvailable: true,
          imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&auto=format&q=80'
        }
      ];
      setMenuItems(sampleMenuItems);
      setLoading(false);
    }, 500); // Simulate loading delay
  }, []);

  const handleOrderSubmit = () => {
    setCartOpen(false);
    setSnackbar({
      open: true,
      message: 'Your order has been placed successfully!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Define the order of categories
  const categoryOrder = ['Breakfast', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'];
  
  // Sort categories according to the defined order
  const sortedCategories = Object.keys(groupedMenuItems).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" component="h1">
          Room Service
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<ShoppingCartIcon />}
          onClick={() => setCartOpen(true)}
        >
          View Cart
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading menu...</Typography>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        sortedCategories.map((category) => (
          <Box key={category} mb={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              {category}
            </Typography>
            <Grid container spacing={3}>
              {groupedMenuItems[category].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <MenuItem item={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}

      <Cart 
        open={cartOpen} 
        onClose={() => setCartOpen(false)} 
        onOrderSubmit={handleOrderSubmit}
      />

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

export default RoomServicePage; 