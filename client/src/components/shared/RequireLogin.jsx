import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RequireLogin = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (!user.userID) {
      navigate("/");
    }
  }, [navigate]);

  return children;
};

export default RequireLogin;
