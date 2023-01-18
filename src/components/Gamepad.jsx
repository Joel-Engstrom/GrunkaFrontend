import { Box, Snackbar, Alert } from "@mui/material";
import "joypad.js"; // ES6
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Joystick from "./Joystick";

const Gamepad = ({}) => {
  const socket = io("ws://localhost:8000");
  const [controller, setController] = useState("Ingen kontroller hittades!");
  const [leftStick, setLeftStick] = useState({
    type: "left",
    horizontal: 0,
    vertical: 0,
  });
  const [rightStick, setRightStick] = useState({
    type: "right",
    horizontal: 0,
    vertical: 0,
  });
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
        axisMovementThreshold: 0.3,
      });

      joypad.vibrate(gamepad, options);

      handleClick();
      setController(id);
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
      /* switch (stickMoved) {
        case "left_stick":
          if (axis === 0) {
            setLeftStick({ ...leftStick, horizontal: axisMovementValue });
          } else if (axis === 1) {
            setLeftStick({ ...leftStick, vertical: axisMovementValue });
          }
          sendToSocket(leftStick);
          break;

        case "right_stick":
          if (axis === 3) {
            setRightStick({ ...rightStick, horizontal: axisMovementValue });
          } else if (axis === 4) {
            setRightStick({ ...rightStick, vertical: axisMovementValue });
          }
          sendToSocket(rightStick);
          break;
      }

      console.log(
        `Type: ${leftStick.horizontal} | Horizontal: ${leftStick.horizontal} | Vertical: ${leftStick.vertical}`
      ); */
    });
  }, []);

  const sendToSocket = (data) => {
    socket.emit("input", data);
  };

  return (
    <>
      <Box>{`Använder kontroller: ${controller}`}</Box>

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
    </>
  );
};

export default Gamepad;
