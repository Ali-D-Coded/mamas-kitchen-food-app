import { createSlice } from "@reduxjs/toolkit";
import { differenceInCalendarDays } from "date-fns";
import * as lodesh from "lodash";

const initialState = {
  order: [],
  dateRange: null,
  breakfast: null,
  lunch: null,
  dinner: null,
  delivery: [],
  total: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // getItemQuantity: (state) => {},
    increaseCartQuantity: (state, action) => {
      const { days, items } = action.payload;
      const dateRange = state.dateRange;
      if (state.order?.find((it) => it.item.id == items.id) == null) {
        state.order.push({
          days: days,
          item: items,
        });
      }
      const diffIndays =
        dateRange &&
        differenceInCalendarDays(
          new Date(dateRange[1]),
          new Date(dateRange[0])
        );
      console.log({ diffIndays });

      if (diffIndays > 7) {
        console.log("h");
      }
    },
    setDateRange: (state, action) => {
      const { dateRange } = action.payload;
      state.dateRange = dateRange;
    },
    setTime: (state, action) => {
      const { breakfast, lunch, dinner } = action.payload;

      state.breakfast = breakfast;
      state.lunch = lunch;
      state.dinner = dinner;
    },
    setTotalAmount: (state, action) => {
      console.log("====================================");
      console.log("Im from setTotalAmount");
      console.log("====================================");
      const dateRange = state.dateRange;
      const diffIndays =
        dateRange && differenceInCalendarDays(dateRange[1], dateRange[0]);
      const breakFastItems = state.order.filter((it) =>
        it.item.food_type == "BREAKFAST" ? true : false
      );
      const lunchItems = state.order.filter((it) =>
        it.item.food_type == "LUNCH" ? true : false
      );
      const dinnerItems = state.order.filter((it) =>
        it.item.food_type == "DINNER" ? true : false
      );
      console.log("====================================");
      console.log({ breakFastItems, lunchItems, dinnerItems });
      console.log("====================================");
      if (diffIndays > 7) {
        const bfPrice = Number(state.breakfast.find((it) => it.days == "7").price);
        const lcPrice = Number(state.lunch.find((it) => it.days == "7").price);
        const dnrPrice = Number(state.dinner.find((it) => it.days == "7").price);
        console.log({ bfPrice, lcPrice, dnrPrice });
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello1", { total: state.total });

          state.total = diffIndays * (bfPrice + lcPrice + dnrPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello2", { total: state.total });
          state.total = diffIndays * (lcPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello3", { total: state.total });
          state.total = diffIndays * (bfPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello4", { total: state.total });
          state.total = diffIndays * (Number(bfPrice) + Number(lcPrice));
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello5", { total: state.total });
          state.total = diffIndays * Number(bfPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello6", { total: state.total });
          state.total = diffIndays * lcPrice;
        }
        if (
          !breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello7", { total: state.total });
          state.total = diffIndays * dnrPrice;
        }
      }
      if (diffIndays > 6) {
        const bfPrice = Number(state.breakfast.find((it) => it.days == "6").price);
        const lcPrice = Number(state.lunch.find((it) => it.days == "6").price);
        const dnrPrice = Number(state.dinner.find((it) => it.days == "6").price);
        console.log({ bfPrice, lcPrice, dnrPrice });
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello1", { total: state.total });

          state.total = diffIndays * (bfPrice + lcPrice + dnrPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello2", { total: state.total });
          state.total = diffIndays * (lcPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello3", { total: state.total });
          state.total = diffIndays * (bfPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello4", { total: state.total });
          state.total = diffIndays * (Number(bfPrice) + Number(lcPrice));
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello5", { total: state.total });
          state.total = diffIndays * Number(bfPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello6", { total: state.total });
          state.total = diffIndays * lcPrice;
        }
        if (
          !breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello7", { total: state.total });
          state.total = diffIndays * dnrPrice;
        }
      }
      if (diffIndays > 5) {
        const bfPrice =Number(state.breakfast.find((it) => it.days == "5").price);
        const lcPrice = Number(state.lunch.find((it) => it.days == "5").price);
        const dnrPrice = Number(state.dinner.find((it) => it.days == "5").price);
        console.log({ bfPrice, lcPrice, dnrPrice });
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello1", { total: state.total });

          state.total = diffIndays * (bfPrice + lcPrice + dnrPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello2", { total: state.total });
          state.total = diffIndays * (lcPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello3", { total: state.total });
          state.total = diffIndays * (bfPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello4", { total: state.total });
          state.total = diffIndays * (Number(bfPrice) + Number(lcPrice));
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello5", { total: state.total });
          state.total = diffIndays * Number(bfPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello6", { total: state.total });
          state.total = diffIndays * lcPrice;
        }
        if (
          !breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello7", { total: state.total });
          state.total = diffIndays * dnrPrice;
        }
      }
      if (diffIndays > 4) {
        const bfPrice = Number(state.breakfast.find((it) => it.days == "4").price);
        const lcPrice = Number(state.lunch.find((it) => it.days == "4").price);
        const dnrPrice = Number(state.dinner.find((it) => it.days == "4").price);
        console.log({ bfPrice, lcPrice, dnrPrice });
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello1", { total: state.total });

          state.total = diffIndays * (bfPrice + lcPrice + dnrPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello2", { total: state.total });
          state.total = diffIndays * (lcPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello3", { total: state.total });
          state.total = diffIndays * (bfPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello4", { total: state.total });
          state.total = diffIndays * (Number(bfPrice) + Number(lcPrice));
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello5", { total: state.total });
          state.total = diffIndays * Number(bfPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello6", { total: state.total });
          state.total = diffIndays * lcPrice;
        }
        if (
          !breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello7", { total: state.total });
          state.total = diffIndays * dnrPrice;
        }
      }
      if (diffIndays > 3) {
        const bfPrice = Number(state.breakfast.find((it) => it.days == "3").price);
        const lcPrice = Number(state.lunch.find((it) => it.days == "3").price);
        const dnrPrice = Number(state.dinner.find((it) => it.days == "3").price);
        console.log({ bfPrice, lcPrice, dnrPrice });
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello1", { total: state.total });

          state.total = diffIndays * (bfPrice + lcPrice + dnrPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello2", { total: state.total });
          state.total = diffIndays * (lcPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello3", { total: state.total });
          state.total = diffIndays * (bfPrice + dnrPrice);
        }
        if (
          breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello4", { total: state.total });
          state.total = diffIndays * (Number(bfPrice) + Number(lcPrice));
        }
        if (
          breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello5", { total: state.total });
          state.total = diffIndays * Number(bfPrice);
        }
        if (
          !breakFastItems?.length > 0 &&
          lunchItems?.length > 0 &&
          !dinnerItems?.length > 0
        ) {
          console.log("hello6", { total: state.total });
          state.total = diffIndays * lcPrice;
        }
        if (
          !breakFastItems?.length > 0 &&
          !lunchItems?.length > 0 &&
          dinnerItems?.length > 0
        ) {
          console.log("hello7", { total: state.total });
          state.total = diffIndays * dnrPrice;
        }
      }
    },
    setDelivery: (state, action) => {
       const { del } = action.payload;
      state.delivery = del
    },
    decreaseCartQuantity: (state, action) => {
      state.order = [];
      state.dateRange = null;
      state.total = null;
      state.delivery = []
    },
    removeFromCart: (state, action) => {
      const { item } = action.payload
      console.log({item,orders: state.order});
      state.order.filter(it => it !== item)
    },
  },
});

export const {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
  setDateRange,
  setDelivery,
  setTotalAmount,
  setTime,
} = cartSlice.actions;

export const currentDateRange = (state) => state.cart.dateRange;
export const currentCartItems = (state) => state.cart.order;
export const currentTotal = (state) => state.cart.total;
export const selectedDeliDetes = (state) => state.cart.delivery;

export default cartSlice.reducer;
