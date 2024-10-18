const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    const user = await Users.findOne({email:email});
    if(!user){
        res.status(404).json({success:false,message:'User is not registered'});
    }
    else{
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.json({
                success:false,
                message:"Incorrect Password"
            })
        }
        else{
            const token = jwt.sign({_id:user._id},process.env.JWT_TOKEN)
            res.cookie('token',token,{
                httpOnly: false, // Prevents client-side JavaScript from accessing the cookie
                secure: false, // Set to true if you're serving over HTTPS
                sameSite: 'lax', // Ensures the cookie is sent on cross-site requests (use 'strict' if you're not doing cross-origin)
                path: '/' 
            })
            res.json({
                success:true,
                message:"Logged in Successfully"
            })
        }
    }
}

const logoutUser = async (req,res)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now())
    })
    res.json({
        success:true,
        message:"Logged Out Successfully"
    })
}

module.exports= {loginUser,logoutUser};