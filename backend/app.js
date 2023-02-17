const express = require('express')
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

const dbConnect = require('./config/db')

const usersRoutes = require('./routes/usersRoutes')
const messagesRoutes = require('./routes/messagesRoutes')
const channelsRoutes = require('./routes/channelsRoutes')
const {notFound, errorHandler} = require("./middleware/errorMiddleware");

require('dotenv').config()

dbConnect() // Connection to MongoDB

// Servers initializations
const app = express()

app.use(express.json()) // To accept JSON data as requests
app.use(cors()) // To accept CORS data as requests

// API routes
app.use('/api/users', usersRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/channels', channelsRoutes)

// Testing route
app.get('/', (req, res) => {
    res.send('API is running')
})

// Middleware
// app.use(notFound)
// app.use(errorHandler)

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Ecoute sur le port ${port}`)
})

const io = new Server(server, {
    pingTimeout: 60000, // Ferme la connection apres 1 mn
    cors: {
        origin: '*',
        credentials: true,
    }
})

io.on("connect",(socket) => {
    // console.log("Connected to socket.io")

    socket.on('setup', (user) => {
        console.log(`${user.name} has connected`)
        socket.emit('connected')
    })

    socket.on("join chat", (room) => {
        socket.join(room)
        console.log("User Joined Room: " + room)
    })
    
    socket.on("typing", (room) => socket.in(room).emit("typing"))
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

    socket.on("new message", (newMessageRecieved) => {
        let channel = newMessageRecieved.channel

        if (!channel.users) return console.log("chat.users not defined")

        channel.users.forEach((user) => {
            if (user._id === newMessageRecieved.sender._id) return

            socket.in(user._id).emit("message received", newMessageRecieved)
        });
    });
    
    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
})