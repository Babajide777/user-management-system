import React from "react";
import RequireLogin from "../components/shared/RequireLogin";
import { useState } from "react";
import { Box } from "@mui/material";
import AddUser from "../components/AddUser";
import ViewALLUsers from "../components/ViewALLUsers";

const Profile = () => {
  const [first, setfirst] = useState(true);

  return (
    <RequireLogin>
      <Box component="section">
        {first ? (
          <AddUser setfirst={setfirst} />
        ) : (
          <ViewALLUsers setfirst={setfirst} />
        )}
      </Box>
    </RequireLogin>
  );
};

export default Profile;
