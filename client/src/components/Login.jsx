import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateLoginUser } from "../utils/validation";
import { useLoginMutation } from "../store/Features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/Features/auth/authSlice";

const defaultTheme = createTheme();

export default function Login({ setfirst }) {
  const [err, seterr] = useState([]);
  const [LoginTheUser] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      seterr([]);
      const data = new FormData(event.currentTarget);
      const objData = Object.fromEntries(data.entries());

      const check = validateLoginUser.safeParse(objData);

      if (!check.success) {
        const formattedErrors = Object.entries(
          check.error.flatten().fieldErrors
        ).map(([fieldName, error]) => {
          return `${fieldName}: ${error[0]}`;
        });
        seterr(formattedErrors);
      }

      if (check.success) {
        const { message, payload } = await LoginTheUser(objData).unwrap();

        dispatch(
          setCredentials({
            user: payload.user,
            token: payload.token,
          })
        );

        toast.success(`${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/profile");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="span" sx={{ backgroundColor: "gray" }}>
            {err.map((item, i) => (
              <Typography
                key={i}
                component="h6"
                color="red"
                marginBottom="0.5rem"
              >
                {item}
              </Typography>
            ))}
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Button variant="text" onClick={() => setfirst(true)}>
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
