import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const InfoCard = ({value, title}) => {
  return (
    <>
      <CardContent style={{}}>
        <Typography variant="h4" fontWeight="bold" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" fontStyle="italic" color="orangered">
          {value}°
        </Typography>
      </CardContent>
    </>
  );
};


export default InfoCard;