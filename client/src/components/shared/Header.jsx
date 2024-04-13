import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/Features/auth/authApiSlice";
import { logOut } from "../../store/Features/auth/authSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // dispatch(logOut);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box component="nav" sx={styles.mainContianer}>
      <Link to="/">
        <Typography
          variant="h1"
          fontSize={40}
          sx={{ textDecoration: "none", color: "black" }}
        >
          User Management System
        </Typography>
      </Link>
      {user.userID && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography>Welcome, {user.firstName}</Typography>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      )}
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
