const asyncHandler = require('express-async-handler')
const Message = require('../models/MessageModel')
const User = require('../models/UserModel')
const Channel = require('../models/ChannelModel')

const sendMessage = asyncHandler(async (req, res) => {
    const {content, channelId} = req?.body

    if(!channelId || !content){
        return res?.sendStatus(400)
    }

    let newMessage = {
        sender: req?.user._id,
        content,
        channel: channelId
    }

    try {
        // Create new message
        let message = await Message.create(newMessage)

        // Populate the abstract information
        message = await message.populate("sender", "name pic")
        message = await message.populate("channel")
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        })

        // Update the chat latest message
        await Channel.findByIdAndUpdate(
            channelId,
            {lastMessage: message},
            {new: true}
        )

        res?.status(200).json(message)
    } catch (e) {
        res?.status(400)
        throw new Error(e.message)
    }
})

// get all messages from a specific channel
const getChannelMessages = asyncHandler( async (req, res) => {
    try {
        const messages = await Message.find({channel: req?.params.channelId})
            .populate("sender","name pic email")
            .populate("channel")

        res?.status(200).json(messages)
    } catch (e) {
        res?.status(400)
        throw new Error(e.message)
    }
})

module.exports = {
    sendMessage,
    getChannelMessages
}