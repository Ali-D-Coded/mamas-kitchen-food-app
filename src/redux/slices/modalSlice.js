import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    openModal: false,
}

export const modalSlice = createSlice({
    name: "openModal",
    initialState,
    reducers: {
        handleOpenModal: (state) => {
            state.openModal = true
        },
        handleCloseModal: (state) => {
            state.openModal = false
        }
    }
})

export const { handleCloseModal, handleOpenModal } = modalSlice.actions
export default modalSlice.reducer