import {
  Box,
  Snackbar,
  Alert,
  Paper,
  breadcrumbsClasses,
  Container,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import "joypad.js"; // ES6
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Joystick from "./Joystick";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Gamepad = ({}) => {
  const socket = io("ws://localhost:8000");
  const [controller, setController] = useState("Ingen kontroller ansluten!");
  const [state, setState] = useState({ base: 90, lowerArm: 90 });
  const [axes, setAxes] = useState([0, 0, 0, 0]);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    joypad.on("connect", (e) => {
      const { gamepad } = e;
      const { id } = e.gamepad;
      const options = {
        startDelay: 100,
        duration: 500,
        weakMagnitude: 1,
        strongMagnitude: 1,
      };
      joypad.set({
        axisMovementThreshold: 0.1,
      });

      joypad.vibrate(gamepad, options);

      handleClick();
      setController(id);
    });
  }, []);

  useEffect(() => {
    joypad.on("disconnect", (e) => {
      setController("Ingen kontroller ansluten!");
    });
  }, []);

  useEffect(() => {
    joypad.on("button_press", (e) => {
      const { buttonName } = e.detail;

      console.log(`${buttonName} was pressed!`);
      sendToSocket(buttonName);
    });
  }, []);

  useEffect(() => {
    joypad.on("axis_move", (e) => {
      const { axis, axisMovementValue, stickMoved } = e.detail;

      sendToSocket({ stick: stickMoved, axis: axis, value: axisMovementValue });
      setAxes(e.detail.gamepad.axes);
    });
  }, []);

  const sendToSocket = (data) => {
    socket.emit("input", data);
  };

  useEffect(() => {
    socket.on("state", (currentState) => {
      console.log(
        `Base: ${currentState.base} | Lower arm: ${currentState.lowerArm}`
      );
      setState(currentState);
    });
  }, []);

  return (
    <>
      <Box>{`Använder kontroller: ${controller}`}</Box>
      <Box>{`Basen: [${state.base}]`}</Box>
      <Box>{`Lägre arm: [${state.lowerArm}]`}</Box>
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Joystick x={axes[0]} y={axes[1]} title="Vänster Joystick" />
          <Joystick x={axes[2]} y={axes[3]} title="Höger Joystick" />
        </Stack>
      </Container>

      <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid2 xs={6}>
          <Item>1</Item>
        </Grid2>
        <Grid2 xs={6}>
          <Item>2</Item>
        </Grid2>
        <Grid2 xs={6}>
          <Item>3</Item>
        </Grid2>
        <Grid2 xs={6}>
          <Item>4</Item>
        </Grid2>
      </Grid2>

      {controller !== "Ingen kontroller hittades!" && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            Använder kontroller: {controller}
          </Alert>
        </Snackbar>
      )}
      {controller === "Ingen kontroller ansluten!" && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Kontroller bortkopplad!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Gamepad;
