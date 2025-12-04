import express from 'express';
import { createBooking, getBookingById, getAllBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:id', getBookingById);
router.get('/', getAllBookings);

export default router;

