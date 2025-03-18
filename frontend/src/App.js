import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CheckIn from './pages/CheckIn';
import CheckOut from './pages/CheckOut';
import GuestList from './pages/GuestList';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import EnvTest from './EnvTest';

// Room Service and Amenities Components
import RoomServicePage from './components/RoomService/RoomServicePage';
import AmenitiesPage from './components/Amenities/AmenitiesPage';
import BookingForm from './components/Amenities/BookingForm';

// Context
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/env-test" element={<EnvTest />} />
            <Route path="/chat/:guestId?" element={<Chat />} />
            
            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="guests" element={<GuestList />} />
              <Route path="room-service" element={<RoomServicePage />} />
              <Route path="amenities" element={<AmenitiesPage />} />
              <Route path="amenities/:amenityId/book" element={<BookingForm />} />
              <Route path="analytics" element={<Analytics />} />
              {/* Chat route inside layout for when accessed via menu */}
              <Route path="chat/:guestId?" element={<Chat />} />
            </Route>
            
            {/* Redirect to dashboard if path doesn't exist */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 