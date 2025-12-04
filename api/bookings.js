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
    if (req.method === 'POST') {
      const supabase = getSupabaseClient();
      const { attractionId, tickets, date, time, guestInfo } = req.body;
      
      // Validate attraction exists and get price
      const { data: attraction, error: attractionError } = await supabase
        .from('attractions')
        .select('id, name, images, price, city_id')
        .eq('id', attractionId)
        .single();
      
      if (attractionError || !attraction) {
        return res.status(404).json({ message: 'Attraction not found' });
      }
      
      // Calculate total price
      const totalPrice = attraction.price * tickets;
      
      // Create booking
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          attraction_id: attractionId,
          tickets,
          date: new Date(date).toISOString(),
          time,
          total_price: totalPrice,
          guest_info: guestInfo,
          status: 'confirmed'
        }])
        .select(`
          *,
          attractions (
            id,
            name,
            images,
            price,
            city_id
          )
        `)
        .single();
      
      if (error) throw error;
      
      // Transform data
      const booking = {
        _id: data.id,
        id: data.id,
        tickets: data.tickets,
        date: data.date,
        time: data.time,
        totalPrice: Number(data.total_price),
        status: data.status,
        guestInfo: data.guest_info,
        createdAt: data.created_at,
        attractionId: data.attractions ? {
          _id: data.attractions.id,
          id: data.attractions.id,
          name: data.attractions.name,
          images: data.attractions.images,
          price: Number(data.attractions.price),
          cityId: data.attractions.city_id
        } : null
      };
      
      res.status(201).json(booking);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

