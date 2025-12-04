import { useCity } from '../context/CityContext';
import { useSearch } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { cities, loading, selectCity } = useCity();
  const { searchQuery } = useSearch();
  const navigate = useNavigate();

  // Filter cities based on search
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Popular cities (first 6 cities or featured ones)
  const popularCities = cities.slice(0, 6);

  // Handle city selection
  const handleCitySelect = (city) => {
    selectCity(city);
    navigate('/attractions');
  };

  if (loading) {
    return (
      <div className="home-mobile">
        <div className="loading">Loading cities...</div>
      </div>
    );
  }

  return (
    <div className="home-mobile">

      {/* Popular Cities Section */}
      <section className="popular-cities-section">
        <h2 className="section-heading">
          <span className="heading-text">POPULAR CITIES</span>
          <span className="heading-underline"></span>
        </h2>
        <div className="popular-cities-grid">
          {popularCities.map((city) => {
            const cityId = city.id || city._id;
            return (
              <div
                key={cityId}
                className="city-circle-item"
                onClick={() => handleCitySelect(city)}
              >
                <div className="city-circle-image">
                  <img src={city.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DaXR5PC90ZXh0Pjwvc3ZnPg=='} alt={city.name} />
                </div>
                <p className="city-circle-name">{city.name}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* All Cities Section */}
      <section className="all-cities-section">
        <h2 className="section-heading">
          <span className="heading-text">ALL CITIES</span>
          <span className="heading-underline"></span>
        </h2>
        <div className="all-cities-list">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const cityId = city.id || city._id;
              return (
                <div
                  key={cityId}
                  className="city-list-item"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="city-list-image">
                    <img src={city.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DaXR5PC90ZXh0Pjwvc3ZnPg=='} alt={city.name} />
                  </div>
                  <span className="city-list-name">{city.name}</span>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <p>No cities found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
