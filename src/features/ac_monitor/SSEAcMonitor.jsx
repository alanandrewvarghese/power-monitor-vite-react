import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
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
  Battery90,
  Waves,
  Functions
} from '@mui/icons-material';
import { loadEnergyAtMidnight, getEnergyAtMidnight } from '../../services/energyAtMidnight';

const SSEAcMonitor = () => {
  const [data, setData] = useState({
    voltage: '--',
    current: '--',
    power: '--',
    energy: '--',
    frequency: '--',
    power_factor: '--',
  });
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    loadEnergyAtMidnight();
  }, []);

  const midnightData = getEnergyAtMidnight();

  useEffect(() => {
    if (!isOn) return;
    const eventSource = new window.EventSource(`${import.meta.env.VITE_API_BASE_URL}/ac/latest/live`);
    
    eventSource.onopen = () => {
      setConnectionStatus('connected');
    };
    
    eventSource.onmessage = (event) => {
      const d = JSON.parse(event.data);
      setData({
        voltage: d.voltage.toFixed(2),
        current: d.current.toFixed(2),
        power: d.power.toFixed(2),
        energy: d.energy.toFixed(2),
        frequency: d.frequency.toFixed(2),
        power_factor: d.power_factor.toFixed(2),
      });
    };
    
    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      setConnectionStatus('error');
      setTimeout(() => {
        eventSource.close();
        window.location.reload();
      }, 2000);
    };
    
    return () => eventSource.close();
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
      value: data.energy - midnightData.energyConsumptionAtMidnight || 0, 
      unit: 'Wh', 
      icon: <Battery90 />,
      color: '#7b1fa2'
    },
    { 
      label: 'Frequency', 
      value: data.frequency, 
      unit: 'Hz', 
      icon: <Waves />,
      color: '#d32f2f'
    },
    { 
      label: 'Power Factor', 
      value: data.power_factor, 
      unit: '😁', 
      icon: <Functions />,
      color: '#303f9f'
    }
  ];

  // Access the energy-at-midnight data


  return (
    <Box sx={{maxWidth:798, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          AC Power Monitor
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
        Real-time Power Measurements
      </Typography>

      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' , alignItems: 'center' }}>
        {measurements.map((measurement, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} >
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

export default SSEAcMonitor;
