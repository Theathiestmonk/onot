import { supabase } from '../config/supabase.js';

export const getAllAttractions = async (req, res) => {
  try {
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
      `);
    
    if (cityId) query = query.eq('city_id', cityId);
    if (category) query = query.eq('category', category);
    if (featured === 'true') query = query.eq('featured', true);
    if (minPrice) query = query.gte('price', Number(minPrice));
    if (maxPrice) query = query.lte('price', Number(maxPrice));
    if (minRating) query = query.gte('rating', Number(minRating));
    
    // Get total count for pagination
    const { count } = await supabase
      .from('attractions')
      .select('*', { count: 'exact', head: true });
    
    const skip = (page - 1) * limit;
    query = query.order('rating', { ascending: false })
      .order('created_at', { ascending: false })
      .range(skip, skip + Number(limit) - 1);
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    // Transform data to match expected format
    const attractions = (data || []).map(attraction => {
      const transformed = {
        _id: attraction.id,
        id: attraction.id,
        name: attraction.name,
        description: attraction.description,
        category: attraction.category,
        images: attraction.images,
        price: Number(attraction.price),
        rating: Number(attraction.rating),
        reviews_count: attraction.reviews_count ? Number(attraction.reviews_count) : 0,
        duration: attraction.duration,
        address: attraction.address,
        openingHours: attraction.opening_hours,
        featured: attraction.featured,
        cityId: attraction.cities ? {
          _id: attraction.cities.id,
          id: attraction.cities.id,
          name: attraction.cities.name,
          country: attraction.cities.country,
          image: attraction.cities.image
        } : null
      };
      return transformed;
    });
    
    res.json({
      attractions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttractionById = async (req, res) => {
  try {
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
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Attraction not found' });
    }
    
    // Transform data
    const attraction = {
      _id: data.id,
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      images: data.images,
      price: Number(data.price),
      rating: Number(data.rating),
      duration: data.duration,
      address: data.address,
      openingHours: data.opening_hours,
      featured: data.featured,
      cityId: data.cities ? {
        _id: data.cities.id,
        id: data.cities.id,
        name: data.cities.name,
        country: data.cities.country,
        image: data.cities.image
      } : null
    };
    
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAttraction = async (req, res) => {
  try {
    const { cityId, openingHours, ...attractionData } = req.body;
    const insertData = {
      ...attractionData,
      city_id: cityId,
      opening_hours: openingHours || attractionData.openingHours || '9:00 AM - 6:00 PM'
    };
    
    const { data, error } = await supabase
      .from('attractions')
      .insert([insertData])
      .select(`
        *,
        cities (
          id,
          name,
          country
        )
      `)
      .single();

    if (error) throw error;
    
    const attraction = {
      _id: data.id,
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      images: data.images,
      price: Number(data.price),
      rating: Number(data.rating),
      duration: data.duration,
      address: data.address,
      openingHours: data.opening_hours,
      featured: data.featured,
      cityId: data.cities ? {
        _id: data.cities.id,
        id: data.cities.id,
        name: data.cities.name,
        country: data.cities.country
      } : null
    };
    
    res.status(201).json(attraction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
