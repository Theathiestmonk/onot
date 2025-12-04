import { supabase } from '../config/supabase.js';

export const getAllCities = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCityById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCity = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cities')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
