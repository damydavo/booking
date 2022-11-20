const asyncHandler = require('express-async-handler')

const Hotel = require('../models/hotelModel')


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
//@route POST/api/hotels/:id
//@access  private

const updateHotel = asyncHandler(async(req, res) => {
      const hotelUpdate = await Hotel.findByIdAndUpdate(req.params.id, req.body, {new: true})

      res.status(200).json(hotelUpdate)
})



module.exports = {
    createHotels,
}