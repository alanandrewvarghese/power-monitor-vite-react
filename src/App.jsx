import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import HomePage from "./features/pages/HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
