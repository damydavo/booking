const express = require('express')

const { createHotels, updateHotel, deleteHotel, getHotel, getHotels } = require('../controller/hotelController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(getHotels).post(protect, createHotels)

router.route('/:id').get(getHotel).put(protect, updateHotel).delete(protect, deleteHotel)

module.exports = router
