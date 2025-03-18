const express = require('express');
const { getGuests, getGuest } = require('../controllers/guests');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getGuests);
router.get('/:id', protect, getGuest);

module.exports = router; 