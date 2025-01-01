import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './UserSlice';
import ProductSlice from './ProductSlice';
import CartSlice from './CartSlice';
import AddressSlice from './AddressSlice';

const store = configureStore({
    reducer : {
        user : UserSlice,
        products : ProductSlice,
        cart : CartSlice,
        address : AddressSlice
    }
})


export default store;