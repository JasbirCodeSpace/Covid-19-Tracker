import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({
  title,
  cases,
  isRed,
  isOrange,
  isGreen,
  active,
  total,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isOrange && "infoBox--orange"} ${isGreen && "infoBox--green"}`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2
          className={`infoBox__cases ${
            !isRed && !isOrange && "infoBox__cases--green"
          }`}
        >
          {cases}
        </h2>
        <Typography className="infoBox__total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
