-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attractions table
CREATE TABLE IF NOT EXISTS attractions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('Museum', 'Zoological Parks', 'Historical Places', 'Heritage', 'Flower Parks', 'Religious Places', 'Park', 'Monument', 'Beach', 'Cultural', 'Shopping', 'Entertainment', 'Adventure', 'Other')),
  images TEXT[] DEFAULT '{}',
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  rating DECIMAL(3, 2) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews_count INTEGER DEFAULT 0 CHECK (reviews_count >= 0),
  duration VARCHAR(100) DEFAULT '2-3 hours',
  address TEXT NOT NULL,
  opening_hours VARCHAR(100) DEFAULT '9:00 AM - 6:00 PM',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  attraction_id UUID REFERENCES attractions(id) ON DELETE CASCADE,
  user_id VARCHAR(255) DEFAULT 'guest',
  tickets INTEGER NOT NULL CHECK (tickets >= 1),
  date DATE NOT NULL,
  time VARCHAR(10) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
  status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  guest_info JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_attractions_city_id ON attractions(city_id);
CREATE INDEX IF NOT EXISTS idx_attractions_category ON attractions(category);
CREATE INDEX IF NOT EXISTS idx_attractions_featured ON attractions(featured);
CREATE INDEX IF NOT EXISTS idx_bookings_attraction_id ON bookings(attraction_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);

-- Enable Row Level Security (optional, can be disabled for this app)
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (adjust based on your security needs)
CREATE POLICY "Allow all operations on cities" ON cities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on attractions" ON attractions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);

