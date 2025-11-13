const mongoose = require('mongoose');
const ImageeSchema = new mongoose.Schema({
    url : {
        type : String,
        required  : true,

    },
    publicId : {
        type : String,
        required : true
    },
    uploadedBy :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('ImageSchema' , ImageeSchema);