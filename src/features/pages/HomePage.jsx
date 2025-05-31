import SSEAcMonitor from "../ac_monitor/SSEAcMonitor";
import SSESolarMonitor from "../solar_monitor/SSESolarMonitor";

const HomePage = () => {
  return (<>
    <SSEAcMonitor />
    <SSESolarMonitor />
  </>);
};

export default HomePage;