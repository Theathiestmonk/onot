import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('attractions')
        .select(`
          *,
          cities (
            id,
            name,
            country,
            image
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!data) {
        return res.status(404).json({ message: 'Attraction not found' });
      }

      // Transform data to match expected format
      const attraction = {
        ...data,
        _id: data.id,
        id: data.id,
        name: data.name,
        description: data.description,
        category: data.category,
        images: data.images,
        price: Number(data.price),
        rating: Number(data.rating),
        reviews_count: data.reviews_count ? Number(data.reviews_count) : 0,
        duration: data.duration,
        address: data.address,
        openingHours: data.opening_hours,
        opening_hours: data.opening_hours,
        featured: data.featured,
        cityId: data.cities ? {
          _id: data.cities.id,
          id: data.cities.id,
          name: data.cities.name,
          country: data.cities.country,
          image: data.cities.image
        } : null
      };

      res.status(200).json(attraction);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

