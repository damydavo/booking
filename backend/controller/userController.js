const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

//@desc Register a new user
//@route  POST/api/users
//@access  public
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;

    //check for Validation
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    //check if user already exist
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    })

    if (user) {
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        })

    }

})

//@desc Login user
//@route  POST/api/users/login
//@access  public
const loginUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body

    //get one user
    const user = await User.findOne({ email })

    //get if user matches the one in database
    if (user && (await bcrypt.compare(password, user.password))) {
        if (user) {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id)
            })
        }
    }

    else {
        res.status(401)
        throw new Error('Invalid credential')
    }
})

//@desc GetUsers
//@route GET/api/user
//@access  public
const getUsers = asyncHandler(async (req, res) => {
    const user = await User.find()

    if (req.user.isAdmin) {
        res.status(200).json(user)

    } else {
        res.status(400)
        throw new Error('Not Authorized')
    }

})

//@desc GetUser
//@route GET/api/user:id
//@access  public
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(400)
        throw new Error('Users not found')
    }
    res.status(200).json(user)
})

//@desc Update User
//@route PUT/api/users:id
//@access  private

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error('Not Authorized')
    }

    const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(userUpdate)
})

//@desc Delete Hotel
//@route DELETE/api/hotels/:id
//@access  private

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(400)
        throw new Error('Not authorized')
    }


    await user.remove()
    res.status(400).json({ success: true })
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}