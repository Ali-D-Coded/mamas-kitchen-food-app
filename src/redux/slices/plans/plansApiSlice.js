import { apiSlice } from "../../api/apiSlice";

export const plansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlansAll: builder.query({
      query: () => "/plans/all",
    }),
    getAllPlanTimes: builder.query({
      query: () => "/plans/times",
    }),
    createPlan: builder.mutation({
      query: (data) => ({
        url: "/plans/create",
        method: "POST",
        body: data,
      }),
    }),
    updatePlan: builder.mutation({
      query: (data) => ({
        url: `/plans/update-plan-details/${data.planDetesId}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});
export const { useCreatePlanMutation,useGetAllPlansAllQuery,useUpdatePlanMutation,useGetAllPlanTimesQuery } = plansApiSlice;