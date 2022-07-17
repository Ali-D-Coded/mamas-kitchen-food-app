import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice"
import cartReducer from "./slices/cartSlice"
// import itemReducer from "./slices/items/itemSlice"
import { apiSlice } from "./api/apiSlice";
import authReducer from "./slices/auth/authSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    openModal: modalReducer,
    cart: cartReducer,
    // items: itemReducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
      // devTools: true
  
});
