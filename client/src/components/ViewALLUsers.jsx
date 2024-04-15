import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useGetAllUsersQuery } from "../store/Features/users/userApiSlice";
import Card from "./Card";

const ViewALLUsers = ({ setfirst }) => {
  const { data } = useGetAllUsersQuery("users", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let items = [];

  if (data) {
    const { entities } = data;
    items = Object.values(entities);
  }
  console.log(items);

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingY: "4rem",
        gap: "4rem",
      }}
    >
      <Box
        component="section"
        sx={{
          width: "70%",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {items.map((theItem, i) => (
          <Card key={i} {...theItem} />
        ))}
      </Box>
      <Button
        variant="text"
        sx={{ backgroundColor: "primary.main" }}
        onClick={() => setfirst(true)}
      >
        <Typography color="white">Add A User</Typography>
      </Button>
    </Box>
  );
};

export default ViewALLUsers;
