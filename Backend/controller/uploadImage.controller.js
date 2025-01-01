import uploadCloudinaryImage from "../utils/uploadcloudinaryimage.js";


export async function uploadImageController(req, res){
    try {
        const file = req.files.image.tempFilePath;
        const uploadImage = await uploadCloudinaryImage(file);
        return res.json({
            message : "Upload Done",
            error : false,
            success : true,
            uploadImage,
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : error,
            error : true,
            success : false,
        })
    }
}