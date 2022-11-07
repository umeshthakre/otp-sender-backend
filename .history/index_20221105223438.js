require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const data = require("./twilio-error-codes.json");
const app = express();
const Messages = require("./models/Messages");
var accountSid = process.env.TWILIO_ACCOUNT_SID
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
app.use(express.json());
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

app.get("/allContacts",(req,res)=>{
    Messages.find()
    .then((messages)=>{
        res.send(messages);
    })
    .catch((err)=>console.log(err))
})

app.post("/sendsms",(req,res)=>{
    const { to} = req.body;
    console.log("running this")
    const otp = Math.floor(Math.random()*1000000);
    client.messages
  .create({
     body: 'Hi, I am Umesh, this message is from my App built using Node.js and Twilio your otp is '+otp,
     from: '+19803757915',
     to: to
   })
  .then(
    (message)=>{
        //todo name should come from frontend
        const mes = new Messages({name:"Umesh",otp:otp});
        mes.save((err,me)=>{
            if(err) return console.log(err);
            console.log(me);
            return res.send({mesg:message})
        })
       
    }
  ).catch(
    (err)=>{
        for(let i = 0;i<data.length;i++){
            if(err.code === data[i].code){
                return res.send({mesg:data[i].message})
            }
        }
    }
  )
})


app.listen(process.env.PORT,(req,res)=>{
    console.log("running on "+process.env.PORT)
})

