import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById
} from '../controllers/bookingController.js';
import Booking from '../models/bookingModel.js';
const router = express.Router();//Creates a new instance of Express Router

// Routes
//When a POST request is made to /api/bookings, the createBooking function runs
router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
//Getting Bookings for a Specific User
router.get('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log('Fetching bookings for userId:', userId);
  
      const bookings = await Booking.find({ userId: userId });
      console.log('Found bookings:', bookings);
  
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      res.status(500).json({ 
        message: 'Error fetching bookings',
        error: error.message 
      });
    }
  });

export default router;