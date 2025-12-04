import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCity } from '../context/CityContext';
import { useAttractions } from '../hooks/useAttractions';
import { useSearch } from '../context/SearchContext';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { selectedCity } = useCity();
  const { searchQuery } = useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Map category names from URL to database categories
  const categoryMap = {
    'Museum': 'Museum',
    'Zoological Parks': 'Zoological Parks',
    'Historical Places': 'Historical Places',
    'Heritage': 'Heritage',
    'Flower Parks': 'Flower Parks',
    'Religious Places': 'Religious Places'
  };

  const dbCategory = categoryMap[categoryName] || categoryName;

  // Get attractions filtered by category and city
  const cityId = selectedCity?._id || selectedCity?.id;
  const { attractions, loading } = useAttractions(
    cityId ? { cityId: cityId, category: dbCategory } : { category: dbCategory }
  );

  // Filter by search query
  const filteredAttractions = useMemo(() => {
    if (!attractions) return [];
    const query = localSearchQuery || searchQuery;
    if (!query) return attractions;
    
    return attractions.filter(attr =>
      attr.name.toLowerCase().includes(query.toLowerCase()) ||
      attr.description?.toLowerCase().includes(query.toLowerCase()) ||
      attr.address?.toLowerCase().includes(query.toLowerCase())
    );
  }, [attractions, localSearchQuery, searchQuery]);

  const handleAttractionClick = (attraction) => {
    const id = attraction._id || attraction.id;
    navigate(`/attractions/${id}`);
  };

  if (loading) {
    return (
      <div className="category-page">
        <div className="loading">Loading attractions...</div>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Header with Back Button and Category Name */}
      <div className="category-header">
        <button className="back-button" onClick={() => navigate('/attractions')}>
          <svg className="back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="category-title">{categoryName}</h1>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Attractions List */}
      <div className="attractions-list">
        {filteredAttractions.length > 0 ? (
          filteredAttractions.map((attraction) => {
            const id = attraction._id || attraction.id;
            const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
            const imageUrl = attraction.images && attraction.images.length > 0 
              ? attraction.images[0] 
              : placeholderImage;
            
            return (
              <div
                key={id}
                className="attraction-card"
                onClick={() => handleAttractionClick(attraction)}
              >
                <div className="attraction-image">
                  <img src={imageUrl} alt={attraction.name} />
                </div>
                <div className="attraction-info">
                  <h3 className="attraction-name">{attraction.name}</h3>
                  <div className="attraction-location">
                    <svg className="location-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="currentColor"/>
                      <circle cx="12" cy="10" r="3" fill="#ffffff"/>
                    </svg>
                    <span>{attraction.address?.split(',')[0] || selectedCity?.name || 'Unknown'}</span>
                  </div>
                  <div className="attraction-rating">
                    <svg className="star-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                    </svg>
                    <span className="rating-value">{attraction.rating?.toFixed(1) || '0.0'}</span>
                    {attraction.reviews_count !== undefined && attraction.reviews_count > 0 && (
                      <span className="reviews-count">({attraction.reviews_count.toLocaleString()} Reviews)</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>No attractions found in {categoryName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

