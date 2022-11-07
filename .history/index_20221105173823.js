require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const data = require("./twilio-error-codes.json");
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
    client.messages
  .create({
     body: 'Hi, I am Umesh, this message is from my App built using Node.js and Twilio your otp is '+Math.floor(Math.random()*1000000),
     from: '+19803757915',
     to: ''
   })
  .then(
    (message)=>{
        return res.send({mesg:message})
    }
  ).catch(
    (err)=>{
        for(let i = 0;i<AllErrorCodes.length;i++){
            if(err.code === AllErrorCodes[i].code){
                return res.send({mesg:AllErrorCodes[i].message})
            }
        }
    }
  )
})


app.listen(process.env.PORT,(req,res)=>{
    console.log("running on "+process.env.PORT)
})

