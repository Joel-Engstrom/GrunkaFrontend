import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { PrecisionManufacturing } from "@mui/icons-material";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = ({}) => {
  return (
    <AppBar
      position="static"
      sx={{ minWidth: "90vw", margin: "0px", padding: "0px" }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <PrecisionManufacturing
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          GRUNKA
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
