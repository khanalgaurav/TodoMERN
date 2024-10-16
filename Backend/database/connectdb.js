const mongoose = require('mongoose');
const urlConnection = process.env.MONGO_CONN;
const connect = ()=>{mongoose.connect(urlConnection).then(console.log('db connected'))}

module.exports = {connect};

