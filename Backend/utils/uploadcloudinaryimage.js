import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from 'fs'
import sharp from 'sharp';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
});

const uploadImageClodinary = async(path) => {    
    try{
        if (!fs.existsSync(path)) {
            console.error("File does not exist:", path);
            return;
        }

        const optimizedPath = './optimized-image.jpg';
        await sharp(path)
            .resize({ width: 1920 }) // Resize to 1920px width
            .toFile(optimizedPath);

        const uploadResult = await cloudinary.uploader.upload(optimizedPath, {resource_type : 'image'});
        return uploadResult;
    }
    catch(error){
        console.log(error);
    }
}

// const uploadImageClodinary = async(image)=>{
//     const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

//     const uploadImage = await new Promise((resolve,reject)=>{
//         cloudinary.uploader.upload_stream({ folder : "binkeyit"},(error,uploadResult)=>{
//             return resolve(uploadResult)
//         }).end(buffer)
//     })

//     return uploadImage
// }

export default uploadImageClodinary