import { apiSlice } from "../../api/apiSlice";

export const adminAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/local/admin/signin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginAdminMutation } = adminAuthApiSlice;
