const mongoose = require("mongoose");
const Messages = mongoose.Schema({
    messages:[]
})

module.exports = mongoose.model("Messages",Messages);