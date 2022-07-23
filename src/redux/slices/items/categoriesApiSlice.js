import { apiSlice } from "../../api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category/all",
    }),
    createCategories: builder.mutation({
      query: (credentials) => ({
        url: "/category/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {useGetCategoriesQuery,useCreateCategoriesMutation} = categoriesApiSlice;