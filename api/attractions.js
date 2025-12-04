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
    if (req.method === 'GET') {
      const supabase = getSupabaseClient();
      const { cityId, category, minPrice, maxPrice, minRating, featured, page = 1, limit = 12 } = req.query;
      
      let query = supabase
        .from('attractions')
        .select(`
          *,
          cities (
            id,
            name,
            country,
            image
          )
        `, { count: 'exact' });

      if (cityId) query = query.eq('city_id', cityId);
      if (category) query = query.eq('category', category);
      if (minPrice) query = query.gte('price', minPrice);
      if (maxPrice) query = query.lte('price', maxPrice);
      if (minRating) query = query.gte('rating', minRating);
      if (featured === 'true') query = query.eq('featured', true);

      const offset = (page - 1) * limit;
      query = query.range(offset, offset + Number(limit) - 1)
        .order('rating', { ascending: false })
        .order('created_at', { ascending: false });

      const { data, error, count } = await query;

      if (error) throw error;

      // Transform data to match expected format
      const attractions = (data || []).map(attraction => {
        // Ensure images is always an array
        let images = attraction.images || [];
        if (typeof images === 'string') {
          try {
            images = JSON.parse(images);
          } catch (e) {
            images = [];
          }
        }
        if (!Array.isArray(images)) {
          images = [];
        }

        return {
          ...attraction,
          _id: attraction.id,
          images: images,
          cityId: attraction.cities ? {
            _id: attraction.cities.id,
            name: attraction.cities.name,
            country: attraction.cities.country,
            image: attraction.cities.image
          } : null,
          city_id: undefined,
          cities: undefined,
          reviews_count: attraction.reviews_count ? Number(attraction.reviews_count) : 0
        };
      });

      res.status(200).json({
        attractions,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

