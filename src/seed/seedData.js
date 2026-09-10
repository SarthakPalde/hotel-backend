require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_booking';

const hotels = [
  {
    name: 'The Manhattan Grand',
    city: 'New York',
    address: '350 Fifth Avenue, New York, NY 10118',
    description:
      'Located in the heart of Midtown Manhattan, The Manhattan Grand offers breathtaking views of the city skyline. Steps away from world-class dining, shopping, and entertainment, this hotel is the ideal base for exploring New York City.',
    images: [
      'https://picsum.photos/seed/nyhotel1/800/500',
      'https://picsum.photos/seed/nyhotel2/800/500',
      'https://picsum.photos/seed/nyhotel3/800/500',
    ],
    rating: 4.7,
    reviewCount: 1284,
    amenities: ['Free WiFi', 'Rooftop Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Room Service', 'Concierge'],
    priceFrom: 249,
    category: 'luxury',
  },
  {
    name: 'Tribeca Boutique Hotel',
    city: 'New York',
    address: '45 Worth Street, New York, NY 10013',
    description:
      'A cozy boutique hotel nestled in the vibrant Tribeca neighborhood. Known for its artistic interiors, personalized service, and proximity to SoHo galleries and fine dining.',
    images: [
      'https://picsum.photos/seed/tribeca1/800/500',
      'https://picsum.photos/seed/tribeca2/800/500',
    ],
    rating: 4.3,
    reviewCount: 567,
    amenities: ['Free WiFi', 'Breakfast Included', 'Gym', 'Bar', 'Concierge', 'Pet Friendly'],
    priceFrom: 149,
    category: 'standard',
  },
  {
    name: 'Hotel Le Marais',
    city: 'Paris',
    address: '10 Rue de Bretagne, 75003 Paris, France',
    description:
      'Situated in the historic Marais district, Hotel Le Marais blends classic Haussmann architecture with modern comfort. Walk to the Louvre, Notre-Dame, and the Eiffel Tower from this prime Parisian location.',
    images: [
      'https://picsum.photos/seed/paris1/800/500',
      'https://picsum.photos/seed/paris2/800/500',
      'https://picsum.photos/seed/paris3/800/500',
    ],
    rating: 4.5,
    reviewCount: 892,
    amenities: ['Free WiFi', 'Breakfast Included', 'Laundry', 'Concierge', 'Air Conditioning', 'Bar'],
    priceFrom: 189,
    category: 'standard',
  },
  {
    name: 'Palais Royal Luxury Suites',
    city: 'Paris',
    address: '2 Place du Palais Royal, 75001 Paris, France',
    description:
      'An opulent retreat facing the historic Palais Royal gardens. Each suite is individually decorated with antique furniture and original artworks, offering an unparalleled Parisian luxury experience.',
    images: [
      'https://picsum.photos/seed/palais1/800/500',
      'https://picsum.photos/seed/palais2/800/500',
    ],
    rating: 4.9,
    reviewCount: 433,
    amenities: ['Free WiFi', 'Butler Service', 'Spa', 'Restaurant', 'Bar', 'Airport Transfer', 'Gym', 'Valet Parking'],
    priceFrom: 420,
    category: 'luxury',
  },
  {
    name: 'Burj View Hotel',
    city: 'Dubai',
    address: 'Downtown Dubai, Sheikh Mohammed Bin Rashid Blvd, Dubai, UAE',
    description:
      'Wake up to iconic views of the Burj Khalifa from every room. Located in the heart of Downtown Dubai, this hotel offers world-class facilities, a rooftop infinity pool, and direct access to Dubai Mall.',
    images: [
      'https://picsum.photos/seed/dubai1/800/500',
      'https://picsum.photos/seed/dubai2/800/500',
      'https://picsum.photos/seed/dubai3/800/500',
    ],
    rating: 4.8,
    reviewCount: 2103,
    amenities: ['Free WiFi', 'Infinity Pool', 'Spa', 'Gym', 'Multiple Restaurants', 'Valet', 'Kids Club', 'Beach Access'],
    priceFrom: 320,
    category: 'luxury',
  },
  {
    name: 'Marina Bay Suites',
    city: 'Dubai',
    address: 'Dubai Marina, Marina Walk, Dubai, UAE',
    description:
      'A sleek modern hotel along the Dubai Marina waterfront. Perfect for both business and leisure travelers, with stunning marina views, contemporary rooms, and a lively promenade at your doorstep.',
    images: [
      'https://picsum.photos/seed/marina1/800/500',
      'https://picsum.photos/seed/marina2/800/500',
    ],
    rating: 4.4,
    reviewCount: 987,
    amenities: ['Free WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar', 'Parking', 'Business Center'],
    priceFrom: 195,
    category: 'standard',
  },
  {
    name: 'The Kensington',
    city: 'London',
    address: '109-113 Queen\'s Gate, Kensington, London SW7 5LP',
    description:
      'A distinguished Victorian townhouse hotel in the prestigious Royal Borough of Kensington. Moments from Hyde Park, the Victoria and Albert Museum, and Harrods, with quintessentially British hospitality.',
    images: [
      'https://picsum.photos/seed/london1/800/500',
      'https://picsum.photos/seed/london2/800/500',
      'https://picsum.photos/seed/london3/800/500',
    ],
    rating: 4.6,
    reviewCount: 1105,
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Room Service', 'Concierge', 'Gym', 'Afternoon Tea'],
    priceFrom: 275,
    category: 'luxury',
  },
  {
    name: 'Shoreditch Budget Inn',
    city: 'London',
    address: '12 Shoreditch High Street, London E1 6PG',
    description:
      'Affordable and stylish accommodation in London\'s trendiest neighborhood. Clean, comfortable rooms with easy access to street art, rooftop bars, and the city\'s best creative scene.',
    images: [
      'https://picsum.photos/seed/shoreditch1/800/500',
      'https://picsum.photos/seed/shoreditch2/800/500',
    ],
    rating: 3.8,
    reviewCount: 648,
    amenities: ['Free WiFi', 'Shared Kitchen', 'Lounge', '24/7 Reception', 'Luggage Storage'],
    priceFrom: 79,
    category: 'budget',
  },
  {
    name: 'Shinjuku Park Hotel',
    city: 'Tokyo',
    address: '3-7-1 Nishi-Shinjuku, Shinjuku City, Tokyo 160-0023, Japan',
    description:
      'Ideally located facing Shinjuku Gyoen National Garden, this contemporary hotel offers serene city views. A short walk from Shinjuku Station, with impeccable Japanese hospitality throughout.',
    images: [
      'https://picsum.photos/seed/tokyo1/800/500',
      'https://picsum.photos/seed/tokyo2/800/500',
      'https://picsum.photos/seed/tokyo3/800/500',
    ],
    rating: 4.4,
    reviewCount: 773,
    amenities: ['Free WiFi', 'Restaurant', 'Laundry', 'Concierge', 'Air Conditioning', 'Safe Deposit'],
    priceFrom: 160,
    category: 'standard',
  },
  {
    name: 'Asakusa Ryokan Modern',
    city: 'Tokyo',
    address: '1-2-5 Asakusa, Taito City, Tokyo 111-0032, Japan',
    description:
      'Experience authentic Japanese culture in this beautifully modernized ryokan near Senso-ji Temple. Traditional tatami rooms blend with contemporary amenities for an unforgettable Tokyo stay.',
    images: [
      'https://picsum.photos/seed/asakusa1/800/500',
      'https://picsum.photos/seed/asakusa2/800/500',
    ],
    rating: 4.7,
    reviewCount: 342,
    amenities: ['Free WiFi', 'Traditional Breakfast', 'Onsen', 'Yukata', 'Tea Ceremony', 'Garden View'],
    priceFrom: 220,
    category: 'luxury',
  },
  {
    name: 'Mumbai Harbour View',
    city: 'Mumbai',
    address: 'Marine Drive, Nariman Point, Mumbai 400021, India',
    description:
      'Perched along the iconic Queen\'s Necklace at Marine Drive, this elegant hotel offers spectacular views of the Arabian Sea. Experience the best of Mumbai from this premier South Mumbai location.',
    images: [
      'https://picsum.photos/seed/mumbai1/800/500',
      'https://picsum.photos/seed/mumbai2/800/500',
      'https://picsum.photos/seed/mumbai3/800/500',
    ],
    rating: 4.5,
    reviewCount: 914,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Multiple Restaurants', 'Bar', 'Gym', 'Business Center', 'Valet'],
    priceFrom: 120,
    category: 'luxury',
  },
  {
    name: 'Bandra Budget Stay',
    city: 'Mumbai',
    address: '14th Road, Khar West, Mumbai 400052, India',
    description:
      'A clean, affordable hotel in the vibrant Bandra neighborhood. Close to cafes, boutiques, and the sea link, this is the perfect base for budget-conscious travelers exploring Mumbai.',
    images: [
      'https://picsum.photos/seed/bandra1/800/500',
      'https://picsum.photos/seed/bandra2/800/500',
    ],
    rating: 3.6,
    reviewCount: 289,
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', '24/7 Reception', 'Laundry'],
    priceFrom: 45,
    category: 'budget',
  },
];

const generateRooms = (hotelId, hotelCategory, priceFrom) => {
  const roomTypes = {
    budget: [
      {
        type: 'Standard Room',
        description: 'A comfortable single room with all essential amenities for a pleasant stay.',
        pricePerNight: priceFrom,
        capacity: 1,
        amenities: ['Free WiFi', 'TV', 'AC', 'Private Bathroom'],
        size: 180,
      },
      {
        type: 'Double Room',
        description: 'Spacious room with a double bed, perfect for couples or solo travelers wanting extra space.',
        pricePerNight: Math.round(priceFrom * 1.4),
        capacity: 2,
        amenities: ['Free WiFi', 'TV', 'AC', 'Private Bathroom', 'Work Desk'],
        size: 220,
      },
    ],
    standard: [
      {
        type: 'Deluxe Room',
        description: 'A well-appointed deluxe room featuring modern furnishings, a comfortable king bed, and city views.',
        pricePerNight: priceFrom,
        capacity: 2,
        amenities: ['Free WiFi', 'Smart TV', 'AC', 'Mini Bar', 'Safe', 'Work Desk', 'Ensuite Bathroom'],
        size: 280,
      },
      {
        type: 'Superior Room',
        description: 'Upgraded room with premium linens, a seating area, and enhanced bathroom amenities including a rain shower.',
        pricePerNight: Math.round(priceFrom * 1.35),
        capacity: 2,
        amenities: ['Free WiFi', 'Smart TV', 'AC', 'Mini Bar', 'Safe', 'Rain Shower', 'Bathrobe'],
        size: 320,
      },
      {
        type: 'Family Suite',
        description: 'A spacious suite with two bedrooms and a shared living area, ideal for families.',
        pricePerNight: Math.round(priceFrom * 1.9),
        capacity: 4,
        amenities: ['Free WiFi', 'Smart TV', 'AC', 'Kitchenette', 'Safe', 'Sofa Bed', 'Dining Area'],
        size: 480,
      },
    ],
    luxury: [
      {
        type: 'Deluxe King Room',
        description: 'A lavish king room with premium furnishings, floor-to-ceiling windows, and exclusive city views.',
        pricePerNight: priceFrom,
        capacity: 2,
        amenities: ['Free WiFi', 'Smart TV', 'AC', 'Mini Bar', 'Safe', 'Marble Bathroom', 'Bathrobe', 'Premium Toiletries'],
        size: 380,
      },
      {
        type: 'Junior Suite',
        description: 'A sophisticated suite with a separate living area, dining table, and panoramic views of the city.',
        pricePerNight: Math.round(priceFrom * 1.5),
        capacity: 2,
        amenities: ['Free WiFi', 'Smart TV', 'AC', 'Full Bar', 'Espresso Machine', 'Jacuzzi', 'Butler Service'],
        size: 580,
      },
      {
        type: 'Presidential Suite',
        description: 'The pinnacle of luxury — a sprawling multi-room suite with a private terrace, personal butler, and exclusive amenities.',
        pricePerNight: Math.round(priceFrom * 2.8),
        capacity: 4,
        amenities: ['Free WiFi', 'Multiple TVs', 'Full Kitchen', 'Private Terrace', 'Butler Service', 'Jacuzzi', 'Dining Room', 'Grand Piano'],
        size: 1200,
      },
    ],
  };

  return (roomTypes[hotelCategory] || roomTypes.standard).map((room, idx) => ({
    ...room,
    hotelId,
    available: idx < 2 ? true : Math.random() > 0.2,
    images: [
      `https://picsum.photos/seed/room${hotelId}${idx}/600/400`,
      `https://picsum.photos/seed/room${hotelId}${idx}b/600/400`,
    ],
  }));
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    console.log('Cleared existing data');

    // Insert hotels
    const createdHotels = await Hotel.insertMany(hotels);
    console.log(`Inserted ${createdHotels.length} hotels`);

    // Insert rooms for each hotel
    let totalRooms = 0;
    for (const hotel of createdHotels) {
      const rooms = generateRooms(hotel._id, hotel.category, hotel.priceFrom);
      await Room.insertMany(rooms);
      totalRooms += rooms.length;
    }

    console.log(`Inserted ${totalRooms} rooms across all hotels`);
    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
