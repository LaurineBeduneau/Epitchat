const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const {parentDir} = require("../utils")
require('dotenv').config({path: parentDir() +'/.env'})

const dbConnect  = async () => {
    const URI = `mongodb+srv://${process.env.USR}:${process.env.PASSWORD}@${process.env.COLLECTION}.vwpjyrw.mongodb.net/?retryWrites=true&w=majority`
    try {
        const conn =  await mongoose?.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`Mongo connected as ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error : ${err}`)
        process.exit(400) // Exit on error
    }
}

module.exports = dbConnect