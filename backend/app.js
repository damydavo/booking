const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const { errorHandler } = require('./middleware/errorMiddleware')

const connectDB = require('./config/db')

//Database connection
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Welcome to my first route')
})

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/hotels', require('./routes/hotelRoutes'))


app.use(errorHandler);

app.listen(port, () => console.log(`app is listening on port ${port}`))