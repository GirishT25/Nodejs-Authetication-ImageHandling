    const express =  require('express');
    const router = express.Router();
    const authmiddleware = require('../middlewares/auth-middleware')
    const adimAuth = require('../middlewares/admin-middleware')

    router.get('/welcome', authmiddleware ,adimAuth , (req , res)=>{
        res.json({
            message : "Welcome to the admin page"
        })
    })

    module.exports = router;