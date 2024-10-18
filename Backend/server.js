require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors')
const express = require('express');
const { connect } = require('./database/connectdb.js');
const userRouter = require('./routes/user.js');
const loginRouter = require('./routes/login.js')

const PORT = process.env.PORT;
const app = express();

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true // this allows cookies to be sent and received
}));
app.use('/api/',userRouter)
app.use('/',loginRouter)
//database connection
connect();


app.get('/',(req,res)=>{
    res.send("<h1>Home Page</h1>");
})
app.get('/login',(req,res)=>{
    res.send("<h1>Login Page</h1>");
})


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})