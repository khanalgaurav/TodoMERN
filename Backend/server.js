require('dotenv').config();
const express = require('express');
const { connect } = require('./database/connectdb.js');
const userRouter = require('./routes/user.js');
const loginRouter = require('./routes/login.js')
const PORT = process.env.PORT;
const app = express();

//middlewares
app.use(express.json())
app.use('/api/',userRouter)
app.use('/',loginRouter)

//database connection
connect();


app.get('/',(req,res)=>{
    res.send("<h1>Home Page</h1>");
})


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})