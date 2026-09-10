const Hotel = require('../models/Hotel');

// GET /api/hotels
const getAllHotels = async (req, res, next) => {
  try {
    const { city, category, rating, maxPrice, limit = 50 } = req.query;

    const query = {};

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    if (maxPrice) {
      query.priceFrom = { $lte: parseFloat(maxPrice) };
    }

    const hotels = await Hotel.find(query)
      .sort({ rating: -1 })
      .limit(parseInt(limit));

    const total = await Hotel.countDocuments(query);

    res.json({ success: true, total, hotels });
  } catch (err) {
    next(err);
  }
};

// GET /api/hotels/:id
const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    res.json({ success: true, hotel });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllHotels, getHotelById };
