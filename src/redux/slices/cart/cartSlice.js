import { createSlice } from "@reduxjs/toolkit";
import { differenceInCalendarDays } from "date-fns";
import { template } from "lodash";

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
  dateRange: null,
  times: [],
  total: null,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // getItemQuantity: (state) => {},
    increaseCartQuantity: (state, action) => {
      const { category, items } = action.payload;
      const Category = category;
      let Items = [];
      items.push();

      // state.order.push({ category: category, items: items });
    },
    calculateTotal: (state, action) => {
      const { dateRange } = action.payload;
      state.dateRange = dateRange;
      // if(time){ state.times.push(time)}
      const diffIndays =
        dateRange && differenceInCalendarDays(dateRange[1], dateRange[0]);
      console.log({ diffIndays });
    },
    setTime: (state, action) => {
      const { time } = action.payload;
      console.log(time);
      if (state.times?.find(it => it.id === time.id) == null) {
        state.times?.push(time)
      }
      
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
  setTime,
} = cartSlice.actions;

export const currentDateRange = (state) => state.cart.dateRange;
export const currentItems = (state) => state.cart.order;
export const currentTotal = (state) => state.cart.total;

export default cartSlice.reducer;
