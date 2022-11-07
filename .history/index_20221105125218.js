require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/",(req,res)=>{
    res.send({mesg:"running successfully"})
});


app.listen(process.env.PORT,(req,res)=>{
    console.log("running on "+process.env.PORT)
})