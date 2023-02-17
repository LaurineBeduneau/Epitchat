const asyncHandler = require('express-async-handler')
const User = require("../models/UserModel")
const genToken = require('../config/tokenGen')

// Create a new User
const signUp = asyncHandler( async (req, res) => {
    let {name, email, password} = req?.body

    // Checking for empty field
    if(!name){
        res?.sendStatus(400)
        throw new Error('Please fill all the required fields')
    }

    // User already exists ?
    const userExists = await User.findOne({name})
    if(userExists) {
        res?.sendStatus(400)
        throw new Error('User already exists')
    }

    // Adding new user
    const user = await User.create({name, email, password})
    if(user) {
        sendBackUser(res, user)
    } else {
        res?.sendStatus(404)
        throw new Error('Failed to create user')
    }
})

const signIn = asyncHandler( async (req, res) => {
    const {name, email, password} = req?.body

    const user = await User.findOne({name})

    // User exists ?
    if(user?.name){
         
        // User had Email/Password - Usurpation ?
        if (user.email && user.password){
            if (user.email !== email || !(await user?.matchPassword(password))){
                res?.sendStatus(404)
                throw new Error('Invalid Email or Password')
            }
        }

        sendBackUser(res, user)
    } else {
        res?.sendStatus(404)
        throw new Error('User not found')

    }
})

// Get All System users by name or email - except self
const fetchUsers = asyncHandler( async (req, res) => {
    const keyword = req?.query.search
    ? {
        $or : [
            {name: {$regex: req.query.search, $options: "i"}}, // Look for name matching case-insensitive
            {email: {$regex: req.query.search, $options: "i"}}, // Look for email matching case-insensitive
        ]
        }
        : {}

    const users = await User.find(keyword).find({_id: {$ne: req?.user._id}})
    res?.status(200).json(users)
})

function sendBackUser(res, user) {
    res?.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: genToken(user._id)
    })
}

module.exports = {signIn, signUp, fetchUsers}