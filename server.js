const express = require('express');
const { connect } = require('./database/connectdb');
const userRouter = require('./routes/user.js');

const PORT = 8000;
const app = express();

//middlewares
app.use(express.json())
app.use('/api/',userRouter)


connect();

app.get('/',(req,res)=>{
    res.send("<h1>Home Page</h1>");
})


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})