import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";

export const Layout = ({ children }) => {
  return (
    <Box sx={styles.mainContianer}>
      <Header />
      {children}
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainContianer: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
    // flexDirection: {
    //   xs: "column",
    //   md: "row",
    // },
  },
  // headAndMain: {
  //   display: "flex",
  //   flexDirection: "column",
  //   width: "100%",
  // },
};
