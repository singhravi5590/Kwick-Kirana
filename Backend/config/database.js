import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGOOSE_URI){
    throw new Error("Please provide mongodb uri in .env file ");
}
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
    } 
    catch (error) {
        console.log("Mongo db error", error);
    }
}


export default connectDB;