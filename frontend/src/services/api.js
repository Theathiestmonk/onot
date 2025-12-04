import axios from 'axios';

// Use relative URL for Vercel deployment (works in both dev and prod)
// For local development with separate backend, set VITE_API_URL=http://localhost:5001/api in .env
const API_URL = import.meta.env.VITE_API_URL || '/api';

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

