import { apiSlice } from "../../api/apiSlice";

export const authAdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/local/admin/signin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation : adminloginMutation } = authAdminApiSlice;
