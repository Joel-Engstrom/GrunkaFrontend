import {
  Box,
  Snackbar,
  Alert,
  Paper,
  Container,
  Stack,
  Skeleton,
  Card,
  Typography,
} from "@mui/material";
import "joypad.js"; // ES6
import { useState, useEffect, useContext } from "react";
import Joystick from "./Joystick";
import InfoCard from "./InfoCard";
import { SocketContext } from "./SocketProvider";
import ConnectedContext from "./ConnectedContext";

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
  const [controllerOneAxes, setControllerOneAxes] = useState([0, 0, 0, 0]);
  const [controllerTwoAxes, setControllerTwoAxes] = useState([0, 0, 0, 0]);
  const [open, setOpen] = useState(false);
  const [connected, setConnectedLocal] = useState(false);

  const { setConnected } = useContext(ConnectedContext);
  const handleConnect = () => setConnected(true);
  const handleDisconnect = () => setConnected(false);

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
    console.log(e);

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
      console.log(e);
      const { axis, axisMovementValue, stickMoved } = e.detail;
      const id = e.detail.gamepad.index;
      const tempAxes = e.detail.gamepad.axes;

      sendToSocket({
        stick: stickMoved,
        axis: axis,
        value: axisMovementValue,
        axes: tempAxes,
        controller: id,
      });
      if (id === 0) {
        setControllerOneAxes(tempAxes);
      } else if (id === 1) {
        setControllerTwoAxes(tempAxes);
      }
    });
  }, []);

  const sendToSocket = (data) => {
    socket.emit("input", data);
  };

  socket.on("state", (currentState) => {
    setState(currentState);
  });

  socket.on("connect", () => {
    setConnectedLocal(true);
    handleConnect();
  });

  socket.on("disconnect", () => {
    setConnectedLocal(false);
    handleDisconnect();
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
        <Stack direction="row" justifyContent="space-around">
          <Stack direction="column" justifyContent="space-around" pt="20pt">
            <Typography variant="h4">Förar'N</Typography>
            <Stack direction="row" justifyContent="space-evenly">
              <Joystick
                x={controllerOneAxes[0]}
                y={controllerOneAxes[1]}
                title="Vänster"
              />
              <Joystick
                x={controllerOneAxes[2]}
                y={controllerOneAxes[3]}
                title="Höger"
              />
            </Stack>
          </Stack>
          <Stack direction="column" justifyContent="space-around" pt="20pt">
            <Typography variant="h4">Kloar'N</Typography>
            <Stack direction="row" justifyContent="space-evenly">
              <Joystick
                x={controllerTwoAxes[0]}
                y={controllerTwoAxes[1]}
                title="Vänster"
              />
              <Joystick
                x={controllerTwoAxes[2]}
                y={controllerTwoAxes[3]}
                title="Höger"
              />
            </Stack>
          </Stack>
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
