require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();
var accountSid = process.env.TWILIO_ACCOUNT_SID
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
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

app.post("/sendsms",(req,res)=>{
    // const { to} = req.body;
    console.log("running this")
    client.messages.create({
        body:"hi i am Umesh, this is my assignmnet built using Node.js and twilio. Your OTP is "
        +Math.floor(Math.random()*1000000),
        to:"",
        from:'+19803757915'
    })
    .then((msg)=>{
        console.log("done");
        if(msg.error){
            console.log(msg);
            return res.send({success:false, mesg:msg.error})
        }
    })
})


app.listen(process.env.PORT,(req,res)=>{
    console.log("running on "+process.env.PORT)
})