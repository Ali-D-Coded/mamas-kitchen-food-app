import { apiSlice } from "../../api/apiSlice";

export const plansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlansAll: builder.query({
      query: () => "/plans/all",
    }),
  }),
});
export const { useGetAllPlansQuery,useGetAllPlansAllQuery } = plansApiSlice;