const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth-middleware')

router.get('/welcome' ,authmiddleware, (req , res)=>{
    const {username , userId ,  role} = req.userInfo;

    res.json({
        message : "Welcome to the Homepage",
        user : {
            _id : userId,
            username,
            role
        }
    })
});

module.exports = router;    