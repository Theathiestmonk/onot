import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel project settings.');
  }

  return createClient(supabaseUrl, supabaseKey);
}

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
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('attractions')
        .select(`
          id,
          name,
          description,
          category,
          images,
          price,
          rating,
          reviews_count,
          duration,
          address,
          opening_hours,
          featured,
          city_id,
          created_at,
          updated_at,
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

      // Debug: Log raw data from Supabase
      console.log('Raw data from Supabase:', JSON.stringify(data, null, 2));
      console.log('Raw reviews_count from DB:', data.reviews_count, 'Type:', typeof data.reviews_count);
      console.log('Raw images from DB:', data.images, 'Type:', typeof data.images, 'Is Array:', Array.isArray(data.images));

      // Ensure images is always an array
      let images = data.images || [];
      
      if (typeof images === 'string') {
        try {
          images = JSON.parse(images);
        } catch (e) {
          console.log('Failed to parse images string:', e);
          images = [];
        }
      }
      if (!Array.isArray(images)) {
        console.log('Images is not an array, converting to array');
        images = [];
      }
      
      console.log('Processed images:', images);

      // Transform data to match expected format
      const attraction = {
        ...data,
        _id: data.id,
        id: data.id,
        name: data.name,
        description: data.description,
        category: data.category,
        images: images,
        price: Number(data.price || 0),
        rating: Number(data.rating || 0),
        reviews_count: data.reviews_count !== null && data.reviews_count !== undefined 
          ? Number(data.reviews_count) 
          : 0,
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
      
      console.log('Transformed attraction reviews_count:', attraction.reviews_count, 'Type:', typeof attraction.reviews_count);

      res.status(200).json(attraction);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

