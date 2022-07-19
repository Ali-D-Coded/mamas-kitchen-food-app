import { apiSlice } from "../../api/apiSlice";

export const getAllPlans = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlans: builder.query({
      query: () => "/plans",
    //   keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllPlansQuery } = getAllPlans;
