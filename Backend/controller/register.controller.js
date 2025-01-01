import sendEmail from '../config/sendemail.js';
import UserModel from '../model/user.js';
import bcrypt from 'bcrypt';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import genreateAccessToken from '../utils/generatedaccesstoken.js';
import generatedRefreshToken from '../utils/generatedrefreshtoken.js'
import uploadImageClodinary from '../utils/uploadcloudinaryimage.js';
import generateOtp from '../utils/generateotp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import jwt from 'jsonwebtoken'


// contoller for register a user
export async function register(req, res){
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message : 'Please enter name email and password',
                error : true,
                success : false,
            })
        }

        const user = await UserModel.findOne({email});
        if(user){
            return res.json({
                message : "User already registered",
                error : true,
                success : false
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const payload = {
            name,
            email,
            password : hashPassword,
        }

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const verifyEmailURL = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;

        const verifyEmail = sendEmail({
            sendTo : save.email,
            subject : "Verify email from binkeyIt",
            html : verifyEmailTemplate({
                name : save.name,
                url : verifyEmailURL,
            })
        })

        return res.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })
    }
    catch(error){
        res.status(500).json({
            message : error.message || message,
            error : true,
            success : false,
        })
    }
}

// controller for verify a email of user
export async function verifyEmailController(req, res){
    try {
        const {code} = req.body;
        const user = await UserModel.findOne({_id : code});
        if(!user){
            return res.json({
                message : "Invalid code",
                error : true,
                success : false,
            })
        }

        const updateUser = await UserModel.updateOne({_id : code}, {verify_email : true});

        return res.json({
            message : "Verify email done",
            success : true,
            error : false,
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : error.message,
            error : true,
            success : false,
        })
    }
}

// controller for login
export async function loginController(req, res){
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message : "Please enter field",
                success : false,
                error : true,
            })
        }
        const user = await UserModel.findOne({email}).populate('address_details');
        console.log(user);
        

        if(!user){
            return res.status(400).json({
                message : "User not register",
                success : false,
                error : true,
            })
        }

        if(user.status !== 'Active'){
            return res.status(400).json({
                message : "Please contact admin",
                success : false,
                error : true,
            })
        }
        
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(400).json({
                message : "Check your Password",
                success : false,
                error : true,
            })
        }

        const accessToken = await genreateAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None",
        }

        const updateUser = await UserModel.findByIdAndUpdate({_id : user._id}, {
            last_login_date : new Date(),
        })

        res.cookie('accessToken', accessToken, cookieOption)
        res.cookie('refreshToken', refreshToken, cookieOption)

        return res.json({
            message: "Login Successfully",
            error : false,
            success : true,
            data : {
                accessToken,
                refreshToken,
            }
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

// controller for logout
export async function logoutController(req, res){
    try{
        const user = req.user;
        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None",
        }
        res.clearCookie("accessToken", cookieOption)
        res.clearCookie("refreshCookie", cookieOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate({_id : user._id}, {
            refresh_token : "",
        })

        return res.json({
            message : "Logout Successful",
            error : false,
            success : true,
        })
    }
    catch(error){
        return res.status(500).json({
            message : error.message,
            error : true,
            success : false,
        })
    }
}

// controller for upload avatar
export async function uploadAvatar(req, res){
    try{
        const image = req.files.image.tempFilePath; //multer auth middleware
        const user = req.user; //from auth middleware 
        const upload = await uploadImageClodinary(image);
        const updateUser = await UserModel.findByIdAndUpdate({_id : user._id}, {
            avatar : upload.url,
        })
        
        return res.json({
            message : "Upload Profile",
            success : true,
            error : false,
            data : {
                _id : user._id,
                avatar : upload.url
            }
        })
    }
    catch(error){
        return res.status(500).json({
            message : error.message,
            success : false,
            error : true,
        })
    }
}

// controller for update user
export async function updateUserDetails(req, res){
    try {
        const user = req.user;  //from auth middleware
        console.log(req.body);
        const {name, email, mobile} = req.body;

        Object.keys(req.body).forEach((keys) => (user[keys] = req.body[keys]));
        const data = await user.save();

        // another method to update a user

        // const data = await UserModel.updateOne({_id : user._id}, {
        //     ...(name && {name : name}),
        //     ...(email && {email : email}),
        //     ...(mobile && {mobile : mobile}),
        // })

        
        res.json({
            message : "User Update Successfully",
            data,
            error : false,
            success : true
        })
    } 
    catch (error) {
        res.status(500).json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

// controller for forgot password otp not login
export async function forgotPasswordController(req, res){
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email : email});
        if(!user){
            return res.status(400).json({
                message : "Email not available",
                success : false,
                error : true,
            })
        }

        const otp = generateOtp();
        const expireTime = new Date() + 60 * 60 * 1000 // 1hr;

        const update = await UserModel.findByIdAndUpdate({_id :user._id}, {
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString(),
        })

        await sendEmail({
            sendTo : email,
            subject : "Forgot password from Binkeyit",
            html : forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return res.json({
            message : "OTP SENT, Check your Email",
            error : false,
            success : true,
        })
    } 
    catch (error) {
        res.status(500).json({
            error : error.message,
            success : false,
            error : true
        })    
    }
}

// controller for verify otp 
export async function verifyForgotPasswordOtp(req, res){
    try {
        const {email, otp} = req.body;
        if(!email || !otp){
            return res.status(400).json({
                message : "Please provide email and otp",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "Please Enter correct field",
                error : true,
                success : false
            })
        }

        const currentTime = new Date().toISOString();

        if(user.forgot_password_expiry < currentTime){
            return res.status(400).json({
                message : "OTP is expired",
                error : true,
                success : false
            })
        }

        if(otp.toString() !== user.forgot_password_otp.toString()){
            return res.status(400).json({
                message : "Please enter correct otp",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({_id : user._id}, {
            forgot_password_expiry : "",
            forgot_password_otp : "",
        })

        return res.json({
            message : "OTP Verified Successfully",
            error : false,
            success : true
        })        
    } 
    catch (error) {
        res.status(500).json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

// controller for reset-password
export async function resetPassword(req, res){
    try {
        const {email, password, confirmPassword} = req.body;

        console.log(email, password, confirmPassword);

        if(!email || !password || !confirmPassword){
            res.status(400).json({
                message : "Please enter a field",
                success : false,
                error : true
            })
        }

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message : "Please enter a correct email",
                success : false,
                error : true,
            })
        }

        if(password != confirmPassword){
            return res.status(400).json({
                message : "New Password and Confirm Password is not same",
                success : false,
                error : true,
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(confirmPassword, salt);

        const update = await UserModel.findOneAndUpdate({email : email}, {
            password : hashPassword
        })

        return res.json({
            message : "Password Updated Successfully",
            error : false,
            success : true
        })        
    } 
    catch (error) {
        res.status(500).json({
            message : error.message,
            success : false,
            error : true
        })
    }
}

// controller for reset refresh-token
export async function refreshToken(req, res){
    try {
        const refreshToken = req.cookies.refreshToken || req.headers.authorization.split(" ")[1];
        if(!refreshToken){
            return res.status(400).json({
                message : "Invalid Token",
                error : true,
                success : false,
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY);
        if(!verifyToken){
            return res.status(400).json({
                "message" : "Token Expired",
                error : true,
                success : false,
            })
        }

        const userId = verifyToken.id;

        const newAccessToken = await genreateAccessToken(userId);

        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        res.cookie('accessToken', newAccessToken, cookieOption);

        return res.json({
            message : "New access token is generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken,
            }
        })

    } 
    catch (error) {
        res.status(500).json({
            message : error.message,
            success : false,
            error : true
        })
    }
}

// get login user details
export async function userDetails(req, res){
    try {
        const user = req.user;

        const loginUser = await UserModel.findById({_id : user._id}).select('-password -refresh_token');

        return res.json({
            data : loginUser,
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
