import { apiSlice } from "../../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getUserMe: builder.query({
      query: () => "/users/me",
      // keepUnusedDataFor:10
    }),
    updateUser: builder.mutation({
      query: (id, data) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    blockUser: builder.mutation({
      query: (data) => ({
        url: `/users/block/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserMeQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBlockUserMutation
} = userApiSlice;
