import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  ClearSharp,
  CheckSharp,
  PrecisionManufacturing,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { _ } from "lodash"
import ConnectedContext from "./ConnectedContext";

const Header = ({}) => {
  const { connected } = useContext(ConnectedContext);
  
  return (
    <AppBar
      position="static"
      sx={{ minWidth: "90vw", margin: "0px", padding: "0px", flexGrow: 1 }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 40 },
          maxWidth: { xs: 40 },
        }}
        alt="The house from the offer."
        src="/public/favicon.webp"  
        />
        <Box flexGrow={1}>
          <Typography
            variant="h4"
            align="center"
            color="orangered"
            fontWeight={"bold"}
          >
            WALL-E VISION
          </Typography>
        </Box>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            flexGrow: 0,
          }}
        >
          {connected ? (
            <CheckSharp color="success" />
          ) : (
            <ClearSharp color="error" />
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
