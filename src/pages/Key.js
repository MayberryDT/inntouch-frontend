import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs,
  Alert,
  CircularProgress
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryIcon from '@mui/icons-material/History';

// Mock data for digital keys
const mockKeys = [
  {
    id: 'key-001',
    roomNumber: '101',
    isActive: true,
    validFrom: '2023-05-01T12:00:00Z',
    validUntil: '2023-05-08T12:00:00Z',
    lastUsed: '2023-05-02T14:30:00Z'
  },
  {
    id: 'key-002',
    roomNumber: '205',
    isActive: false,
    validFrom: '2023-06-15T12:00:00Z',
    validUntil: '2023-06-22T12:00:00Z',
    lastUsed: null
  }
];

// Mock data for access log
const mockAccessLog = [
  {
    id: 'access-001',
    keyId: 'key-001',
    roomNumber: '101',
    timestamp: '2023-05-02T14:30:00Z',
    status: 'success',
    device: 'iPhone 13'
  },
  {
    id: 'access-002',
    keyId: 'key-001',
    roomNumber: '101',
    timestamp: '2023-05-02T10:15:00Z',
    status: 'success',
    device: 'iPhone 13'
  },
  {
    id: 'access-003',
    keyId: 'key-001',
    roomNumber: '101',
    timestamp: '2023-05-01T18:45:00Z',
    status: 'success',
    device: 'iPhone 13'
  }
];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`key-tabpanel-${index}`}
      aria-labelledby={`key-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const KeyCard = ({ keyData, onActivate, onDeactivate, loading }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <KeyIcon sx={{ mr: 2, color: 'primary.main', fontSize: 30 }} />
          <Typography variant="h5" component="div">
            Room {keyData.roomNumber}
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <Chip 
              label={keyData.isActive ? 'Active' : 'Inactive'} 
              color={keyData.isActive ? 'success' : 'default'}
              icon={keyData.isActive ? <LockOpenIcon /> : <LockIcon />}
            />
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Valid From
            </Typography>
            <Typography variant="body1">
              {formatDate(keyData.validFrom)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Valid Until
            </Typography>
            <Typography variant="body1">
              {formatDate(keyData.validUntil)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Last Used
            </Typography>
            <Typography variant="body1">
              {keyData.lastUsed ? formatDate(keyData.lastUsed) : 'Never used'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {keyData.isActive ? (
          <Button 
            startIcon={<LockIcon />} 
            color="error" 
            onClick={() => onDeactivate(keyData.id)}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Deactivate Key'}
          </Button>
        ) : (
          <Button 
            startIcon={<LockOpenIcon />} 
            color="primary" 
            onClick={() => onActivate(keyData.id)}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Activate Key'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

const AccessLogItem = ({ log }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ListItem divider>
      <ListItemIcon>
        {log.status === 'success' ? 
          <LockOpenIcon color="success" /> : 
          <LockIcon color="error" />
        }
      </ListItemIcon>
      <ListItemText 
        primary={`Room ${log.roomNumber} - ${log.status === 'success' ? 'Access Granted' : 'Access Denied'}`}
        secondary={`${formatDate(log.timestamp)} • ${log.device}`}
      />
    </ListItem>
  );
};

const Key = () => {
  const [tabValue, setTabValue] = useState(0);
  const [keys, setKeys] = useState([]);
  const [accessLog, setAccessLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Mock API call to fetch keys
    const fetchKeys = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setKeys(mockKeys);
      } catch (err) {
        setError('Failed to load keys. Please try again.');
        console.error('Error fetching keys:', err);
      } finally {
        setLoading(false);
      }
    };

    // Mock API call to fetch access log
    const fetchAccessLog = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAccessLog(mockAccessLog);
      } catch (err) {
        console.error('Error fetching access log:', err);
      }
    };

    fetchKeys();
    fetchAccessLog();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleActivateKey = async (keyId) => {
    setActionLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the key state
      setKeys(keys.map(key => 
        key.id === keyId ? { ...key, isActive: true, lastUsed: new Date().toISOString() } : key
      ));
      
      setSuccess('Key activated successfully');
    } catch (err) {
      setError('Failed to activate key. Please try again.');
      console.error('Error activating key:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeactivateKey = async (keyId) => {
    setActionLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the key state
      setKeys(keys.map(key => 
        key.id === keyId ? { ...key, isActive: false } : key
      ));
      
      setSuccess('Key deactivated successfully');
    } catch (err) {
      setError('Failed to deactivate key. Please try again.');
      console.error('Error deactivating key:', err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Digital Keys
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your digital keys and view access history
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="key management tabs"
            variant="fullWidth"
          >
            <Tab 
              label="My Keys" 
              id="key-tab-0" 
              aria-controls="key-tabpanel-0" 
              icon={<KeyIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Access Log" 
              id="key-tab-1" 
              aria-controls="key-tabpanel-1" 
              icon={<HistoryIcon />} 
              iconPosition="start"
            />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : keys.length > 0 ? (
            keys.map(key => (
              <KeyCard 
                key={key.id} 
                keyData={key} 
                onActivate={handleActivateKey} 
                onDeactivate={handleDeactivateKey}
                loading={actionLoading}
              />
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                You don't have any digital keys yet.
              </Typography>
            </Box>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : accessLog.length > 0 ? (
            <List>
              {accessLog.map(log => (
                <AccessLogItem key={log.id} log={log} />
              ))}
            </List>
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No access history available.
              </Typography>
            </Box>
          )}
        </TabPanel>
      </Paper>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Need help with your digital key?
        </Typography>
        <Button variant="outlined" startIcon={<AccessTimeIcon />}>
          Contact Support
        </Button>
      </Box>
    </Container>
  );
};

export default Key; 