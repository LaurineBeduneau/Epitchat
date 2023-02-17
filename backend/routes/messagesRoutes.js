const express = require('express')
const {authGuard} = require("../middleware/authMiddleware")
const {getChannelMessages, sendMessage} = require("../controllers/messageController")

const router  = express.Router()

router.route('/').post(authGuard,sendMessage) // Send message
router.route('/:channelId').get(authGuard, getChannelMessages) // Get all messages from the channel

module.exports = router