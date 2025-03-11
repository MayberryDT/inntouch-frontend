import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Key from './pages/Key';
import ResetPassword from './pages/ResetPassword';
import AccessLog from './pages/AccessLog';
import Reservations from './pages/Reservations';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Protected routes wrapped in Layout */}
      <Route 
        path="/" 
        element={
          <Layout>
            <Home />
          </Layout>
        } 
      />
      
      <Route 
        path="/key" 
        element={
          <ProtectedRoute>
            <Layout>
              <Key />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/access-log" 
        element={
          <ProtectedRoute>
            <Layout>
              <AccessLog />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/reservations" 
        element={
          <ProtectedRoute>
            <Layout>
              <Reservations />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 