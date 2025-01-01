import jwt from "jsonwebtoken";
import UserModel from "../model/user.js";
import dotenv from 'dotenv';

dotenv.config();


async function generatedRefreshToken(userId){
    const token = await jwt.sign({id : userId}, "@123Ravi", {
        expiresIn : '7d'
    })
    const updateRefreshToken = await UserModel.updateOne({_id : userId}, {
        refresh_token : token,
    })
    return token;
}   

export default generatedRefreshToken;