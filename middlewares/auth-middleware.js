const jwt = require('jsonwebtoken');
const authmiddleware = (req ,res ,next)=>{
    const authHeader = req.headers['authorization'] // here we acess the headers from the postman the authoriraziation section
    // console.log(authHeader);  // it give us the header 
    // console.log(typeof authHeader);
    const token  = authHeader && authHeader.split(" ")[1];
    if(!token){
        res.status(400).json({
            success : true , 
            message : "Acess denied please login to continue"
        }); 
    }
    try {
        const decodedToken =  jwt.verify(token , process.env.JWT_SCERET_KEY);
        console.log(decodedToken);
        req.userInfo = decodedToken;
        
        next();
        
    } catch (error) {
        console.log(error);
         res.status(400).json({
            success : true , 
            message : "Acess denied please login to continue"
         });
    }
}

module.exports = authmiddleware;