const express = require('express');
const router = express.Router();
const {loginUser,logoutUser} = require('../controllers/login');
const { mustBeLoggedIn } = require('../middlewares/authentication');

router.post('/login',loginUser)
router.get('/logout',mustBeLoggedIn,logoutUser)
module.exports= router;