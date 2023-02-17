const asyncHandler = require('express-async-handler')
const Channel = require('../models/ChannelModel')
const User = require('../models/UserModel')

const createChannel = asyncHandler( async (req, res) => {
    const {name, users} = req?.body
    // Empty fields check
    if(!name || !users){
        return res?.status(400).json({message: "Please fill all fields"})
    }

    const parsedUsers = JSON.parse(users)

    // Politicise of channel creation - At least 2 members required
    if(parsedUsers.length < 2){
        return res?.status(400).json({message: "More than one user is required to forms a channel"})
    }

    // Adding self
    parsedUsers.push(req?.user)

    try {
        // Saving groupChannel
        const groupChannel = await Channel.create({
            channelName: name,
            users: parsedUsers,
            groupAdmin: req?.user
        })

        // Populating the groupChannel info before resent
        const detailedGroupChannel = await Channel.findOne({_id: groupChannel._id})
            // Get mentioned users without their password
            .populate("users", "-password")
            // Get Channel Admin without his password
            .populate("groupAdmin", "-password")

        res?.status(200).json(detailedGroupChannel)
    } catch (err) {
        res?.sendStatus(400)
        throw new Error(err.message)
    }

})

const renameChannel = asyncHandler( async (req, res) => {
    const {channelId, channelName} = req?.body

    // Recherche et mise a jour du `suppose` channel
    const updatedChannel = await Channel.findByIdAndUpdate(
        channelId,
        {channelName},
        // Commit
        {new: true}
    ).populate("users","-password")
        .populate("groupAdmin", "-password")

    sendBackChannel(res, updatedChannel)
})

const addToChannel = asyncHandler( async (req, res) => {
    const {channelId, userId} = req?.body

    // Append new user to list
    const updatedChannel = await Channel.findByIdAndUpdate(
        channelId,
        {$push: {users: userId}},
        // Commit
        {new: true}
    ).populate("users","-password")
        .populate("groupAdmin", "-password")

    sendBackChannel(res, updatedChannel)
})

const removeFromChannel = asyncHandler( async (req, res) => {
    const {channelId, userId} = req?.body

    // Remove user from list
    const updatedChannel = await Channel.findByIdAndUpdate(
        channelId,
        { $pull: {users: userId}},
        // Commit
        {new: true}
    ).populate("users","-password")
        .populate("groupAdmin","-password")

    sendBackChannel(res, updatedChannel)
})

// Channels message handler
const privateChannel = asyncHandler( async (req, res) => {
    const {userId} = req?.body

    if(!userId){
        res?.sendStatus(400)
    }

    let isChannel = await Channel.find(
        {users:{$all:[req?.user._id,userId]}}
    )
        .populate("users","-password")
        .populate("lastMessage")

    isChannel = await User.populate(isChannel,{
        path: "lestMessage.sender",
        select: "name pic email"
    })

    if(isChannel?.length > 0){
        res?.send(isChannel[0])
    } else {
        let channelData = {
            channelName: "sender",
            users: [req?.user._id, userId]
        }

        try {
            const createChannel = await Channel.create(channelData)

            const listChannel = await Channel.findOne({_id: createChannel._id}).populate("users","-password")

            res?.status(200).json(listChannel)
        } catch (e) {
            throw new Error(e.message)
        }
    }
})

// Finds all Channels having the given user
const fetchChannels = asyncHandler((req, res) => {
    try{
        Channel.find({users:{$elemMatch:{$eq: req?.user._id}}})
            .populate("users","-password")
            .populate("groupAdmin","-password")
            .populate("lastMessage")
            .sort({updatedAt: -1})
            .then( async(results) => {
                results = await User.populate(results, {
                    path: "lastMessage.sender",
                    select: "name pic email"
                })
                res?.status(200).json(results)
            })
    } catch (err) {
        res?.status(400)
        throw new Error(err.message)
    }
})

// Checking operation status
function sendBackChannel(res, updatedChannel){
    if(!updatedChannel){
        res?.status(404)
        throw new Error('Channel not found')
    } else {
        res?.status(200).json(updatedChannel)
    }
}

module.exports = {createChannel, renameChannel, addToChannel, removeFromChannel, privateChannel, fetchChannels}

