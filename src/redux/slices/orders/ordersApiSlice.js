import OrdersTable from "../../../pages/admin/orders/OrdersTable";
import { apiSlice } from "../../api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/orders/all",
    }),
    updateOrders: builder.mutation({
      query: (data) => ({
        url: `/orders/update/${data.id}`,
        method: "PUT",
        body: {...data}
      })
    })
  }),
});

export const {useGetAllOrdersQuery,useUpdateOrdersMutation} = ordersApiSlice