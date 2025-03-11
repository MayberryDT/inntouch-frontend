import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // Primary Blue
    },
    secondary: {
      main: '#00796B', // Secondary Teal
    },
    error: {
      main: '#F44336', // Error Red
    },
    warning: {
      main: '#FFC107', // Warning Amber
    },
    success: {
      main: '#4CAF50', // Success Green
    },
    text: {
      primary: '#212121', // Dark Gray
      secondary: '#757575', // Medium Gray
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '24px',
      fontWeight: 500,
    },
    h2: {
      fontSize: '20px',
      fontWeight: 500,
    },
    h3: {
      fontSize: '18px',
      fontWeight: 500,
    },
    h4: {
      fontSize: '16px',
      fontWeight: 500,
    },
    h5: {
      fontSize: '14px',
      fontWeight: 500,
    },
    h6: {
      fontSize: '12px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '16px',
    },
    body2: {
      fontSize: '14px',
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8, // Base spacing unit of 8px
});

export default theme; 