import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name : "cart",
    initialState : {
        cart : []
    },
    reducers : {
       handleAddItemCart : (state, action) => {
        state.cart = [...action.payload]
       },

    }
})

export const {handleAddItemCart}  = CartSlice.actions;

export default CartSlice.reducer;