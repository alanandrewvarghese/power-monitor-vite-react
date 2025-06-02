import { Box, Grid } from '@mui/material';
import SSEAcMonitor from "../ac_monitor/SSEAcMonitor";
import SSESolarMonitor from "../solar_monitor/SSESolarMonitor";

const HomePage = () => {
  return (
    <Box sx={{ p: 2, minHeight: '100vh', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
      <Grid container spacing={3} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SSEAcMonitor />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SSESolarMonitor />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;