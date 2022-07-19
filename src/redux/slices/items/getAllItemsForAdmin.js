import { apiSlice } from "../../api/apiSlice";

export const getAllItemsForAdmin = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => "/items",
      // keepUnusedDataFor: 5,
    }),
  }),
});

export const {
    useGetAllItemsQuery
} = getAllItemsForAdmin;