const express = require('express')
const {signUp, signIn, fetchUsers} = require('../controllers/userController')
const {authGuard} = require('../middleware/authMiddleware')
const router  = express.Router()

router.route('/')
    .post(signUp) // Register
    .get(authGuard, fetchUsers) // list all users

router.post('/login', signIn) // Sign In

module.exports = router