const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth-middleware');
const adimAuth = require('../middlewares/admin-middleware');
const uploadImageCloudinary = require('../middlewares/image-upload-middleware')
const {uploadImage , fetchAllImage ,deleteImageController} = require('../controller/image-controller')

router.post('/upload' , authmiddleware , adimAuth ,uploadImageCloudinary.single('image') , uploadImage );
router.get('/get' , authmiddleware ,fetchAllImage)
router.delete('/deleteImg/:id' ,authmiddleware,adimAuth, deleteImageController);
module.exports = router