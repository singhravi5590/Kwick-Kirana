import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line : {
        type : String,
        required : [true, "Please Enter Your address"]
    },
    city : {
        type : String,
        required : [true, "Please Enter Your City"]
    },
    state : {
        type : String,
        required : [true, "Please Enter Your State"]
    },
    pincode : {
        type : String,
        required : [true, "Please Enter Your Pincode"]
    },
    country : {
        type : String,
        required : [true, "Please Enter Your Country"]
    },
    mobile : {
        type : String,
        required : [true, "Please Enter Your mobile number"]
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        default : ""
    },
    status : {
        type : Boolean,
        default : true,
    }
}, 
{
    timestamps : true,
})

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel