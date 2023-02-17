const jwt =  require('jsonwebtoken')
const {parentDir} = require("../utils")

require('dotenv').config({path: parentDir() +'/.env'})

// Generating JWT with 1h expiration
const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.TOKEN_EXPIRATION
    })
}

module.exports = genToken