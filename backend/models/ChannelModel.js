const mongoose = require('mongoose')

// Create Channel Schema
const channelSchema = new mongoose.Schema(
    {
        channelName: {type: "String", trim: true},
        // Refer to a list of User
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        // Refer to a Message
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",

        },
        // Refer to a User
        groupAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },{
        timestamps: true,
    })

// Mongoose Channel Model - for ODM purposes
const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel