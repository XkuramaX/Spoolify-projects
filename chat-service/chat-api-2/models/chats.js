const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    channel_id:{
        type:String,
        required: true
    },
    text:{
        type:String,
    },
    user:{
        type:String,
    },
    role:{
        type:String
    },
    status:{
        type:String,
    },
    time:{
        type:String,
    },
    email:{
        type:String,

    }

})

module.exports = mongoose.model('Chat',chatSchema)