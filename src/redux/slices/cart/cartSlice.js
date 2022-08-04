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
  order: [],
  dateRange: [],
  total:''

}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // getItemQuantity: (state) => {},
    increaseCartQuantity: (state, action) => {
      const { category, items } = action.payload
      const Category = category;
      let Items = []
      items.push()

      // state.order.push({ category: category, items: items }); 
    },
    calculateTotal: (state, action) => {
      const {dateRange } = action.payload
      state.dateRange = dateRange;
      // console.log(state.dateRange);
    },
    decreaseCartQuantity: (state, action) => {},
    removeFromCart: (state) => {},
  },
});

export const {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
  calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
