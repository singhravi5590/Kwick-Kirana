import CartproductModel from "../model/cartproduct.js";
import UserModel from "../model/user.js";

export async function addCartProducts(req, res){
    try {
        const {_id} = req.user;
        const {productId} = req.body;

        if(!productId){
            return res.status(400).json({
                message : "Provide Product Id",
                error : true,
                success : false
            })
        }

        const checkItemCart = await CartproductModel.findOne({
            userid : _id,
            productid : productId
        })

        if(checkItemCart){
            return res.status(400).json({
                message : "Product already in Cart",
                error : true,
                success : false
            })
        }

        const cart = new CartproductModel({
            productid : productId,
            quantity : 1,
            userid : _id
        })

        const cartSave = await cart.save();

        const userUpdate = await UserModel.updateOne({_id : _id}, {
            $push : {
                shopping_cart : productId
            }
        });

        return res.json({
            message : "Item added Successfully",
            cartSave,
            userUpdate,
            error : false,
            success : true
        })

        
    } 
    catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false,
            error : true,
        })
    }
}

export async function getCartItemController(req, res){
    try {
        const {_id} = req.user;

        const cartItems = await CartproductModel.find({userid : _id}).populate('productid');
        
        return res.json({
            message : "Cart",
            error : false,
            success : true,
            cartItems
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : error.message,
            error : true,
            success : false
        })    
    }
}

export async function updateCartQuantityController(req, res){
    try {
        const {_id : user_id} = req.user;
        const {_id, quantity} = req.body;

        if(!_id || !quantity){
            return res.status(400).json({
                message : "Provide id and quantity",
                error : true,
                success : false,
            })
        }

        const updateQuantity = await CartproductModel.updateOne({_id : _id, userid : user_id}, {
            quantity : quantity
        })
        
        return res.json({
            message : "Added",
            updateQuantity,
            error : false,
            success : true
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false,
            error : true
        })
    }
}

export async function deleteCartItemQtyController(req, res){
    try {
        const {_id : user_id} = req.user;
        const {_id} = req.body;

        if(!_id){
            return res.status(400).json({
                message : "Please Provide product id",
                error : true,
                success : false
            })
        }

        const deleteCartItem = await CartproductModel.deleteOne({_id : _id, userid : user_id})

        return res.json({
            message : "Removed from Cart",
            error : false,
            success : true,
            deleteCartItem
        })
        
    } 
    catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false,
            error : true
        })
    }
}