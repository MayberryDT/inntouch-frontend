import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const EnvTest = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Environment Variables Test</Typography>
        
        <Box mt={3}>
          <Typography variant="subtitle1">
            NODE_ENV: {process.env.NODE_ENV}
          </Typography>
          
          <Typography variant="subtitle1">
            REACT_APP_API_URL: {process.env.REACT_APP_API_URL || 'Not defined'}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default EnvTest; 