import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import auth from "./Features/auth/authSlice";

let store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

export default store;
