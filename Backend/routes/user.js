const express = require('express');

const router = express.Router();

const { userAuthentication } = require('../middlewares/authentication.js');
const { getAllUsers, createNewUser, updateUser, deleteUser,getUser } = require('../controllers/user.js');



router.get('/user',getAllUsers)
router.post('/user',userAuthentication,createNewUser)
router.get('/user/:id',getUser)
router.put('/user/:id', updateUser);
router.delete('/user/:id',deleteUser);


module.exports =  router;