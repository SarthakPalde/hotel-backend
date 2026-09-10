const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    priceFrom: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['budget', 'standard', 'luxury'],
      default: 'standard',
    },
  },
  { timestamps: true }
);

// Index for city search
hotelSchema.index({ city: 1 });
hotelSchema.index({ rating: -1 });
hotelSchema.index({ priceFrom: 1 });

module.exports = mongoose.model('Hotel', hotelSchema);
