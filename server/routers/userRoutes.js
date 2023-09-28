const express = require('express')
const router = express.Router()

const {
    registerUser,
    loginUser,
    getUser,
} = require('../controllers/userController.js')

const { protect } = require('../middleware/authMiddleware.js')

router.post('/signup', registerUser);

router.post('/login', loginUser)

router.get('/me', protect, getUser)

module.exports = router;
