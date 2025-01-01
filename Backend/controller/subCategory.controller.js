import SubCategoryModel from "../model/subcategory.js";

export async function addSubCategoryController(req, res){
    try {
        const {name, image, category} = req.body;

        if(!name || !image || !category[0]){
            return res.status(400).json({
                message : "Please Enter A Field",
                error : true,
                success : false,
            })
        }

        const addSubCategory = new SubCategoryModel({
            name,
            image,
            category
        })

        const data = await addSubCategory.save();

        return res.json({
            data,
            message : "Added",
            error : false,
            success : true,
        })

    } 
    catch (error) {
        return res.status(500).json({
            message : error,
            error : true,
            success : false
        })
    }
}

export async function getSubcategoryController(req, res){
    try {
        const data = await SubCategoryModel.find().sort({createdAt : -1}).populate("category")
        return res.json({
            message : "Sub Category Data",
            error : false,
            success : true,
            data,
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : error,
            error : true,
            success : false
        })
    }
}

export async function editSubCategoryController(req, res){
    try {
        const {_id, name, image, category} = req.body;
        const checkSub = await SubCategoryModel.findById(_id);
        
        if(!checkSub){
            return res.json({
                message : "Product not Present",
                error : true,
                success : false,
            })
        }
        console.log(checkSub);
        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
            name,
            image,
            category,
        })

        console.log(updateSubCategory);
        return res.json({
            message : "Update Successfull",
            success : true,
            error : false,
            data : updateSubCategory
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : error,
            error : true,
            success : false
        })    
    }
}

export async function deleteSubCategoryController(req, res){
    try {
        const {_id} = req.body;
        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id);

        return res.json({
            message : "Deleted",
            error : false,
            success : true
        })
        
    } 
    catch (error) {
        return res.status(500).json({
            message : error,
            error : true,
            success : false,
        })
    }
}