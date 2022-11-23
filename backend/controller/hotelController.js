const asyncHandler = require('express-async-handler')

const Hotel = require('../models/hotelModel')

//@desc GetHotels
//@route GET/api/hotels
//@access  public

const getHotels = asyncHandler(async (req, res) => {
    const hotels = await Hotel.find()

    if (!hotels) {
        res.status(400)
        throw new Error('Hotels not found')
    }
    res.status(200).json(hotels)
})

//@desc GetHotel
//@route GET/api/hotels:id
//@access  public

const getHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id)

    if (!hotel) {
        res.status(400)
        throw new Error('Hotels not found')
    }
    res.status(200).json(hotel)
})

//@desc Create Hotels
//@route POST/api/hotels
//@access  private

const createHotels = asyncHandler(async(req, res) => {
      const { name, type, city, address, distance, desc, cheapestPrice } = req.body;

      //Validate input
      if( !name || !type || !city || !address || !distance || !desc || !cheapestPrice ) {
         res.status(400)
         throw new Error('Please add the required fields')
      }
    
      const hotel = await Hotel.create({
        name,
        type,
        city,
        address,
        distance,
        desc,
        cheapestPrice
      })
    
       res.status(200).json(hotel)

})


//@desc Update Hotels
//@route PUT/api/hotels/:id
//@access  private

const updateHotel = asyncHandler(async(req, res) => {
      const hotelUpdate = await Hotel.findByIdAndUpdate(req.params.id, req.body, {new: true})

      res.status(200).json(hotelUpdate)
})

//@desc Delete Hotel
//@route DELETE/api/hotels/:id
//@access  private

const deleteHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id)

    await hotel.remove()
    res.status(400).json({ success: true })
})

module.exports = {
    createHotels,
    updateHotel,
    deleteHotel,
    getHotels,
    getHotel,
}