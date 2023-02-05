import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  ClearSharp,
  CheckSharp,
  PrecisionManufacturing,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";

const Header = ({}) => {
  return (
    <AppBar
      position="static"
      sx={{ minWidth: "90vw", margin: "0px", padding: "0px", flexGrow: 1 }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <PrecisionManufacturing
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        />
        <Box flexGrow={1}>
          <Typography
            variant="h4"
            align="center"
            color="info.dark"
            fontWeight={"bold"}
          >
            Grunka Visualizer
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
          {true ? <CheckSharp color="success" /> : <ClearSharp color="error" />}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
