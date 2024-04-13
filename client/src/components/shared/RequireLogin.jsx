import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RequireLogin = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useAuth();
  if (!user) {
    navigate("/");
    return <></>;
  }
  return children;
};

export default RequireLogin;
