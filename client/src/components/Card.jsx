import { Avatar, Box, SvgIcon, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const Card = ({ firstName, lastName, email }) => {
  return (
    <Box sx={styles.mainContianer}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
      <Typography component="p">
        {firstName} {lastName}
      </Typography>
      <Typography component="p">{email}</Typography>
      <Box>
        <SvgIcon>
          <DeleteIcon />
        </SvgIcon>
        <SvgIcon>
          <ModeEditIcon />
        </SvgIcon>
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainContianer: {
    width: "150px",
    height: "150px",
    backgroundColor: "primary.main",
    overflow: "clip",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default Card;
