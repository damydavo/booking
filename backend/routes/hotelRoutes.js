const express = require('express')

const { createHotels, updateHotel, deleteHotel, getHotel, getHotels } = require('../controller/hotelController')

const router = express.Router()

router.route('/').get(getHotels).post(createHotels)

router.route('/:id').get(getHotel).put(updateHotel).delete(deleteHotel)

module.exports = router
