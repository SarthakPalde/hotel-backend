const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    hotelName: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    guestName: {
      type: String,
      required: true,
      trim: true,
    },
    guestEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    guestPhone: {
      type: String,
      required: true,
      trim: true,
    },
    checkIn: {
      type: String, // stored as YYYY-MM-DD string
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true }
);

bookingSchema.index({ hotelId: 1 });
bookingSchema.index({ guestEmail: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
