const express = require('express')

const { createRoom, getRooms, getRoom, updateRoom, deleteRoom, } = require('../controller/roomController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(getRooms)
router.route('/:id').get(getRoom).put(protect, updateRoom)
router.route('/:id/:hotelid').delete(protect, deleteRoom)
router.route('/:hotelid').post(protect, createRoom)

module.exports = router
