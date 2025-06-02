import { Box, Grid } from '@mui/material';
import SSEAcMonitor from "../ac_monitor/SSEAcMonitor";
import SSESolarMonitor from "../solar_monitor/SSESolarMonitor";

const HomePage = () => {
  return (
    <Box sx={{ p: 2, minHeight: '100vh' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%' }}>
            <SSEAcMonitor />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%' }}>
            <SSESolarMonitor />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;