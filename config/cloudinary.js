const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("./config.js");
const cloudinaryModule = require("cloudinary");

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloud_api_key,
    api_secret: config.cloud_api_secret,
});
console.log(cloudinary.config());

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const imageFormats = ["png", "jpg", "jpeg", "webp"];
        const videoFormats = ["mp4", "mov", "avi", "mkv"];
 
        // Get file extension
        const fileExtension = file.mimetype.split("/")[1];
 
        let resourceType = "auto"; // Cloudinary automatically detects type
 
        if (imageFormats.includes(fileExtension)) {
            resourceType = "image";
        } else if (videoFormats.includes(fileExtension)) {
            resourceType = "video";
        } else {
            throw new Error("Invalid file type. Allowed formats: PNG, JPG, JPEG, WEBP, MP4, MOV, AVI, MKV.");
        }
 
        return {
            folder: "Doctors-website",
            format: fileExtension,
            resource_type: resourceType,
            public_id: Date.now() + "-" + file.originalname,
        };
    },
});
 
const upload = multer({ storage });
 
module.exports = { upload, cloudinary };
