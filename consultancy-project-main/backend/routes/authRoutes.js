const express = require('express');
const { signup, login, googleLogin, forgotPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/forgot-password', forgotPassword);

module.exports = router;
