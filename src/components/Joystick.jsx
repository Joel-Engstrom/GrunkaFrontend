import { Box, Typography } from "@mui/material";

const Joystick = ({ x, y, title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        component="h1"
        variant="h6"
        align="center"
        color="info.main"
        fontWeight={"bold"}
      >
        {title}
      </Typography>
      <Box
        width={100}
        height={100}
        sx={{
          borderRadius: "100%",
          backgroundColor: "darkcyan",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          width={20}
          height={20}
          sx={{
            borderRadius: "100%",
            backgroundColor: "primary.dark",
            position: "absolute",
            transform: `translateX(${x * 40}px) translateY(${y * 40}px)`,
            transition: "transform 0.1s ease-in-out",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Joystick;
