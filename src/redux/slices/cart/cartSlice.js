import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
  
//   SUNDAY: {
//     delivery: "",
//     meals: {
//       BREAKFAST: [],
//       LUNCH: [],
//       DINNER: []
//     },
//   },
//   MONDAY: {
//     delivery: "",
//     meals: {
//       BREAKFAST: [],
//       LUNCH: [],
//       DINNER: []
//     },
//   },
//   TUESDAY: {
//     delivery: "",
//     meals: {
//       BREAKFAST: [],
//       LUNCH: [],
//       DINNER: []
//     },
//   },
//   WEDNESDAY: {
//     delivery: "",
//     meals: {
//       BREAKFAST: [],
//       LUNCH: [],
//       DINNER: []
//     },
//   },
//   THURSDAY: {
//     delivery: "",
//     meals: {
//       BREAKFAST: [],
//       LUNCH: [],
//       DINNER: []
//     },
//   },
//   FRIDAY: {
//     delivery: "",
//     meals: {
//       BREAKFAST: [],
//       LUNCH: [],
//       DINNER: []
//     },
//   },
//   SATURDAY: {
//     delivery: "",
//     meals: {
//       BREAKFAST: [],
//       LUNCH: [],
//       DINNER: []
//     },
//   },
//   TotalAMount: ""

// };

const initialState = {
  items: [],
  dateRange: [],
  total:''

}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // getItemQuantity: (state) => {},
    increaseCartQuantity: (state, action) => {
      const { day, delivery, foodType, items, totalAmount } = action.payload
      console.log({
        day,
        delivery,
        foodType,
        items,
        totalAmount,
      });
 


    },
    decreaseCartQuantity: (state, action) => {},
    removeFromCart: (state) => {},
  },
});

export const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
