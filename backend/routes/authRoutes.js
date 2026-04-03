const express = require('express');
const router = express.Router();

const { register, login, getProfile, updateProfile, updatePassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.put('/password', authMiddleware, updatePassword);

router.get('/test-auth', (req, res) => {
    res.send('Auth route working');
});

module.exports = router;