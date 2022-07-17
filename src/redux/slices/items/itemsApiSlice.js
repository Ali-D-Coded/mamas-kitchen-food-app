import { apiSlice } from "../../api/apiSlice";

export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getItems: builder.query({
            query: () => '/day',
            keepUnusedDataFor: 5,
        })
    })
})

export const { useGetItemsQuery } = itemsApiSlice;