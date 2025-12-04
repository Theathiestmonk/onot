import mongoose from 'mongoose';

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Museum', 'Park', 'Monument', 'Beach', 'Restaurant', 'Shopping', 'Entertainment', 'Adventure', 'Cultural', 'Other']
  },
  images: {
    type: [String],
    required: true,
    default: []
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  duration: {
    type: String,
    default: '2-3 hours'
  },
  address: {
    type: String,
    required: true
  },
  openingHours: {
    type: String,
    default: '9:00 AM - 6:00 PM'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Attraction = mongoose.model('Attraction', attractionSchema);

export default Attraction;

