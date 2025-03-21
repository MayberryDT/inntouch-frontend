const express = require('express');
const { login, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validator');
const { loginValidation } = require('../validations/auth');

const router = express.Router();

router.post('/login', validate(loginValidation), login);
router.get('/me', protect, getMe);

module.exports = router; 