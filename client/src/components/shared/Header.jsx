import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const Header = () => {
  return (
    <Box component="nav" sx={styles.mainContianer}>
      <Typography variant="h1" fontSize={40}>
        User Management System
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography>Welcome, Babajide</Typography>
        <Button variant="contained">Logout</Button>
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainContianer: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    height: "100px",
    backgroundColor: grey[400],
    justifyContent: "space-between",
    alignItems: "center",
    paddingX: "20px",
  },
};

export default Header;
