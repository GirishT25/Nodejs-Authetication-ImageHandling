const User = require('../models/User-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');  
// register router
const registerUser = async (req ,res) =>{
    try {
        const {username , email , password , role} = req.body;
        const chechExistingUser = await User.findOne({
            $or :  [{username} , {email}]           
        });
        if(chechExistingUser){
            res.status(500).json({
                message : "User already exist Try with another username or email",
                success : false
            })
        }

        const salt  =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const newUser = new User({
                username ,
                email ,
                password : hashedPassword,
                setRole : role || 'user'
        })
        await newUser.save();

        if(newUser){
            res.status(201).json({
                message : "User is successfully register",
                success : true
            })
        }
        else{
            res.status(400).json({
                message : "User not register please Try again sometime",
                success : true
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Some error occured! Try again sometime",
            success : true
        })
    }
}

// login router 
const loginController = async(req , res)=>{
        try {
            const {username , password} = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({
                    success : false,
                    message : "User Does not exist"
                })
            }

            const isPasswordMatch = await bcrypt.compare(password , user.password);
            if(!isPasswordMatch){
                return res.status(400).json({
                    success : false,
                    message : "Invaild credentials"
                })
            }


            // creating the json web token
            const accessToken = jwt.sign({
                userId : user._id,
                username : user.username,
                role : user.setRole
            },process.env.JWT_SCERET_KEY , {
                expiresIn : '15m'
            } )

            res.status(200).json({
                success : true,
                data : accessToken
            })
        
    } catch (error) {
        res.status(500).json({
            message : "Some error occured! Try again sometime",
            success : true
        })
    }
}

const changePassword = async(req, res)=>{
    try {
        // get the password
        const {oldpassword , newPassword} = req.body;

        // get the user
        const CurrentUserId = req.userInfo.userId;
        
        const CurrentUser = await User.findById(CurrentUserId)

        // check the user
        if(!CurrentUser){
            res.status(400).json({
                message : "User not found",
                success : false
            })
        }

        const checkisPassword = await bcrypt.compare(oldpassword , CurrentUser.password);
        if(!checkisPassword){
            res.status(400).json({
                success : false ,
                message : "Password does not match"
            })
        }
        const salt  =  await bcrypt.genSalt(10);
        const NewHashPassword = await bcrypt.hash(newPassword , salt);

        CurrentUser.password = NewHashPassword;
        await CurrentUser.save();

        res.status(200).json({
            message : "Password Sucessfull",
            success : true
        })        
    } catch (error) {
        res.status(500).json({
            message : "Some error occured! Try again sometime",
            success : true
        })
    }
}





module.exports = {registerUser , loginController , changePassword};