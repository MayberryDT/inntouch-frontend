import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Mock data for charts
const occupancyData = [
  { name: 'Mon', rate: 75 },
  { name: 'Tue', rate: 82 },
  { name: 'Wed', rate: 95 },
  { name: 'Thu', rate: 88 },
  { name: 'Fri', rate: 92 },
  { name: 'Sat', rate: 97 },
  { name: 'Sun', rate: 86 }
];

const revenueData = [
  { name: 'Jan', revenue: 24500 },
  { name: 'Feb', revenue: 18200 },
  { name: 'Mar', revenue: 32100 },
  { name: 'Apr', revenue: 28400 },
  { name: 'May', revenue: 39800 },
  { name: 'Jun', revenue: 46200 },
  { name: 'Jul', revenue: 52100 }
];

const roomTypeData = [
  { name: 'Standard', value: 45 },
  { name: 'Deluxe', value: 30 },
  { name: 'Suite', value: 15 },
  { name: 'Executive', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const bookingSourceData = [
  { name: 'Website', value: 40 },
  { name: 'OTAs', value: 35 },
  { name: 'Direct', value: 15 },
  { name: 'Other', value: 10 }
];

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalGuests: 0,
    occupancyRate: 0,
    avgStay: 0,
    revenue: 0
  });

  useEffect(() => {
    // Simulate loading data
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalGuests: 843,
          occupancyRate: 82,
          avgStay: 3.2,
          revenue: 267500
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Unable to load analytics data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
        <Button variant="contained" onClick={handleBackToDashboard} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Analytics Dashboard
        </Typography>
        
        <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            Hotel Performance Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Guests
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalGuests}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +12% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Occupancy Rate
                  </Typography>
                  <Typography variant="h4">
                    {stats.occupancyRate}%
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +5% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Average Stay
                  </Typography>
                  <Typography variant="h4">
                    {stats.avgStay} days
                  </Typography>
                  <Typography variant="body2" color="info.main">
                    -0.2 days from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4">
                    ${stats.revenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +8% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Weekly Occupancy Rate
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={occupancyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rate" name="Occupancy Rate (%)" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Monthly Revenue
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Room Type Distribution
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roomTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roomTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Booking Source
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bookingSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bookingSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            startIcon={<DashboardIcon />}
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Analytics; 