const Guest = require('../models/Guest');

// @desc    Get all guests
// @route   GET /api/guests
// @access  Private
exports.getGuests = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    // Build query
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const guests = await Guest.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await Guest.countDocuments(query);
    
    res.status(200).json({
      guests: guests.map(guest => ({
        id: guest._id,
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        status: guest.status,
        checkInTime: guest.checkInTime,
        checkOutTime: guest.checkOutTime,
        reservationId: guest.reservationId
      })),
      total,
      page: parseInt(page),
      limit: parseInt(limit)
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

// @desc    Get single guest
// @route   GET /api/guests/:id
// @access  Private
exports.getGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    
    if (!guest) {
      return res.status(404).json({
        error: true,
        code: 'NOT_FOUND',
        message: 'Guest not found'
      });
    }
    
    res.status(200).json({
      id: guest._id,
      name: guest.name,
      email: guest.email,
      phone: guest.phone,
      documents: guest.documents,
      reservationId: guest.reservationId,
      status: guest.status,
      checkInTime: guest.checkInTime,
      checkOutTime: guest.checkOutTime,
      estimatedArrival: guest.estimatedArrival,
      roomNumber: guest.roomNumber
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