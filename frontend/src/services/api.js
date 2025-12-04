import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

