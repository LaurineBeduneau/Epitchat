const mongoose = require('mongoose')

// Create Message Schema
const messageSchema = new mongoose.Schema(
    {
        sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, // Refer to a User
        content: {type: "String", trim: true},
        channel: {type: mongoose.Schema.Types.ObjectId, ref: "Channel"}, // Refer to a Channel
    },{
        timestamps: true,
    })

// Mongoose Message Model - for ODM purposes
const Message = mongoose.model('Message', messageSchema)

module.exports = Message