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
    updateUser: builder.query({
      query: (id, data) => ({
            url: `/users/${id}`,
            method: "PUT",
          body: {...data}
      }),
    }),
  }),
});

export const {useGetAllUsersQuery,useGetUserMeQuery,useUpdateUserQuery} = userApiSlice