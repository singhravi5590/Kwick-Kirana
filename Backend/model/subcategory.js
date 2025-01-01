import mongoose from "mongoose";


const subCategorySchema = mongoose.Schema(
{
    name : {
        type : String,
        default : "",
    },
    image : {
        type : String,
        default : "",
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "category"
        }
    ],
},
{
    timestamps : true,
}
)

const SubCategoryModel = mongoose.model("subcategory", subCategorySchema);

export default SubCategoryModel