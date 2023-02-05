import { createContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Chat from "./components/Chat";
import { ButtonGroup, Button, Box, Typography } from "@mui/material";
import Gamepad from "./components/Gamepad";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SocketProvider } from "./components/SocketProvider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});


function App() {
  return (
    <SocketProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Box mt={5}>
          <Gamepad />
        </Box>
      </ThemeProvider>
    </SocketProvider>
  );
}

export default App;
