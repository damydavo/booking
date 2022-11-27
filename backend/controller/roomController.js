const asyncHandler = require('express-async-handler')
const Rooms = require('../models/roomModule')
const Hotels = require('../models/hotelModel')

const createRoom = asyncHandler(async (req, res) => {
    const { title, price, maxPeople, desc, roomNumbers } = req.body;

    if (!title || !price || !maxPeople || !desc) {
        res.status(400)
        throw new Error("Please include all fields")
    }


    const createRooms = await Rooms.create({
        title,
        price,
        maxPeople,
        desc,
        roomNumbers
    })

    await Hotels.findByIdAndUpdate(req.params.hotelid, { $push: { rooms: createRooms._id } })

    if (req.user.isAdmin) {
        res.status(200).json(createRooms)
    }
})

//@desc GetHotels
//@route GET/api/hotels
//@access  public

const getRooms = asyncHandler(async (req, res) => {
    const rooms = await Rooms.find()

    if (!rooms) {
        res.status(400)
        throw new Error('Hotels not found')
    }
    res.status(200).json(rooms)
})

//@desc GetHotel
//@route GET/api/hotels:id
//@access  public

const getRoom = asyncHandler(async (req, res) => {
    const room = await Rooms.findById(req.params.id)

    if (!room) {
        res.status(400)
        throw new Error('Room not found')
    }
    res.status(200).json(room)
})

//@desc Update Hotels
//@route PUT/api/hotels/:id
//@access  private

const updateRoom = asyncHandler(async (req, res) => {
    const roomUpdate = await Rooms.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (req.user.isAdmin) {
        res.status(200).json(roomUpdate)
    }
})

//@desc Delete Hotel
//@route DELETE/api/hotels/:id
//@access  private

const deleteRoom = asyncHandler(async (req, res) => {
    const room = await Rooms.findById(req.params.id)

    if (req.user.isAdmin) {
        await room.remove()
        await Hotels.findByIdAndUpdate(req.params.hotelid, { $pull: { rooms: req.params.id } })

        res.status(400).json({ success: true })
    }

})


module.exports = {
    createRoom,
    getRooms,
    getRoom,
    updateRoom,
    deleteRoom,
}