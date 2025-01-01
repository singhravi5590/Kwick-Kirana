import AddressModel from "../model/address.js";
import UserModel from "../model/user.js";

export async function addAddressController(req, res){
    try {
        const {_id : user_id} = req.user;

        const {addressLine, city, country, mobile, pincode, state} = req.body;

        const createAddress = new AddressModel({
            address_line : addressLine,
            city,
            pincode,
            mobile,
            country,
            state,
            userId : user_id
        })

        const data = await createAddress.save();

        const userUpdate = await UserModel.updateOne({_id : user_id}, {
            $push : {
                address_details : data._id
            }
        })

        return res.json({
            message : "Address Created Successfully",
            error : false,
            success : true,
            data
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

export async function getAddressController(req, res){
    try {
        const {_id} = req.user;

        const data = await AddressModel.find({userId : _id}).sort({createdAt : -1});

        return res.json({
            message : "List of address",
            success : true,
            error : false,
            data
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

export async function updateAddressController(req, res){
    try {
        const {_id : userId} = req.user;
        const {_id, address_line, city, country, pincode, mobile, state } = req.body;

        const updatedAdd = await AddressModel.updateOne({_id : _id, userId : userId}, {
            address_line, 
            city, 
            country, 
            pincode,
            state, 
            mobile 
        })

        return res.json({
            message : "Address Updated",
            success : true,
            error : false,
            updatedAdd,
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

export async function deleteAddressController(req, res){
    try {
        const {_id : userId} = req.user;
        const {_id} = req.body;

        const deleteAddress = await AddressModel.findByIdAndDelete({_id : _id, userId : userId});

        return res.json({
            message : "Address Removed",
            success : true,
            error : false,
            deleteAddress,
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