import { Box } from "@mui/material";

const Joystick = ({ joystickData }) => {
  return (
    <Box
      width={"100px"}
      height={"100px"}
      sx={{
        borderRadius: "100%",
        backgroundColor: "primary.dark",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Box
        width={"50px"}
        height={"50px"}
        sx={{
          borderRadius: "100%",
          backgroundColor: "secondary.dark",
          position: "relative",
        }}
      ></Box>
    </Box>
  );
};

export default Joystick;
