import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto";

// You can customize the palette, typography, etc. here
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default theme;
