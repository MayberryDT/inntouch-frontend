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
import axios from 'axios';

// Mock data for charts (fallback if API fails)
const responseTimeData = [
  { day: 'Mon', time: 2.8 },
  { day: 'Tue', time: 2.5 },
  { day: 'Wed', time: 3.2 },
  { day: 'Thu', time: 3.5 },
  { day: 'Fri', time: 4.1 },
  { day: 'Sat', time: 5.2 },
  { day: 'Sun', time: 4.3 }
];

const satisfactionTrendData = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 87 },
  { month: 'Mar', score: 86 },
  { month: 'Apr', score: 89 },
  { month: 'May', score: 91 },
  { month: 'Jun', score: 92 }
];

const interactionChannelData = [
  { channel: 'In-App Chat', count: 486 },
  { channel: 'SMS', count: 210 },
  { channel: 'Phone', count: 95 },
  { channel: 'Front Desk', count: 51 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const requestCategoryData = [
  { category: 'Room Service', count: 127 },
  { category: 'Housekeeping', count: 86 },
  { category: 'Concierge', count: 74 },
  { category: 'Maintenance', count: 48 },
  { category: 'Amenities', count: 33 }
];

// Configure axios
axios.defaults.baseURL = 'http://localhost:3000';

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('Loading...');
  const [stats, setStats] = useState({
    totalInteractions: 0,
    responseTime: 0,
    satisfactionScore: 0,
    totalRequests: 0
  });
  const [chartData, setChartData] = useState({
    responseTimeByDay: responseTimeData,
    satisfactionTrend: satisfactionTrendData,
    interactionChannels: interactionChannelData,
    requestCategories: requestCategoryData
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch from API first
        try {
          // Get overview stats
          const overviewResponse = await axios.get('/api/analytics/overview');
          
          if (overviewResponse.data && overviewResponse.data.success) {
            setStats({
              totalInteractions: overviewResponse.data.data.totalGuestInteractions || 0,
              responseTime: overviewResponse.data.data.avgResponseTime || 0,
              satisfactionScore: overviewResponse.data.data.guestSatisfactionScore || 0,
              totalRequests: overviewResponse.data.data.totalRequests || 0
            });
            
            // Get chart data
            const [interactionsRes, requestsRes, responseTimeRes, satisfactionRes] = await Promise.all([
              axios.get('/api/analytics/interactions/channels'),
              axios.get('/api/analytics/requests/categories'),
              axios.get('/api/analytics/response-time/daily'),
              axios.get('/api/analytics/satisfaction/trend')
            ]);
            
            setChartData({
              interactionChannels: interactionsRes.data.data || interactionChannelData,
              requestCategories: requestsRes.data.data || requestCategoryData,
              responseTimeByDay: responseTimeRes.data.data || responseTimeData,
              satisfactionTrend: satisfactionRes.data.data || satisfactionTrendData
            });
            
            setDataSource('REAL API DATA');
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.error('API fetch failed, falling back to mock data:', apiError);
        }
        
        // If API fetch fails, fallback to mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalInteractions: 842,
          responseTime: 3.5,
          satisfactionScore: 92,
          totalRequests: 368
        });
        
        setChartData({
          responseTimeByDay: responseTimeData,
          satisfactionTrend: satisfactionTrendData,
          interactionChannels: interactionChannelData,
          requestCategories: requestCategoryData
        });
        
        setDataSource('MOCK DATA');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Unable to load analytics data. Please try again later.');
        setDataSource('ERROR');
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
          Guest Experience Analytics
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              bgcolor: dataSource === 'REAL API DATA' ? 'success.main' : 'warning.main',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'bold'
            }}
          >
            {dataSource}
          </Typography>
        </Box>
        
        <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            Guest Experience Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Interactions
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalInteractions}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +16% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Avg. Response Time
                  </Typography>
                  <Typography variant="h4">
                    {stats.responseTime} min
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    -0.3 min from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Satisfaction Score
                  </Typography>
                  <Typography variant="h4">
                    {stats.satisfactionScore}%
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +2% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Requests
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalRequests}
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
                Response Time by Day
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData.responseTimeByDay}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} min`, 'Response Time']} />
                  <Legend />
                  <Bar dataKey="time" name="Response Time (min)" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Guest Satisfaction Trend
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData.satisfactionTrend}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Satisfaction']} />
                  <Legend />
                  <Line type="monotone" dataKey="score" name="Satisfaction Score (%)" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Interaction Channels
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.interactionChannels}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ channel, percent }) => `${channel}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="channel"
                  >
                    {chartData.interactionChannels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} interactions`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Request Categories
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.requestCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="category"
                  >
                    {chartData.requestCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} requests`, name]} />
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