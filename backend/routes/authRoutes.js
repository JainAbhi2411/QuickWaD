// routes/authRoutes.js
const express = require('express');
const { signup, login , getUserProfile, updateUserProfile } = require('../controllers/authController');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
