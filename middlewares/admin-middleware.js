
const isAdmin = (req ,res, next)=>{
    if(req.userInfo.role !== 'admin' ){
        res.json({
            success  : false ,
            message : "Acess deined ! Required Admin rights"
        }).status(400);
    }
    next();
}

module.exports = isAdmin;