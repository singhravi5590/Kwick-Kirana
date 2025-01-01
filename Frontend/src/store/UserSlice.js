import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name : "user",
    initialState : {
        _id : "",
        name : "",
        email : "",
        avatar : "",
        mobile : "",
        verify_email : "",
        last_login_date : "",
        status : "",
        address_details : [],
        shopping_cart : [],
        role : "",
        orderHistory : [],
    },
    reducers : {
        setUserDetais : (state, action) => {
            state.name = action.payload?.name;
            state.email = action.payload?.email;
            state._id = action.payload?._id;
            state.avatar = action.payload?.avatar;
            state.mobile = action.payload?.mobile;
            state.verify_email = action.payload?.verify_email;
            state.last_login_date = action.payload?.last_login_date;
            state.status = action.payload?.status;
            state.address_details = action.payload?.address_details;
            state.shopping_cart = action.payload?.shopping_cart;
            state.role = action.payload?.role;
            state.orderHistory = action.payload?.orderHistory;
        },
        updateAvatar : (state, action) => {
            state.avatar = action.payload.avatar
        },
        logOut : (state, action) => {
            state.name = "";
            state.email = "";
            state._id = "";
            state.avatar = "";
            state.mobile = "";
            state.verify_email = "";
            state.last_login_date = "";
            state.status = "";
            state.address_details = "";
            state.shopping_cart = "";
            state.role = "";
            state.orderHistory = "";
        }
    }
})


export const {setUserDetais, logOut, updateAvatar} = UserSlice.actions;
export default UserSlice.reducer;