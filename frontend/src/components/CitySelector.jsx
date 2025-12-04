import { useState } from 'react';
import { useCity } from '../context/CityContext';
import './CitySelector.css';

const CitySelector = () => {
  const { selectedCity, cities, selectCity, loading } = useCity();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (city) => {
    selectCity(city);
    setIsOpen(false);
  };

  if (loading) {
    return <div className="city-selector-loading">Loading cities...</div>;
  }

  return (
    <div className="city-selector">
      <button
        className="city-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select city"
      >
        <span className="city-selector-icon">📍</span>
        <span className="city-selector-text">
          {selectedCity ? `${selectedCity.name}, ${selectedCity.country}` : 'Select City'}
        </span>
        <span className="city-selector-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <>
          <div className="city-selector-overlay" onClick={() => setIsOpen(false)} />
          <div className="city-selector-dropdown">
            {cities.map((city) => (
              <button
                key={city._id}
                className={`city-selector-option ${
                  selectedCity?._id === city._id ? 'active' : ''
                }`}
                onClick={() => handleSelect(city)}
              >
                <span className="city-option-name">{city.name}</span>
                <span className="city-option-country">{city.country}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CitySelector;

