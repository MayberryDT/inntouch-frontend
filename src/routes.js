import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import page components
import Home from './pages/Home';
import Login from './pages/Login';
import Key from './pages/Key';

// This is a placeholder for future page components
const Register = () => <div>Register Page</div>;
const Profile = () => <div>Profile Page</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/key" element={<Key />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;