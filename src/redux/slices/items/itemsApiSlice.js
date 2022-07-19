import { apiSlice } from "../../api/apiSlice";


export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (filter) => `/day?food_type=${filter}`,
      // keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetItemsQuery } = itemsApiSlice;