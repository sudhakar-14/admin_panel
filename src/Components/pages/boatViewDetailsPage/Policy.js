import React from "react";
import "./Policy.css";
import data from "./boatDetailsViewsJson.json";
import { Typography, makeStyles } from "@material-ui/core";

const Policy = ({ id, policy_statement }) => {
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const policy = data.parameters.boats_cancellation_policy;
  return (
    <div className={class_name.policy} style={{}}>
      <div
        style={{
          display: "flex",
          padding: "2% 1%",
          borderRight: "solid 1px rgba(66, 70, 81, 0.2)",
        }}
      >
        <Typography
          className={class_name.message_txt}
          style={{ fontWeight: "bold" }}
        >
          {id}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          padding: "2% 1%",
          // justifyContent: "center",
          // alignSelf: "center",
          // alignItems: "center",
          // alignContent: "center",
        }}
      >
        <Typography className={class_name.message_txt}>
          {policy_statement}
        </Typography>
      </div>
    </div>
  );
};
export default Policy;

const useStyles = makeStyles((theme) => ({
  policy: {
    display: "flex",
    height: "auto",
    borderRadius: "15px",
    border: "solid 1px rgba(66, 70, 81, 0.2)",
    margin: "2% 0",
    alignItems: "center",
    // backgroundColor: "lightgreen",
  },
  message_txt: {
    fontSize: "clamp(8px, 1.5vw, 24px)", // Adjust the range as needed
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    // textAlign: "left",
    color: "#424651",
    // marginTop: "1%",
  },

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //  ==============================    max-width: 767
  //
  //
  //
  //
  //
  //
  //
  //
  //
  "@media (max-width: 767px)": {
    policy: {
      display: "flex",
      height: "auto",
      borderRadius: "5px",
      border: "solid 1px rgba(66, 70, 81, 0.2)",
      margin: "2% 0",
      alignItems: "center",
      // backgroundColor: "lightgreen",
    },
  },
}));

const lineStyle = {
  borderLeft: "1px solid black", // Adjust the line width and color here
  height: "100%", // The line will take up the full height of its parent container
};
