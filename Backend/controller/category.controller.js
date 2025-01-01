import Categorymodel from '../model/category.js'
import Productmodel from '../model/product.js';
import SubCategoryModel from '../model/subcategory.js';

export async function addCategoryController(req, res){
    try {
        const {name, image} = req.body;
        
        if(!name || !image){
            return res.json({
                message : "Please Enter a required field",
                error : true,
                success : false
            })
        }

        const addCategory = new Categorymodel({
            name,
            image
        })

        const saveCategory = await addCategory.save();

        if(!saveCategory){
            return res.json({
                message : "Category Not added",
                error : true,
                success : false
            })
        }
        
        return res.json({
            data : saveCategory,
            message : "Category Added",
            success : true,
            error : false
        })
    }
    
    catch (error) {
        return res.status(500).json({
            message : error,
            success : false,
            error : true
        })
    }
}

export async function getCategoryController(req, res){
    try {
        const data = await Categorymodel.find({}).sort({createdAt : -1});

        res.json({
            data,
            message : "Data Fetched Successfully",
            error : false,
            success : true
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

export async function updateCategoryController(req, res){
    try {
        const {_id, name, image} = req.body;

        const update = await Categorymodel.updateOne({_id : _id}, {
            name,
            image
        });

        res.json({
            message : "Update Successfully",
            error : false,
            success : true
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : error,
            success : false,
            error : true
        })
    }
}

export async function deleteCategoryController(req, res){
    try {
        const {_id} = req.body;

        const checkSubcategory = await SubCategoryModel.find({
            categoryId : {
                "$in" : [_id]
            }
        }).countDocuments()

        const product = await Productmodel.find({
            category : {
                "$in" : [_id]
            }
        }).countDocuments()

        if(checkSubcategory > 0 || product > 0){
            return res.status(400).json({
                message : "Already Product Available",
                error : true,
                success : false
            })
        }

        const deleteCategory = await Categorymodel.deleteOne({_id : _id});

        return res.json({
            message : "Category Deleted Successfully",
            error : false,
            success : true
        })
        
    } 
    catch (error) {
        return res.status(500).json({
            deleteCategory,
            message : error,
            error : true,
            success : false,
        })
    }
}