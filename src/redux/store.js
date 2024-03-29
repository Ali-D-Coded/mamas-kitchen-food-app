import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import modalReducer from "./slices/modalSlice";
import cartReducer from "./slices/cart/cartSlice";
import itemReducer from "./slices/items/itemSlice"
import { apiSlice } from "./api/apiSlice";
import authReducer from "./slices/auth/authSlice";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { signUpAuthApiSlice } from "./slices/auth/signUpAuthApiSlice";
import { itemsApiSlice } from "./slices/items/itemsApiSlice";
import { categoriesApiSlice } from "./slices/items/categoriesApiSlice";
import { ordersApiSlice } from "./slices/orders/ordersApiSlice";
import { plansApiSlice, useGetAllPlansAllQuery } from "./slices/plans/plansApiSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  openModal: modalReducer,
  cart: cartReducer,
  items: itemReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    authApiSlice.reducerPath,
    signUpAuthApiSlice.reducerPath,
    itemsApiSlice.reducerPath,
    categoriesApiSlice.reducerPath,
    ordersApiSlice.reducerPath,
    plansApiSlice.reducerPath
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  // devTools: true
});
