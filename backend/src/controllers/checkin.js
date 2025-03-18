const Guest = require('../models/Guest');

// @desc    Process guest check-in
// @route   POST /api/checkin
// @access  Public
exports.checkIn = async (req, res) => {
  try {
    const { name, email, phone, documents, reservationId, estimatedArrival } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !reservationId) {
      return res.status(400).json({
        error: true,
        code: 'VALIDATION_ERROR',
        message: 'Please provide all required fields'
      });
    }

    // Check if guest already exists
    let guest = await Guest.findOne({ email, reservationId });

    if (guest) {
      // Update existing guest
      guest.name = name;
      guest.phone = phone;
      guest.documents = documents || guest.documents;
      guest.estimatedArrival = estimatedArrival || guest.estimatedArrival;
      guest.status = 'checked-in';
      guest.checkInTime = Date.now();

      await guest.save();
    } else {
      // Create new guest
      guest = await Guest.create({
        name,
        email,
        phone,
        documents: documents || [],
        reservationId,
        estimatedArrival,
        status: 'checked-in',
        checkInTime: Date.now()
      });
    }

    res.status(200).json({
      success: true,
      guestId: guest._id,
      message: 'Check-in successful'
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