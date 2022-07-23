import { apiSlice } from "../../api/apiSlice";


export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (filter) => `/category/all?food_type=${filter}`,
      // keepUnusedDataFor: 5,
    }),
    getItemsById: builder.query({
      query: (id) => `/category/${id}`,
    }),
    createItems: builder.mutation({
      query: (data) => ({
        url: "/items",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useGetItemsQuery,useGetItemsByIdQuery,useCreateItemsMutation } = itemsApiSlice;