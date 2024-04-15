import { Box } from "@mui/material";
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

  return (
    <Box>
      {items.map((theItem, i) => (
        <Card key={i} {...theItem} />
      ))}
    </Box>
  );
};

export default ViewALLUsers;
