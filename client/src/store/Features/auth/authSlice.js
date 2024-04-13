import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  token: null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state, action) => {
      state.token = null;
      state.user = {};
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
