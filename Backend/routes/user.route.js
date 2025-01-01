import { Router } from "express";
import { forgotPasswordController, loginController, logoutController, refreshToken, register, resetPassword, updateUserDetails, uploadAvatar, userDetails, verifyEmailController, verifyForgotPasswordOtp } from "../controller/register.controller.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const useRouter = Router();

useRouter.post("/register", register);
useRouter.post('/verify-email', verifyEmailController);
useRouter.post('/login', loginController);
useRouter.get('/logout', auth,logoutController);
// useRouter.put('/upload-avatar', auth, upload.single('avatar'),uploadAvatar);
useRouter.put('/upload-avatar', auth, uploadAvatar);
useRouter.put('/update-user', auth, updateUserDetails);
useRouter.post('/forgot-password', forgotPasswordController);
useRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp);
useRouter.put('/reset-password', resetPassword);
useRouter.post('/refresh-token', refreshToken);
useRouter.get('/get-user', auth, userDetails);




export default useRouter;