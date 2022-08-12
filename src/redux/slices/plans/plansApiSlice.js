import { apiSlice } from "../../api/apiSlice";

export const plansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlansAll: builder.query({
      query: () => "/plans/all",
    }),
    createPlan: builder.mutation({
      query: (data) => ({
        url: "/plans/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useCreatePlanMutation,useGetAllPlansAllQuery } = plansApiSlice;