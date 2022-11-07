require('dotenv').config()
const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send({mesg:"running successfully"})
});


app.listen(4000,(req,res)=>{
    console.log("running on "+4000)
})