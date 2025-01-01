import mongoose from "mongoose";

const cartproductSchema = new mongoose.Schema({
    productid : {
        type : String,
        ref : 'product'
    },
    quantity : {
        type : Number,
    },
    userid : {
        type : mongoose.Schema.ObjectId,
        ref : "Users"
    }
},
{
    timestamps : true,
})


const CartproductModel = mongoose.model("cartproduct", cartproductSchema);

export default CartproductModel;