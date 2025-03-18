import React, { useContext, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ExitToApp as LogoutIcon,
  Restaurant as RestaurantIcon,
  Spa as SpaIcon,
  Chat as ChatIcon,
  BarChart as AnalyticsIcon,
  BugReport as BugReportIcon
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChatClick = () => {
    // Automatically sign in to chat with the current user's ID
    navigate(`/chat/${user.id}`);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.8)',
              }
            }}
          >
            InnTouch
          </Typography>
          {user && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.email}
            </Typography>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/guests" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Guests" />
            </ListItem>
            <ListItem button component={Link} to="/room-service" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary="Room Service" />
            </ListItem>
            <ListItem button component={Link} to="/amenities" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <SpaIcon />
              </ListItemIcon>
              <ListItemText primary="Amenities" />
            </ListItem>
            <ListItem button onClick={handleChatClick}>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItem>
            <ListItem button component={Link} to="/analytics" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            <ListItem button component="a" href="http://localhost:3000/" target="_blank">
              <ListItemIcon>
                <BugReportIcon />
              </ListItemIcon>
              <ListItemText primary="API Tester" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: 8
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout; 