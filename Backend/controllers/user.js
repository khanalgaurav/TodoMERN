const Users = require('../models/user.js');
const bcrypt = require('bcrypt');
const getAllUsers = async (req,res)=>{
    const users = await Users.find({});
    res.json(users)
}
const createNewUser = async (req,res)=>{
    const {username,password,email} = req.body;
    try{ 
        const user = new Users({username,password,email});
        user.password = await bcrypt.hash(password,10);
        await user.save()
        res.json({success: true,message:'User registered Successfully'})
    }
    catch(e){
        res.json({error: e.message})
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await Users.findOneAndUpdate(
            { _id:id },
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({success:true,message:'user updated successfully'});
    } 
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await Users.deleteOne(
            { _id:id },
            { new: true }
        );
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            success:true,
            message:"User Deleted Successfully"
        });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error Deleting user', error });
    }
}

const getUser = async (req,res)=>{
    const id = req.params.id;
    const user = await Users.findById(id) 
    res.json(user)
}


module.exports = {getAllUsers,createNewUser,updateUser,deleteUser,getUser}