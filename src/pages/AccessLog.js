import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const AccessLog = () => {
  // Placeholder data for access logs
  const accessLogs = [
    {
      id: 1,
      timestamp: new Date().toLocaleString(),
      action: 'Key Activated',
      roomNumber: '101',
      status: 'Success',
    },
    {
      id: 2,
      timestamp: new Date().toLocaleString(),
      action: 'Door Access',
      roomNumber: '101',
      status: 'Success',
    },
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Access Log
        </Typography>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accessLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.roomNumber}</TableCell>
                    <TableCell>{log.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          This is a placeholder page. Real access log functionality will be implemented soon.
        </Typography>
      </Box>
    </Container>
  );
};

export default AccessLog; 