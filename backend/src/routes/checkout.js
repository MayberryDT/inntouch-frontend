const express = require('express');
const { checkOut } = require('../controllers/checkout');

const router = express.Router();

router.post('/', checkOut);

module.exports = router; 