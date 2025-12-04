import axios from 'axios';

// Use relative URL in production (Vercel), absolute URL in development
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5001/api');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cities API
export const citiesAPI = {
  getAll: () => api.get('/cities'),
  getById: (id) => api.get(`/cities/${id}`),
};

// Attractions API
export const attractionsAPI = {
  getAll: (params) => api.get('/attractions', { params }),
  getById: (id) => api.get(`/attractions/${id}`),
};

// Bookings API
export const bookingsAPI = {
  create: (data) => api.post('/bookings', data),
  getById: (id) => api.get(`/bookings/${id}`),
  getAll: (params) => api.get('/bookings', { params }),
};

export default api;

