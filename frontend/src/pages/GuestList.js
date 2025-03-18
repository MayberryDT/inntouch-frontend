import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState('all');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/guests?status=${status}&page=${page + 1}&limit=${rowsPerPage}`);
        setGuests(res.data.guests);
        setTotal(res.data.total);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch guests');
        setLoading(false);
      }
    };

    fetchGuests();
  }, [page, rowsPerPage, status]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Guest Management
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={status}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="all">All Guests</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="checked-in">Checked In</MenuItem>
            <MenuItem value="checked-out">Checked Out</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="guest table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check-In Time</TableCell>
                  <TableCell>Check-Out Time</TableCell>
                  <TableCell>Reservation ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow
                    key={guest.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {guest.name}
                    </TableCell>
                    <TableCell>{guest.email}</TableCell>
                    <TableCell>{guest.phone}</TableCell>
                    <TableCell>{guest.status}</TableCell>
                    <TableCell>{formatDate(guest.checkInTime)}</TableCell>
                    <TableCell>{formatDate(guest.checkOutTime)}</TableCell>
                    <TableCell>{guest.reservationId}</TableCell>
                  </TableRow>
                ))}
                {guests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No guests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Container>
  );
};

export default GuestList; 