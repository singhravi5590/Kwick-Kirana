import { createSlice } from "@reduxjs/toolkit";

const AddressSlice = createSlice({
    name : "address",
    initialState : {
        addressList : []
    },
    reducers : {
        addAddressList : (state, action) => {
            state.addressList = [...action.payload]
        }
    }
})

export const {addAddressList} = AddressSlice.actions
export default AddressSlice.reducer