const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  documents: {
    type: [String],
    default: []
  },
  reservationId: {
    type: String,
    required: [true, 'Please add a reservation ID']
  },
  checkInTime: {
    type: Date,
    default: null
  },
  checkOutTime: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'checked-in', 'checked-out'],
    default: 'pending'
  },
  estimatedArrival: {
    type: Date,
    default: null
  },
  roomNumber: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Guest', GuestSchema); 