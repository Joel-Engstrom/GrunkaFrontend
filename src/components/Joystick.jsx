import { Box, Skeleton, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { _ } from "lodash"
import ConnectedContext from "./ConnectedContext";

const Joystick = ({ x, y, title }) => {
  const { connected } = useContext(ConnectedContext);
  
  return (
    <>
      {connected ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "15pt"
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="text.secondary"
            fontWeight={"bold"}
          >
            {title}
          </Typography>
          <Box
            width={100}
            height={100}
            sx={{
              borderRadius: "100%",
              backgroundColor: "action.hover",
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
                backgroundColor: "orangered",
                position: "absolute",
                transform: `translateX(${x * 40}px) translateY(${y * 40}px)`,
                transition: "transform 0.1s ease-in-out",
              }}
            ></Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "2rem" }}
            width={150}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={100}
            height={100}
          />
        </Box>
      )}
    </>
  );
};

export default Joystick;
