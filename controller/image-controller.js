const Image = require('../models/Image');
const {uploadCloudinary} = require('../helper/cloudinaryhelper'); 
// const { model } = require('mongoose');
const fs = require('fs');
const cloudinary = require('../config/cloudinary')

const uploadImage = async(req ,res)=>{
    try {
        if(!req.file){
            res.status(400).json({
                success : false,
                message : "File is required to upload" 
            })
        }

        const {url , publicId} = await uploadCloudinary(req.file.path);

        const newlyImageuplaod = new Image({
            url ,
            publicId ,
            uploadedBy : req.userInfo.userId
        })

        await newlyImageuplaod.save(); 


        // delete the image

        // fs.unlinkSync(req.file.path);

        res.status(201).json({
            message:"Image uploaded successfully",
            data : newlyImageuplaod 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false ,
            message : "Some error occured try again later"
        })
    }
}


const fetchAllImage = async (req , res)=>{
    try {
        const AllImages = await Image.find({});
        if(!AllImages){
            res.status(400).json({
                success : false ,
                message : "Images are Not present"
            })
        }
        res.status(200).json({
            message : "All images",
            success : true ,
            data : AllImages
        })
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const deleteImageController = async (req , res)=>{
    try {
        
        const deleteImageId  =  req.params.id;
        const UserId = req.userInfo.userId;

        const imagepresent = await Image.findById(deleteImageId);
        if(!imagepresent){
            return res.status(404).json({
                success : false,
                message :"Image not found"
            })
        }
        if(imagepresent.uploadedBy.toString() !== UserId){
           return res.status(403).json({
            success : false,
            message : "You are not authorized to delete image"
           }) 
        }

        
    await cloudinary.uploader.destroy(imagepresent.publicId);

    await Image.findByIdAndDelete(deleteImageId);

    res.status(200).json({
        success  :  false ,
        message : "Image deleted successfully"
    })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}


module.exports = {
    uploadImage ,
    fetchAllImage,
    deleteImageController
}