import { apiSlice } from "../../api/apiSlice";

export const getAllPlans = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlans: builder.query({
      query: () => "/plans/times",
      //   keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllPlansQuery } = getAllPlans;
