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
    client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+19803757915',
     to: '+918329328122'
   })
  .then(
    (message)=>{
        return res.send({mesg:message})
    }
  ).catch(err=>console.log(err))
})


app.listen(process.env.PORT,(req,res)=>{
    console.log("running on "+process.env.PORT)
})