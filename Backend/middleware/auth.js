import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../model/user.js';

dotenv.config();

export async function auth(req, res, next){
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization;
        if(!token){
            return res.status(400).json({
                message : "Provide token",
                error : true,
                success : false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)

        const user = await UserModel.findOne({_id : decode.id});

        req.user = user;
        next();
    } 
    catch (error) {
        res.status(500).json({
            message : error.message,
            error : true,
            success : false,
        })
    }
}