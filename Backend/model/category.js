import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
    },
    image : {
        type : String,
    }
},{
    timestamps : true,
})

const Categorymodel = mongoose.model("category", categorySchema);

export default Categorymodel;