import { supabase } from '../config/supabase.js';

const citiesData = [
  {
    name: 'Ahmedabad',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    description: 'The largest city in Gujarat, known for its rich history, vibrant culture, and architectural marvels.'
  },
  {
    name: 'Jamnagar',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
    description: 'A beautiful coastal city in Gujarat, famous for its palaces, temples, and marine national park.'
  },
  {
    name: 'Rajkot',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&q=80',
    description: 'A vibrant city in Gujarat, known for its educational institutions and cultural heritage.'
  },
  {
    name: 'Vadodara',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80',
    description: 'The cultural capital of Gujarat, home to magnificent palaces, museums, and gardens.'
  },
  {
    name: 'Surat',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80',
    description: 'A major commercial hub in Gujarat, famous for diamond cutting, textiles, and delicious street food.'
  },
  {
    name: 'Junagadh',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    description: 'A historic city in Gujarat, known for its ancient monuments, temples, and the famous Gir National Park.'
  }
];

const attractionsData = [
  // Ahmedabad attractions
  {
    name: 'Sabarmati Ashram',
    description: 'Historic ashram where Mahatma Gandhi lived. A peaceful place showcasing Gandhi\'s life and philosophy.',
    category: 'Heritage',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80'
    ],
    price: 0,
    rating: 4.7,
    reviews_count: 12500,
    duration: '1-2 hours',
    address: 'Sabarmati, Ahmedabad, Gujarat, India',
    opening_hours: '8:30 AM - 6:30 PM',
    featured: true
  },
  {
    name: 'Adalaj Stepwell',
    description: 'Beautiful 15th-century stepwell with intricate carvings. A masterpiece of Indo-Islamic architecture.',
    category: 'Historical Places',
    images: [
      'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&q=80'
    ],
    price: 0,
    rating: 4.6,
    reviews_count: 8900,
    duration: '1 hour',
    address: 'Adalaj, Ahmedabad, Gujarat, India',
    opening_hours: '8:00 AM - 6:00 PM',
    featured: true
  },
  {
    name: 'Kankaria Lake',
    description: 'A beautiful circular lake with entertainment activities, zoo, and gardens. Perfect for family outings.',
    category: 'Flower Parks',
    images: [
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80'
    ],
    price: 20,
    rating: 4.4,
    reviews_count: 5600,
    duration: '2-3 hours',
    address: 'Kankaria, Ahmedabad, Gujarat, India',
    opening_hours: '9:00 AM - 10:00 PM',
    featured: false
  },
  // Jamnagar attractions
  {
    name: 'Lakhota Palace',
    description: 'Historic palace complex on an island in the middle of Ranmal Lake. A stunning example of Rajput architecture.',
    category: 'Historical Places',
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
    ],
    price: 50,
    rating: 4.5,
    reviews_count: 3200,
    duration: '2 hours',
    address: 'Lakhota Lake, Jamnagar, Gujarat, India',
    opening_hours: '9:00 AM - 6:00 PM',
    featured: true
  },
  {
    name: 'Marine National Park',
    description: 'First marine national park in India. Home to diverse marine life, coral reefs, and beautiful beaches.',
    category: 'Zoological Parks',
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80'
    ],
    price: 100,
    rating: 4.8,
    reviews_count: 15200,
    duration: '3-4 hours',
    address: 'Gulf of Kutch, Jamnagar, Gujarat, India',
    opening_hours: '6:00 AM - 6:00 PM',
    featured: true
  },
  {
    name: 'Bala Hanuman Temple',
    description: 'Famous temple known for continuous chanting of "Ram Dhun" since 1964. A spiritual experience.',
    category: 'Religious Places',
    images: [
      'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&q=80'
    ],
    price: 0,
    rating: 4.5,
    reviews_count: 2800,
    duration: '30 minutes',
    address: 'Jamnagar, Gujarat, India',
    opening_hours: '5:00 AM - 10:00 PM',
    featured: false
  },
  // Rajkot attractions
  {
    name: 'Watson Museum',
    description: 'Historical museum showcasing artifacts, paintings, and exhibits from the colonial era and local history.',
    category: 'Museum',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
    ],
    price: 10,
    rating: 4.3,
    reviews_count: 1900,
    duration: '1-2 hours',
    address: 'Rajkot, Gujarat, India',
    opening_hours: '10:00 AM - 5:00 PM',
    featured: false
  },
  {
    name: 'Race Course Ground',
    description: 'Large public park and recreational area. Perfect for morning walks, jogging, and family picnics.',
    category: 'Park',
    images: [
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80'
    ],
    price: 0,
    rating: 4.2,
    reviews_count: 1200,
    duration: '1-2 hours',
    address: 'Rajkot, Gujarat, India',
    opening_hours: '5:00 AM - 9:00 PM',
    featured: false
  },
  {
    name: 'Kaba Gandhi No Delo',
    description: 'Birthplace of Mahatma Gandhi. Now a museum displaying personal belongings and photographs.',
    category: 'Heritage',
    images: [
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80'
    ],
    price: 0,
    rating: 4.6,
    reviews_count: 4500,
    duration: '1 hour',
    address: 'Rajkot, Gujarat, India',
    opening_hours: '9:00 AM - 6:00 PM',
    featured: true
  },
  // Vadodara attractions
  {
    name: 'Laxmi Vilas Palace',
    description: 'Magnificent palace built by Maharaja Sayajirao Gaekwad III. One of the largest private residences in the world.',
    category: 'Historical Places',
    images: [
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
    ],
    price: 200,
    rating: 4.7,
    reviews_count: 9800,
    duration: '2-3 hours',
    address: 'Vadodara, Gujarat, India',
    opening_hours: '9:30 AM - 5:00 PM',
    featured: true
  },
  {
    name: 'Sayaji Baug',
    description: 'Large public garden with zoo, planetarium, and museum. A perfect family destination.',
    category: 'Flower Parks',
    images: [
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80'
    ],
    price: 30,
    rating: 4.5,
    reviews_count: 6700,
    duration: '3-4 hours',
    address: 'Vadodara, Gujarat, India',
    opening_hours: '8:00 AM - 6:00 PM',
    featured: true
  },
  {
    name: 'EME Temple',
    description: 'Unique temple made of aluminum. Also known as Dakshinamurti Temple, dedicated to Lord Shiva.',
    category: 'Religious Places',
    images: [
      'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&q=80'
    ],
    price: 0,
    rating: 4.4,
    reviews_count: 3400,
    duration: '30 minutes',
    address: 'Vadodara, Gujarat, India',
    opening_hours: '6:00 AM - 8:00 PM',
    featured: false
  },
  // Surat attractions
  {
    name: 'Surat Castle',
    description: 'Historic 16th-century castle built by Khudawand Khan. A symbol of Surat\'s rich history.',
    category: 'Historical Places',
    images: [
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80'
    ],
    price: 0,
    rating: 4.3,
    reviews_count: 2100,
    duration: '1 hour',
    address: 'Surat, Gujarat, India',
    opening_hours: '9:00 AM - 6:00 PM',
    featured: false
  },
  {
    name: 'Dumas Beach',
    description: 'Popular beach destination known for its black sand and beautiful sunset views. Great for evening walks.',
    category: 'Beach',
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80'
    ],
    price: 0,
    rating: 4.5,
    reviews_count: 7800,
    duration: '2-3 hours',
    address: 'Dumas, Surat, Gujarat, India',
    opening_hours: '24 hours',
    featured: true
  },
  {
    name: 'Sardar Patel Museum',
    description: 'Museum showcasing artifacts, textiles, and exhibits related to Surat\'s history and culture.',
    category: 'Museum',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
    ],
    price: 10,
    rating: 4.2,
    reviews_count: 1500,
    duration: '1-2 hours',
    address: 'Surat, Gujarat, India',
    opening_hours: '10:00 AM - 5:00 PM',
    featured: false
  },
  // Junagadh attractions
  {
    name: 'Gir National Park',
    description: 'Famous wildlife sanctuary and the only natural habitat of the Asiatic Lions. A must-visit for nature lovers.',
    category: 'Zoological Parks',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80'
    ],
    price: 150,
    rating: 4.8,
    reviews_count: 18900,
    duration: '4-5 hours',
    address: 'Gir, Junagadh, Gujarat, India',
    opening_hours: '6:00 AM - 6:00 PM',
    featured: true
  },
  {
    name: 'Uparkot Fort',
    description: 'Ancient fort with a rich history dating back 2300 years. Features ancient caves, stepwells, and stunning views.',
    category: 'Historical Places',
    images: [
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80'
    ],
    price: 25,
    rating: 4.5,
    reviews_count: 4100,
    duration: '2-3 hours',
    address: 'Junagadh, Gujarat, India',
    opening_hours: '9:00 AM - 6:00 PM',
    featured: true
  },
  {
    name: 'Mahabat Maqbara',
    description: 'Stunning mausoleum with unique architecture combining Indo-Islamic and Gothic styles. A visual masterpiece.',
    category: 'Historical Places',
    images: [
      'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&q=80'
    ],
    price: 0,
    rating: 4.6,
    reviews_count: 5200,
    duration: '1 hour',
    address: 'Junagadh, Gujarat, India',
    opening_hours: '8:00 AM - 6:00 PM',
    featured: false
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Clear existing data
    const { error: deleteBookingsError } = await supabase.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const { error: deleteAttractionsError } = await supabase.from('attractions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const { error: deleteCitiesError } = await supabase.from('cities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (deleteBookingsError) console.log('Note:', deleteBookingsError.message);
    if (deleteAttractionsError) console.log('Note:', deleteAttractionsError.message);
    if (deleteCitiesError) console.log('Note:', deleteCitiesError.message);
    
    console.log('Cleared existing data');

    // Insert cities
    const { data: cities, error: citiesError } = await supabase
      .from('cities')
      .insert(citiesData)
      .select();

    if (citiesError) throw citiesError;
    console.log(`Inserted ${cities.length} cities`);

    // Map city names to IDs
    const cityMap = {};
    cities.forEach(city => {
      cityMap[city.name] = city.id;
    });

    // Add city_id to attractions
    const attractionsWithCityId = attractionsData.map(attraction => {
      let cityName = '';
      if (attraction.name === 'Sabarmati Ashram' || attraction.name === 'Adalaj Stepwell' || attraction.name === 'Kankaria Lake') {
        cityName = 'Ahmedabad';
      } else if (attraction.name === 'Lakhota Palace' || attraction.name === 'Marine National Park' || attraction.name === 'Bala Hanuman Temple') {
        cityName = 'Jamnagar';
      } else if (attraction.name === 'Watson Museum' || attraction.name === 'Race Course Ground' || attraction.name === 'Kaba Gandhi No Delo') {
        cityName = 'Rajkot';
      } else if (attraction.name === 'Laxmi Vilas Palace' || attraction.name === 'Sayaji Baug' || attraction.name === 'EME Temple') {
        cityName = 'Vadodara';
      } else if (attraction.name === 'Surat Castle' || attraction.name === 'Dumas Beach' || attraction.name === 'Sardar Patel Museum') {
        cityName = 'Surat';
      } else if (attraction.name === 'Gir National Park' || attraction.name === 'Uparkot Fort' || attraction.name === 'Mahabat Maqbara') {
        cityName = 'Junagadh';
      }
      
      return {
        ...attraction,
        city_id: cityMap[cityName]
      };
    });

    // Insert attractions
    const { data: attractions, error: attractionsError } = await supabase
      .from('attractions')
      .insert(attractionsWithCityId)
      .select();

    if (attractionsError) throw attractionsError;
    console.log(`Inserted ${attractions.length} attractions`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
