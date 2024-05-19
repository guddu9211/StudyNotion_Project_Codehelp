const cloudinary = require('cloudinary').v2
require('dotenv').config()

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            // configuring the cloudinary to upload media
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    } catch(err) {
        console.log("Error occurred while connecting with Cloudinary", err);
    }
}