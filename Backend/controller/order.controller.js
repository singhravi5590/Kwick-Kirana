import mongoose from "mongoose";
import OrderModel from "../model/order.js";
import CartproductModel from "../model/cartproduct.js";
import UserModel from "../model/user.js";
import Stripe from "../config/stripe.js";


export async function cashOnDeliveryController(req, res){
    try {
        const {_id : userId} = req.user;
        const {list_items, totalAmt, addressId, subTotalAmt} = req.body;

        const payload = list_items.map((el, index) => {
            return ({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productid._id,
                product_details : {
                    name : el.productid.name,
                    image : el.productid.image,
                },
                paymentId : "",
                payment_status : "Cash On Delvery",
                delivery_address : addressId,
                subTotalAmt :subTotalAmt,
                totalAmt : totalAmt,
                invoice_receipt : ""
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        const removeCartItems = await CartproductModel.deleteMany({userid :userId})

        const updateInUser = await UserModel.updateOne({_id : userId}, {
            shopping_cart : []
        })

        return res.json({
            message : "Order Successful",
            error : false,
            success : true,
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

export function priceWithDiscount(price, discount){
    const actualPrice = Math.ceil((Number(price) * Number(discount))/100)
    const discountedPrice = price - actualPrice;
    return discountedPrice
}

export async function paymentController(req, res){
    try {
        const {_id : userId} = req.user;
        
        const {list_items, totalAmt, addressId, subTotalAmt} = req.body;

        const payload = list_items.map((item) => {
            return {
                price_data : {
                    currency : 'inr',
                    product_data : {
                        name : item.productid.name,
                        images : item.productid.image,
                        metadata : {
                            productid : item.productid._id
                        }
                    },
                    unit_amount : priceWithDiscount(item.productid.price, item.productid.discount) * 100
                },
                adjustable_quantity : {
                    enabled : true,
                    minimum : 1
                },
                quantity : item.quantity,
            }
        })

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            customer_email : req.user.email,
            metadata : {
                userId : userId.toString(),
                addressId : addressId
            },
            line_items : payload,
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await Stripe.checkout.sessions.create(params);

        const removeCartItems = await CartproductModel.deleteMany({userid :userId})

        const updateInUser = await UserModel.updateOne({_id : userId}, {
            shopping_cart : []
        })

        return res.json(session)
    } 
    catch (error) {
        return res.status(500).json({
            message : error.message,
            error : true,
            success : false,
        })
    }
}