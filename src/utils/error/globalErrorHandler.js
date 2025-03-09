import cloudinary from '../multer/cloud.config.js';

const globalErrorHandler = async (error, req, res, next) => {  
    
    if (req.file?.path) {
        // Extract public_id from Cloudinary URL and delete it
        await cloudinary.uploader.destroy(req.public_id);
    }

    if (req.files) {
        await req.public_ids.map(async file => {
            await cloudinary.uploader.destroy(file.public_id);
        });
    }
    const status = error.cause || 500;
    return res
    .status(status)
    .json({
        success: false,
        message: error.message || error,
        stack: error.stack 
    });
};

export default globalErrorHandler;