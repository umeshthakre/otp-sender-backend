require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const data = require("./twilio-error-codes.json");
const app = express();
const Messages = require("./models/Messages");
var accountSid = process.env.TWILIO_ACCOUNT_SID
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const cors = require("cors")
app.use(express.json());
app.use(cors());

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
    Messages.find().sort({_id:-1})
    .then((messages)=>{
        res.send({messages:messages});
    })
    .catch((err)=>{return res.send({success:false,mesg:err})})
})

try {
    app.post("/sendsms",(req,res)=>{
        const {otp, to,text,name} = req.body;
        console.log("running this");

        client.messages
      .create({
         body: text,
         from: '+19803757915',
         to: to
       })
      .then(
        (message)=>{
            //todo name should come from frontend
            const mes = new Messages({name:name,otp:otp});
            mes.save((err,me)=>{
                if(err) return console.log(err);
                console.log(me);
                return res.send({success:true, mesg:message})
            })
        }
      ).catch(
        (err)=>{
            for(let i = 0;i<data.length;i++){
                if(err.code === data[i].code){
                    return res.send({success:false,mesg:data[i].message})
                }
            }
        }
      )
    })
    
} catch (error) {
    return res.send({success:false,message:"error please try again"})
}



app.listen(process.env.PORT,(req,res)=>{
    console.log("running on "+process.env.PORT)
})

