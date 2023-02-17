const express = require('express')
const {authGuard} = require('../middleware/authMiddleware')
const {createChannel, renameChannel, addToChannel, removeFromChannel, privateChannel, fetchChannels} = require('../controllers/channelController')
const router  = express.Router()

router.route('/')
    .post(authGuard, privateChannel) // Private message
    .get(authGuard, fetchChannels) // get All Channels

router.route('/group').post(authGuard,createChannel) // Create Channel
router.route('/rename').put(authGuard,renameChannel) // Rename Channel
router.route('/groupAdd').put(authGuard, addToChannel) // Add user to channel
router.route('/groupRemove').put(authGuard, removeFromChannel) // Remove user from channel


module.exports = router