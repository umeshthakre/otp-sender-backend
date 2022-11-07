const mongoose = require("mongoose");
const Messages = mongoose.Schema({
    name:{
        type:String,
        max:20,
        required:true,
    },
    otp:{
        type:Number,
        required:true,
        
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("Messages",Messages);