const mongoose = require('mongoose')

const HotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        require: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: true
    },
    distance: {
        type: String,
        require: true
    },
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false,
    }
    
},
)

module.exports = mongoose.model('Hotel', HotelSchema)