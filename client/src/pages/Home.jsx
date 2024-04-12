import { Box } from "@mui/material";
import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Home = () => {
  const [first, setfirst] = useState(true);
  return (
    <Box component="section">
      {first ? <SignUp setfirst={setfirst} /> : <Login setfirst={setfirst} />}
    </Box>
  );
};

export default Home;
