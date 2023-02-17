const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')

// Determine if User has authorization before using features
const authGuard = asyncHandler( async (req, res, next) => {
    let token

    if(req?.headers.authorization?.startsWith('Bearer')){
        try {
            // Decode token
            token = req?.headers.authorization?.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (err) {
            res?.status(401)
            throw new Error('Not authorized, token is invalid')
        }
    }

    if(!token){
        res?.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {authGuard}