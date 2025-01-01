import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();


async function genreateAccessToken(userId){
    const token = await jwt.sign({id : userId}, "@123Ravi", {
        expiresIn : '5h',
    })
    return token;
}


export default genreateAccessToken;