import { apiSlice } from "../../api/apiSlice";

export const signUpAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/local/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useRegisterMutation } = signUpAuthApiSlice;
