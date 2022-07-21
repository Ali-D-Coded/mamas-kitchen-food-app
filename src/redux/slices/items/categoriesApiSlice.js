import { apiSlice } from "../../api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category/all",
    }),
  }),
});

export const {useGetCategoriesQuery} = categoriesApiSlice;