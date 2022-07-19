import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foodType: null
}

export const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setFoodType: (state, action) => {
            state.foodType = action.payload
        }
    }
})

export const { setFoodType } = itemSlice.actions
export const selectCurrentFoodType = (state) => state.items.foodType
export default itemSlice.reducer