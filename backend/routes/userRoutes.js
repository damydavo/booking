const express = require('express')

const { protect } = require('../middleware/authMiddleware')

const { registerUser, loginUser, getUsers, getUser, updateUser, deleteUser } = require('../controller/userController')

const router = express.Router()

router.route('/').post(registerUser).get(protect, getUsers)
router.route('/:id').get(protect, getUser).put(updateUser).delete(protect, deleteUser)

router.post('/login', loginUser)


module.exports = router
