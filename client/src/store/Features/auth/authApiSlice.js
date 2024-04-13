import { apiSlice } from "../../api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "student/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(logOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "student/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    registerAdmin: builder.mutation({
      query: (credentials) => ({
        url: "admin/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "admin/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRegisterAdminMutation,
  useLoginAdminMutation,
} = authApiSlice;
