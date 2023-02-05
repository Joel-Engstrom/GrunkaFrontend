import {
  Box,
  Snackbar,
  Alert,
  Paper,
  Container,
  Stack,
  Skeleton,
  Card,
} from "@mui/material";
import "joypad.js"; // ES6
import { useState, useEffect, useContext } from "react";
import Joystick from "./Joystick";
import InfoCard from "./InfoCard";
import { SocketContext } from "./SocketProvider";

const Gamepad = ({}) => {
  const socket = useContext(SocketContext);
  if (socket === null) return;
  const [controller, setController] = useState("Ingen kontroller ansluten!");
  const [state, setState] = useState({
    base: 90,
    lowerArm: 90,
    upperArm: 90,
    claw: 90,
  });
  const [axes, setAxes] = useState([0, 0, 0, 0]);
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);

  

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  joypad.on("connect", (e) => {
    const { gamepad } = e;
    const { id } = e.gamepad;
    const options = {
      startDelay: 50,
      duration: 450,
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

  socket.on("state", (currentState) => {
    setState(currentState);
  });

  socket.on("connect", () => {
    setConnected(true);
  });

  socket.on("disconnect", () => {
    setConnected(false);
  });

  return (
    <>
      {connected ? (
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ minWidth: 275 }}>
            <Card variant="elevation">
              <InfoCard value={state.base} title="Basen" />
            </Card>
          </Box>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="elevation">
              <InfoCard value={state.lowerArm} title="Nedre Armen" />
            </Card>
          </Box>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="elevation">
              <InfoCard value={state.upperArm} title="Övre Armen" />
            </Card>
          </Box>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="elevation">
              <InfoCard value={state.claw} title="Klon" />
            </Card>
          </Box>
        </Stack>
      ) : (
        <Stack direction="row" justifyContent="space-between">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={275}
            height={150}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={275}
            height={150}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={275}
            height={150}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={275}
            height={150}
          />
        </Stack>
      )}

      <Container>
        <Stack direction="row" justifyContent="space-evenly" pt="50pt">
          <Joystick x={axes[0]} y={axes[1]} title="Vänster Joystick" />
          <Joystick x={axes[2]} y={axes[3]} title="Höger Joystick" />
        </Stack>
      </Container>

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
