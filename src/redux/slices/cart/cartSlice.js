import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // foodType: "",
  // date: [],
  // delevery: "",
  // day: "",
  // cartItems: [],
  // cartTotalQuantity: 0,
  // cartTotalAmount: 0,

  // BREAKFAST: {
  //   SUNDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   MONDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   TUESDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   WEDNESDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   THURSDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   FRIDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   SATURDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  // },
  // LUNCH: {
  //   SUNDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   MONDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   TUESDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   WEDNESDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   THURSDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   FRIDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   SATURDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  // },
  // DINNER: {
  //   SUNDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   MONDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   TUESDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   WEDNESDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   THURSDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   FRIDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  //   SATURDAY: {
  //     delivery: "",
  //     items: [],
  //   },
  // },
  SUNDAY: {
    delivery: "",
    meals: {
      BREAKFAST: [],
      LUNCH: [],
      DINNER: []
    },
  },
  MONDAY: {
    delivery: "",
    meals: {
      BREAKFAST: [],
      LUNCH: [],
      DINNER: []
    },
  },
  TUESDAY: {
    delivery: "",
    meals: {
      BREAKFAST: [],
      LUNCH: [],
      DINNER: []
    },
  },
  WEDNESDAY: {
    delivery: "",
    meals: {
      BREAKFAST: [],
      LUNCH: [],
      DINNER: []
    },
  },
  THURSDAY: {
    delivery: "",
    meals: {
      BREAKFAST: [],
      LUNCH: [],
      DINNER: []
    },
  },
  FRIDAY: {
    delivery: "",
    meals: {
      BREAKFAST: [],
      LUNCH: [],
      DINNER: []
    },
  },
  SATURDAY: {
    delivery: "",
    meals: {
      BREAKFAST: [],
      LUNCH: [],
      DINNER: []
    },
  },
  TotalAMount: ""

};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // getItemQuantity: (state) => {},
    increaseCartQuantity: (state, action) => {
      const { day, delivery, foodType,items, totalAmount } = action.payload
      if (day == 'SUNDAY') {
          state.SUNDAY.delivery = delivery;
          if (foodType == "BREAKFAST") {
            state.SUNDAY.meals.BREAKFAST.push(items)
          }
          if (foodType == "LUNCH") {
            state.SUNDAY.meals.LUNCH.push(items);
          }
          if (foodType == "DINNER") {
            state.SUNDAY.meals.DINNER.push(items);
          }
      }
      if (day == 'MONDAY') {
          state.MONDAY.delivery = delivery;
          if (foodType == "BREAKFAST") {
            state.MONDAY.meals.BREAKFAST.push(items)
          }
          if (foodType == "LUNCH") {
            state.MONDAY.meals.LUNCH.push(items);
          }
          if (foodType == "DINNER") {
            state.MONDAY.meals.DINNER.push(items);
          }
      }
      if (day == 'TUESDAY') {
          state.TUESDAY.delivery = delivery;
          if (foodType == "BREAKFAST") {
            state.TUESDAY.meals.BREAKFAST.push(items)
          }
          if (foodType == "LUNCH") {
            state.TUESDAY.meals.LUNCH.push(items);
          }
          if (foodType == "DINNER") {
            state.TUESDAY.meals.DINNER.push(items);
          }
      }
      if (day == 'WEDNESDAY') {
          state.WEDNESDAY.delivery = delivery;
          if (foodType == "BREAKFAST") {
            state.WEDNESDAY.meals.BREAKFAST.push(items)
          }
          if (foodType == "LUNCH") {
            state.WEDNESDAY.meals.LUNCH.push(items);
          }
          if (foodType == "DINNER") {
            state.WEDNESDAY.meals.DINNER.push(items);
          }
      }
      if (day == 'THURSDAY') {
          state.THURSDAY.delivery = delivery;
          if (foodType == "BREAKFAST") {
            state.THURSDAY.meals.BREAKFAST.push(items)
          }
          if (foodType == "LUNCH") {
            state.THURSDAY.meals.LUNCH.push(items);
          }
          if (foodType == "DINNER") {
            state.THURSDAY.meals.DINNER.push(items);
          }
      }
      if (day == 'FRIDAY') {
          state.FRIDAY.delivery = delivery;
          if (foodType == "BREAKFAST") {
            state.FRIDAY.meals.BREAKFAST.push(items)
          }
          if (foodType == "LUNCH") {
            state.FRIDAY.meals.LUNCH.push(items);
          }
          if (foodType == "DINNER") {
            state.FRIDAY.meals.DINNER.push(items);
          }
      }
      if (day == 'SATURDAY') {
          state.SATURDAY.delivery = delivery;
          if (foodType == "BREAKFAST") {
            state.SATURDAY.meals.BREAKFAST.push(items)
          }
          if (foodType == "LUNCH") {
            state.SATURDAY.meals.LUNCH.push(items);
          }
          if (foodType == "DINNER") {
            state.SATURDAY.meals.DINNER.push(items);
          }
      }


    },
    decreaseCartQuantity: (state, action) => {},
    removeFromCart: (state) => {},
  },
});

export const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
