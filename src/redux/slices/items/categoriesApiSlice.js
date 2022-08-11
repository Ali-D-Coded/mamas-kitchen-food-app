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
    updateCategory: builder.mutation({
      query: (id, credentials) => {
        console.log(id, credentials);
        return {
          url: `/category/${id}`,
          method: "PATCH",
          body: { ...credentials },
        };
      },
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {useGetCategoriesQuery,useCreateCategoriesMutation,useUpdateCategoryMutation,useDeleteCategoryMutation} = categoriesApiSlice;