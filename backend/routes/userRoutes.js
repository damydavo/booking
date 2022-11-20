const express = require('express')

const { registerUser, loginUser } = require('../controller/userController')

const router = express.Router()

router.post('/', registerUser)

module.exports = router
