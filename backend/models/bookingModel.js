import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  destinationId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  checkInDate: {
    type: String,
    required: true
  },
  checkOutDate: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  specialRequests: {
    type: String
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    default: 'pending'
  },
  confirmationNumber: {
    type: String
  }
}, {
  timestamps: true
});

// Generate confirmation number before saving
bookingSchema.pre('save', function(next) {
  if (!this.confirmationNumber) {
    const prefix = 'BK';
    const timestamp = Date.now().toString().slice(-6);
    const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    this.confirmationNumber = `${prefix}${timestamp}${suffix}`;
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;