import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Chat from "./components/Chat";
import { ButtonGroup, Button, Box, Typography } from "@mui/material";
import Gamepad from "./components/Gamepad";

function App() {
  return (
    <>
      <Header />
      <Box mt={5}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="info.main"
          fontWeight={"bold"}
          gutterBottom
        >
          Grunka Visualizer
        </Typography>
        <Gamepad />
      </Box>
    </>
  );
}

export default App;
