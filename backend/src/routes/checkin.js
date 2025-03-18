const express = require('express');
const { checkIn } = require('../controllers/checkin');

const router = express.Router();

router.post('/', checkIn);

module.exports = router; 