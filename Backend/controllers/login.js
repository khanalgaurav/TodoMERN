const Users = require('../models/user');
const bcrypt = require('bcrypt')
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
            res.json({
                success:true,
                message:"Logged in Successfully"
            })
        }
    }
}

module.exports= {loginUser};