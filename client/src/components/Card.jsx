import { Avatar, Box, SvgIcon, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDeleteUserMutation } from "../store/Features/users/userApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Card = ({ firstName, lastName, email, id }) => {
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await deleteUser({ id }).unwrap();

      toast.success(`${res.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/profile");
    } catch (error) {
      let msg =
        error.message ||
        (error.data && error.data.message) ||
        "An error occurred";
      toast.error(`${msg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <Box sx={styles.mainContianer}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
      <Typography component="p">
        {firstName} {lastName}
      </Typography>
      <Typography component="p">{email}</Typography>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <SvgIcon sx={{ cursor: "pointer" }} onClick={handleDelete}>
          <DeleteIcon sx={{ color: "white" }} />
        </SvgIcon>
        <SvgIcon sx={{ cursor: "pointer" }}>
          <ModeEditIcon sx={{ color: "white" }} />
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
    justifyContent: "space-around",
    borderRadius: "20px",
  },
};

export default Card;
