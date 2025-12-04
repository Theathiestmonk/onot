import { useState } from 'react';
import { bookingsAPI } from '../services/api';

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingsAPI.create(bookingData);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create booking';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getBooking = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingsAPI.getById(id);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch booking';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, getBooking, loading, error };
};

