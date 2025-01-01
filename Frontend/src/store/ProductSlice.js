import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name : "products",
    initialState : {
        allCategory : [],
        loading : false,
        allsubCategory : [],
        product : [],
    },
    reducers : {
        setCategory : (state, action) => {
            state.allCategory = [...action.payload]
        },
        setSubcategory : (state, action) => {
            state.allsubCategory = [...action.payload]
        },
        setProducts : (state, action) => {
            state.product = [...action.payload]
        },
        setLoading : (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {setProducts, setCategory, setSubcategory, setLoading} = ProductSlice.actions
export default ProductSlice.reducer