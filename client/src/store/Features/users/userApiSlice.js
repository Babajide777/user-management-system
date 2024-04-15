import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "user/all-users",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData.data);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "users", id: "LIST" },
            ...result.ids.map((id) => ({ type: "users", id })),
          ];
        } else return [{ type: "users", id: "LIST" }];
      },
    }),
    addUser: builder.mutation({
      query: (credentials) => ({
        url: "user/add-user",
        method: "POST",
        body: { ...credentials },
        validateStatus: (response, result) => {
          return response.status === 201 && !result.isError;
        },
      }),
      invalidatesTags: [{ type: "users", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/delete-user/${id}`,
        method: "DELETE",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "users", id: arg.id }],
    }),
    editUsers: builder.mutation({
      query: (data) => ({
        url: `user/edit-user/${data.id}`,
        method: "PUT",
        body: {
          ...data,
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "users", id: arg.id }],
    }),
  }),
});

export const {
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUsersMutation,
  useGetAllUsersQuery,
} = usersApiSlice;
