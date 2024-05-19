const cloudinary = require('cloudinary').v2

// if cloudinary does not work well, then do it using local files only :D
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = {folder};

    if(height) {
        options.height = height;
    }

    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}