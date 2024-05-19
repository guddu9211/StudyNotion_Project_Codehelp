import { createSlice } from "@reduxjs/toolkit";
// import {toast} from 'react-hot-toast';

const initialState = {
    totalItem: localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItem")) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state, value) {
            state.totalItem = value.payload
        },

        // Homework is to add functions for: 
        // add to cart
        // remove from cart 
        // reset cart 
    },
});

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;