const express = require('express');
const {registerUser , loginController , changePassword} = require('../controller/auth-controller');
const router = express.Router(); // It is an small express app where it mange the moudlar and mountable route handlers
const authmiddleware = require('../middlewares/auth-middleware') 

router.post('/register' ,registerUser );
router.post('/login' ,loginController );
router.post('/changePass',authmiddleware,changePassword);


module.exports = router;
