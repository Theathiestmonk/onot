import { useState, useEffect } from 'react';
import { attractionsAPI } from '../services/api';

export const useAttractions = (filters = {}) => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await attractionsAPI.getAll(filters);
        setAttractions(response.data.attractions || response.data);
        setPagination(response.data.pagination || null);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch attractions');
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, [JSON.stringify(filters)]);

  return { attractions, loading, error, pagination };
};

export const useAttraction = (id) => {
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchAttraction = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await attractionsAPI.getById(id);
        setAttraction(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch attraction');
      } finally {
        setLoading(false);
      }
    };

    fetchAttraction();
  }, [id]);

  return { attraction, loading, error };
};

