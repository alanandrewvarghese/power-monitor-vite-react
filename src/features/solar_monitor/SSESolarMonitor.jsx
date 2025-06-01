import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  Avatar,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  ElectricalServices,
  FlashOn,
  PowerSettingsNew,
  Battery90
} from '@mui/icons-material';

const SSESolarMonitor = () => {
  const [data, setData] = useState({
    voltage: '--',
    current: '--',
    power: '--',
    energy: '--',
  });
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!isOn) return;
    let lastUpdate = 0;
    const eventSource = new window.EventSource(`${import.meta.env.VITE_API_BASE_URL}/solar/latest/live`);
    eventSource.onopen = () => {
      setConnectionStatus('connected');
    };
    eventSource.onmessage = (event) => {
      const now = Date.now();
      if (now - lastUpdate >= 2000) {
        lastUpdate = now;
        const d = JSON.parse(event.data);
        setData({
          voltage: d.voltage.toFixed(2),
          current: d.current.toFixed(2),
          power: d.power.toFixed(2),
          energy: d.energy.toFixed(2),
        });
      }
    };
    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      setConnectionStatus('error');
      setTimeout(() => {
        eventSource.close();
        window.location.reload();
      }, 2000);
    };
    return () => { eventSource.close(); };
  }, [isOn]);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'success';
      case 'error': return 'error';
      default: return 'warning';
    }
  };

  const measurements = [
    { 
      label: 'Voltage', 
      value: data.voltage, 
      unit: 'V', 
      icon: <ElectricalServices />,
      color: '#1976d2'
    },
    { 
      label: 'Current', 
      value: data.current, 
      unit: 'A', 
      icon: <FlashOn />,
      color: '#f57c00'
    },
    { 
      label: 'Power', 
      value: data.power, 
      unit: 'W', 
      icon: <PowerSettingsNew />,
      color: '#388e3c'
    },
    { 
      label: 'Energy', 
      value: data.energy, 
      unit: 'Wh', 
      icon: <Battery90 />,
      color: '#7b1fa2'
    }
  ];

  return (
    <Box sx={{ maxWidth: 1800, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Solar Power Monitor
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControlLabel
            control={<Switch checked={isOn} onChange={() => setIsOn(v => !v)} color="primary" />}
            label={isOn ? 'On' : 'Off'}
            sx={{ mr: 2 }}
          />
          <Chip 
            label={connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
            color={getStatusColor()}
            variant="filled"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </Box>

      <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Real-time Solar Measurements
      </Typography>

      <Grid container spacing={3}>
        {measurements.map((measurement, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%',
                minWidth: 250,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                transition: 'all 0.3s ease',
                '&:hover': {
                  elevation: 6,
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: measurement.color,
                      mr: 2,
                      width: 48,
                      height: 48
                    }}
                  >
                    {measurement.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="medium" color="text.secondary">
                    {measurement.label}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h3" 
                    fontWeight="bold" 
                    color={measurement.color}
                    sx={{ mb: 1 }}
                  >
                    {measurement.value}
                  </Typography>
                  {measurement.unit && (
                    <Typography variant="h6" color="text.secondary">
                      {measurement.unit}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SSESolarMonitor;
