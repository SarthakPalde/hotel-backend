const Booking = require('../models/Booking');

// POST /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const {
      roomId,
      hotelId,
      hotelName,
      roomType,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    } = req.body;

    // Basic validation
    if (
      !roomId ||
      !hotelId ||
      !guestName ||
      !guestEmail ||
      !guestPhone ||
      !checkIn ||
      !checkOut ||
      !totalPrice
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking fields.',
      });
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date.',
      });
    }

    const booking = await Booking.create({
      roomId,
      hotelId,
      hotelName,
      roomType,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests: guests || 1,
      totalPrice,
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookings/:id
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getBookingById };
