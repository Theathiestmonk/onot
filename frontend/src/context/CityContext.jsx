import { createContext, useContext, useState, useEffect } from 'react';
import { citiesAPI } from '../services/api';

const CityContext = createContext();

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await citiesAPI.getAll();
        setCities(response.data);
        // Set first city as default if none selected
        if (!selectedCity && response.data.length > 0) {
          setSelectedCity(response.data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const selectCity = (city) => {
    setSelectedCity(city);
    // Store in localStorage for persistence
    localStorage.setItem('selectedCity', JSON.stringify(city));
  };

  // Load selected city from localStorage on mount
  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      try {
        const city = JSON.parse(savedCity);
        setSelectedCity(city);
      } catch (err) {
        console.error('Error parsing saved city:', err);
      }
    }
  }, []);

  const value = {
    selectedCity,
    cities,
    loading,
    error,
    selectCity,
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};

