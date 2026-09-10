const Room = require('../models/Room');

// GET /api/hotels/:hotelId/rooms
const getRoomsByHotel = async (req, res, next) => {
  try {
    const rooms = await Room.find({ hotelId: req.params.hotelId }).sort({
      pricePerNight: 1,
    });
    res.json({ success: true, rooms });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRoomsByHotel };
