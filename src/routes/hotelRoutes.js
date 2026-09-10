const express = require('express');
const router = express.Router();
const { getAllHotels, getHotelById } = require('../controllers/hotelController');
const { getRoomsByHotel } = require('../controllers/roomController');

router.get('/', getAllHotels);
router.get('/:id', getHotelById);
router.get('/:hotelId/rooms', getRoomsByHotel);

module.exports = router;
