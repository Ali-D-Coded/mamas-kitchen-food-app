import OrdersTable from "../../../pages/admin/orders/OrdersTable";
import { apiSlice } from "../../api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/orders/all",
    }),
  }),
});

export const {useGetAllOrdersQuery} = ordersApiSlice