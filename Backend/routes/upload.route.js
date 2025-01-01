import { Router } from "express";
import { uploadImageController } from "../controller/uploadImage.controller.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const uploadRouter = Router();

uploadRouter.post("/upload", auth, uploadImageController);


export default uploadRouter;