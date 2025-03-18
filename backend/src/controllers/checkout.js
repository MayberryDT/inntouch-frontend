const Guest = require('../models/Guest');

// @desc    Process guest check-out
// @route   POST /api/checkout
// @access  Public
exports.checkOut = async (req, res) => {
  try {
    const { guestId, checkOutTime, feedback } = req.body;

    // Validate required fields
    if (!guestId) {
      return res.status(400).json({
        error: true,
        code: 'VALIDATION_ERROR',
        message: 'Please provide a guest ID'
      });
    }

    // Find guest
    const guest = await Guest.findById(guestId);

    if (!guest) {
      return res.status(404).json({
        error: true,
        code: 'NOT_FOUND',
        message: 'Guest not found'
      });
    }

    // Update guest status
    guest.status = 'checked-out';
    guest.checkOutTime = checkOutTime || Date.now();
    
    // Store feedback if provided
    if (feedback) {
      guest.feedback = feedback;
    }

    await guest.save();

    res.status(200).json({
      success: true,
      message: 'Check-out successful'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      code: 'INTERNAL_ERROR',
      message: 'Server error'
    });
  }
}; 