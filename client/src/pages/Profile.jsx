import React from "react";
import RequireLogin from "../components/shared/RequireLogin";

const Profile = () => {
  return (
    <RequireLogin>
      <p>Jide</p>
    </RequireLogin>
  );
};

export default Profile;
