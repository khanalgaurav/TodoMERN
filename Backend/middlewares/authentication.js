const User = require('../models/user.js')

const authentication = async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if (user!= null){
        res.json({message:"user already exists"})
    }else{
        next();
    }
}
module.exports = {authentication};