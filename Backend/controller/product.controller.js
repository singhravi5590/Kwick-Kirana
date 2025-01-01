import { createConnection } from "mongoose";
import Productmodel from "../model/product.js"

export async function addProductController(req, res){
    try {
        const {name, image, category, subCategory, unit, stock, price, discount, description, more_details} = req.body;
        
        if(!name || !image[0] || !category[0] || !subCategory[0] || !unit || !stock || !price || !discount || !description || !more_details){
            return res.status(400).json({
                message : "Please Add a field",
                error : true,
                success : false
            })
        }
        const newProduct = new Productmodel({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        })


        const data = await newProduct.save();

        return res.json({
            data,
            message : "Product Added",
            success : true,
            error : false,
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

export async function getProductController(req, res){
    try {
        let {page, limit, search} = req.body;
        
        if(!page){
            page = 1;
        }

        if(!limit){
            limit = 10;
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}


        const skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            Productmodel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory'),
            Productmodel.countDocuments(query)
        ])

        return res.json({
            message : "Product Data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil(totalCount/limit),
            data : data
        })
    } 
    catch (error) {
        return res.status(500).json({
            error : true,
            success : false,
            message : error,
        })
    }
}

export async function getProductByCategoryController(req, res){
    try {
        const {id} = req.body;
        
        if(!id){
            return res.status(400).json({
                message : "Category Not given",
                error : true,
                success : false
            })
        }

        const product = await Productmodel.find({
            category : {$in : id}
        }).limit(15)        

        return res.json({
            message : 'Category Product List',
            error : false,
            success : true,
            product,
            id : id
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

export async function getProductByCategoryAndSubCategory(req, res){
    try {
        let {categoryId, subCategoryId, page, limit} = req.body;


        

        if(!categoryId, !subCategoryId){
            return res.status(400).json({
                message : "Provide a Category Id and Subcategory Id",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1;
        }

        if(!limit){
            limit = 10;
        }

        const skip = (page - 1) * limit;

        const query = {
            category : {$in : [categoryId]},
            subCategory : {$in : [subCategoryId]}
        }

        const [data, totalCount] = await Promise.all([
            Productmodel.find(query).sort({createdAt : -1}).skip(skip).limit(limit),
            Productmodel.countDocuments(query)
        ])

        return res.json({
            message : "Product List",
            success : true,
            error : false,
            data,
            totalCount,
            page,
            limit
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

export async function getProductDetails(req, res){
    try {
        const {id} = req.body;
        
        if(!id){
            return res.status(400).json({
                message : "Enter Product Id",
                error : true,
                success : false,
            })
        }

        const data = await Productmodel.findOne({_id : id});

        return res.json({
            message : "Product Found",
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

export async function getProductUpdate(req, res){
    try {
        const {_id} = req.body;
        if(!_id){
            return res.status(400).json({
                message : "Product id not available",
                success : false,
                error : true,
            })
        }

        const updateProduct = await Productmodel.updateOne({_id : _id}, {
            ...req.body
        })

        return res.json({
            message : "Product Update",
            error : false,
            success : true,
            updateProduct,
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

export async function deleteProduct(req, res){
    try {
        const {_id} = req.body;

        if(!_id){
            return res.status(400).json({
                message : "Id not Provided",
                error : true,
                success : false
            })
        }

        const DeleteProduct = await Productmodel.findByIdAndDelete({_id : _id});

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

export async function searchProduct(req, res){
    try {
        let {search, page, limit} = req.body;
        console.log("Hello");
        

        if(!page){
            page = 1;
        }

        if(!limit){
            limit = 10
        }

        let skip = (page - 1) * limit;

        const query = search ? {
            $text : {
                $search : search
            }
        } : {};

        const [products, totalCount] = await Promise.all([
            Productmodel.find(query).sort({createdAt : -1}).skip(skip).limit(limit).populate('category subCategory'),
            Productmodel.countDocuments(query)
    ])

        return res.json({
            message : "Product Found",
            error : false,
            success : true,
            products,
            totalPage : Math.ceil(totalCount/10),
            totalCount,
            page,
            limit
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