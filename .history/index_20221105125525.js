require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    )
.then(()=>console.log("connected to db successfully"))
.catch((err)=>console.log(err));


app.get("/",(req,res)=>{
    res.send({mesg:"running successfully"})
});


app.listen(process.env.PORT,(req,res)=>{
    console.log("running on "+process.env.PORT)
})