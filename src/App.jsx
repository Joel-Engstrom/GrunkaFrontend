import { createContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Chat from "./components/Chat";
import { ButtonGroup, Button, Box, Typography } from "@mui/material";
import Gamepad from "./components/Gamepad";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SocketProvider } from "./components/SocketProvider";
import ConnectedContext from "./components/ConnectedContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [connected, setConnected] = useState(false);

  return (
    <SocketProvider>
      <ConnectedContext.Provider value={{ connected, setConnected }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <Box mt={5}>
            <Gamepad />
          </Box>
        </ThemeProvider>
      </ConnectedContext.Provider>
    </SocketProvider>
  );
}

export default App;
