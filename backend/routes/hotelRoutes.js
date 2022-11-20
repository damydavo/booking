const express = require('express')

const { createHotels } = require('../controller/hotelController')

const router = express.Router()

router.post('/', createHotels)

module.exports = router
