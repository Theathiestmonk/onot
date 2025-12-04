import { supabase } from '../config/supabase.js';

export const createBooking = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
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
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
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
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const { userId } = req.query;
    let query = supabase
      .from('bookings')
      .select(`
        *,
        attractions (
          id,
          name,
          images,
          price
        )
      `)
      .order('created_at', { ascending: false });
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    // Transform data
    const bookings = (data || []).map(booking => ({
      _id: booking.id,
      id: booking.id,
      tickets: booking.tickets,
      date: booking.date,
      time: booking.time,
      totalPrice: Number(booking.total_price),
      status: booking.status,
      guestInfo: booking.guest_info,
      createdAt: booking.created_at,
      attractionId: booking.attractions ? {
        _id: booking.attractions.id,
        id: booking.attractions.id,
        name: booking.attractions.name,
        images: booking.attractions.images,
        price: Number(booking.attractions.price)
      } : null
    }));
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
