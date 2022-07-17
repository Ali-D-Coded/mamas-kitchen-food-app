import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodType: "",
  date: [],
  delevery: "",
  day: "",
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getItemQuantity: (state) => {},
    increaseCartQuantity: (state, action) => {
      state.cartItems.push(action.payload);
    },
    decreaseCartQuantity: (state, action) => {},
    removeFromCart: (state) => {},
  },
});

export const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
