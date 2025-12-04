import { useState, useMemo } from 'react';
import { useCity } from '../context/CityContext';
import { useAttractions } from '../hooks/useAttractions';
import { useNavigate } from 'react-router-dom';
import './AttractionsList.css';

const AttractionsList = () => {
  const { selectedCity } = useCity();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get all attractions for the selected city only
  const cityId = selectedCity?._id || selectedCity?.id;
  const { attractions, loading } = useAttractions(
    cityId ? { cityId: cityId } : {}
  );

  // Get most visited (featured attractions) - only from selected city
  // Since attractions are already filtered by cityId from API, we just need featured ones
  const mostVisited = useMemo(() => {
    if (!attractions || !cityId) return [];
    // Attractions are already filtered by city from the API, just get featured ones
    return attractions
      .filter(attr => attr.featured === true)
      .slice(0, 10)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [attractions, cityId]);

  // Get places nearby (all attractions)
  const placesNearby = useMemo(() => {
    if (!attractions) return [];
    return attractions.slice(0, 10);
  }, [attractions]);

  // Filter attractions by category if selected
  const filteredAttractions = useMemo(() => {
    if (!selectedCategory) return placesNearby;
    return placesNearby.filter(attr => {
      const categoryMap = {
        'Museum': 'Museum',
        'Zoological Parks': 'Park',
        'Historical Places': 'Monument',
        'Heritage': 'Cultural',
        'Flower Parks': 'Park',
        'Religious Places': 'Cultural'
      };
      return attr.category === categoryMap[selectedCategory];
    });
  }, [placesNearby, selectedCategory]);

  const handleAttractionClick = (attraction) => {
    const id = attraction._id || attraction.id;
    navigate(`/attractions/${id}`);
  };

  const categories = [
    { 
      name: 'Museum',
      displayName: 'Museum',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 21V7l8-4v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 21V11l-6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 12v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 15v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      name: 'Zoological Parks',
      displayName: 'Zoological\nParks',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 4.5c-1.5 0-3 .5-4 1.5-1.5 1.5-2 3.5-2 5.5 0 2.5 1.5 5 3.5 6.5 1 1 2.5 1.5 4 1.5s3-.5 4-1.5c2-1.5 3.5-4 3.5-6.5 0-2-0.5-4-2-5.5-1-1-2.5-1.5-4-1.5z" fill="currentColor"/>
          <circle cx="9" cy="9" r="1.5" fill="#ffffff"/>
          <circle cx="15" cy="9" r="1.5" fill="#ffffff"/>
          <path d="M12 12.5c-1 0-2-.5-2.5-1" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      name: 'Historical Places',
      displayName: 'Historical\nPlaces',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      name: 'Heritage',
      displayName: 'Heritage',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'Flower Parks',
      displayName: 'Flower\nParks',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
          <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1M20.66 4.34l-4.24 4.24m0 6.84l4.24 4.24M3.34 4.34l4.24 4.24m0 6.84l-4.24 4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      name: 'Religious Places',
      displayName: 'Religious\nPlaces',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="currentColor"/>
          <path d="M12 8v8M8 12h8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  if (loading) {
    return (
      <div className="attractions-list-page">
        <div className="loading">Loading attractions...</div>
      </div>
    );
  }

  if (!selectedCity) {
    return (
      <div className="attractions-list-page">
        <div className="no-results">Please select a city first</div>
      </div>
    );
  }

  return (
    <div className="attractions-list-page">
      {/* Location Display */}
      <div className="location-display">
        <svg className="location-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="currentColor"/>
          <circle cx="12" cy="10" r="3" fill="#ffffff"/>
        </svg>
        <span className="location-text">{selectedCity.name}</span>
      </div>

      {/* Most Visited Section */}
      <section className="most-visited-section">
        <h2 className="section-title">Most Visited</h2>
        <div className="attractions-slider">
          {mostVisited.length > 0 ? (
            mostVisited.map((attraction) => {
              const id = attraction._id || attraction.id;
              const imageUrl = attraction.images && attraction.images.length > 0 
                ? attraction.images[0] 
                : 'https://via.placeholder.com/300x200?text=No+Image';
              
              return (
                <div
                  key={id}
                  className="attraction-slide-card"
                  onClick={() => handleAttractionClick(attraction)}
                >
                  <div className="slide-image">
                    <img 
                      src={imageUrl} 
                      alt={attraction.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="slide-info">
                    <h3 className="slide-title">{attraction.name}</h3>
                    <div className="slide-location">
                      <svg className="slide-location-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="currentColor"/>
                        <circle cx="12" cy="10" r="3" fill="#ffffff"/>
                      </svg>
                      <span>{attraction.address?.split(',')[0] || selectedCity.name}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-attractions">No featured attractions available</div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Categories</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => navigate(`/category/${encodeURIComponent(category.name)}`)}
            >
              <div className="category-icon-wrapper">
                <div className="category-icon">{category.icon}</div>
              </div>
              <span className="category-name" style={{ whiteSpace: 'pre-line' }}>
                {category.displayName || category.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Places Nearby Section */}
      <section className="places-nearby-section">
        <h2 className="section-title">Places Nearby</h2>
        <div className="attractions-slider">
          {filteredAttractions.length > 0 ? (
            filteredAttractions.map((attraction) => {
              const id = attraction._id || attraction.id;
              const imageUrl = attraction.images && attraction.images.length > 0 
                ? attraction.images[0] 
                : 'https://via.placeholder.com/300x200?text=No+Image';
              
              return (
                <div
                  key={id}
                  className="attraction-slide-card"
                  onClick={() => handleAttractionClick(attraction)}
                >
                  <div className="slide-image">
                    <img 
                      src={imageUrl} 
                      alt={attraction.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="slide-info">
                    <h3 className="slide-title">{attraction.name}</h3>
                    <div className="slide-location">
                      <svg className="slide-location-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="currentColor"/>
                        <circle cx="12" cy="10" r="3" fill="#ffffff"/>
                      </svg>
                      <span>{attraction.address?.split(',')[0] || selectedCity.name}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-attractions">No attractions found</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AttractionsList;
