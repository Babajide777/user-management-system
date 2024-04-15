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
import { validateCreateUser } from "../utils/validation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../store/Features/users/userApiSlice";

const defaultTheme = createTheme();

export default function AddUser({ setfirst }) {
  const [err, seterr] = useState([]);
  const [register] = useAddUserMutation();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      seterr([]);
      const data = new FormData(event.currentTarget);
      const objData = Object.fromEntries(data.entries());

      let receivedData = {
        firstName: objData.firstName,
        lastName: objData.lastName,
        email: objData.email,
        street: objData.street,
        city: objData.city,
        iban: Number(objData.iban),
        password: objData.password,
      };

      if (objData.broughtBy !== "") {
        receivedData.broughtBy = objData.broughtBy;
      }

      if (objData.supervisor !== "") {
        receivedData.supervisor = objData.supervisor;
      }

      const check = validateCreateUser.safeParse(receivedData);

      if (!check.success) {
        const formattedErrors = Object.entries(
          check.error.flatten().fieldErrors
        ).map(([fieldName, error]) => {
          return `${fieldName}: ${error[0]}`;
        });
        seterr(formattedErrors);
      }

      if (check.success) {
        const { message, payload } = await register(receivedData).unwrap();

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
        navigate("/profile");
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
            Add User
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
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="broughtBy"
                  label="Brought By?"
                  name="broughtBy"
                  autoComplete="Brought By?"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="supervisor"
                  label="Supervisor"
                  name="supervisor"
                  autoComplete="Supervisor"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="street"
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="iban"
                  label="Iban"
                  name="iban"
                  autoComplete="iban"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add User
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button variant="text" onClick={() => setfirst(false)}>
                  View all Users
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
