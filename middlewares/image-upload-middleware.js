const multer =  require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination :  function(req , file , cb){
        cb(null , "uploads/")
    },
    filename : function(req ,file , cb){
        cb(null, 
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }

});

const filterFile = function(req , file , cb){
   if (file.mimetype.startsWith('image')) {
    cb(null, true);
  }
    else{
        cb(new Error("Please upload the Image file"));
    }
}

module.exports = multer ({
    storage : storage,
    fileFilter : filterFile,
    limits : {
        filesize : 5 * 1024 * 1024 
    }
});