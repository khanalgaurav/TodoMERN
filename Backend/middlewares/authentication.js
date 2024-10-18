const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const userAuthentication = async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if (user!= null){
        res.json({success:false,message:"user already exists"})
    }else{
        next();
    }
}

const mustBeLoggedIn = async (req,res,next)=>{
    
    const {token} = req.cookies;
    if(token){
        const decodedToken = jwt.verify(token,process.env.JWT_TOKEN)
        req.user = await User.findById(decodedToken._id);
        next();
    }
    else{
        res.json({success:false,message:"User is not LoggedIN"})
    }
}



module.exports = {userAuthentication,mustBeLoggedIn};