import UserModel from "../model/user.js";

export async function admin(req, res, next){
    try {
        
        const {role} = req.user;

        if(role !== 'Admin'){
            return res.status(400).json({
                message : "You Do not Have Permission",
                error : true,
                success : false
            })
        }

        next();
    } 
    catch (error) {
        return res.status(500).json({
            message : error,
            success : false,
            error : true,
        })
    }
}