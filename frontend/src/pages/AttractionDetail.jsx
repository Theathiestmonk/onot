import { useParams, useNavigate } from 'react-router-dom';
import { useAttraction } from '../hooks/useAttractions';
import { useCart } from '../context/CartContext';
import './AttractionDetail.css';

const AttractionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { attraction, loading, error } = useAttraction(id);
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="attraction-detail-page">
        <div className="loading">Loading attraction details...</div>
      </div>
    );
  }

  if (error || !attraction) {
    return (
      <div className="attraction-detail-page">
        <div className="error-message">
          <p>{error || 'Attraction not found'}</p>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    );
  }

  // Get first image URL - backend already parsed it as an array
  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
  const mainImage = attraction.images && attraction.images.length > 0 
    ? attraction.images[0] 
    : placeholderImage;

  // Format opening hours
  const formatTiming = (hours) => {
    if (!hours) return '9:00 AM - 6:00 PM';
    return hours.replace(/:/g, '').replace(/\s/g, ' ').trim();
  };

  const timing = formatTiming(attraction.opening_hours || attraction.openingHours);

  // Generate price list based on attraction price
  const generatePrices = (basePrice) => {
    if (basePrice === 0) {
      return [
        { category: 'School Teachers and Assistants', price: 30 },
        { category: 'Student (Under 12 years)', price: 25 },
        { category: 'Student (Above 12 years)', price: 40 },
        { category: 'Children (Under 12 years)', price: 40 },
        { category: 'Adults (Above 12 years)', price: 50 }
      ];
    }
    // If there's a base price, create variations
    return [
      { category: 'School Teachers and Assistants', price: Math.round(basePrice * 0.6) },
      { category: 'Student (Under 12 years)', price: Math.round(basePrice * 0.5) },
      { category: 'Student (Above 12 years)', price: Math.round(basePrice * 0.8) },
      { category: 'Children (Under 12 years)', price: Math.round(basePrice * 0.8) },
      { category: 'Adults (Above 12 years)', price: basePrice }
    ];
  };

  const prices = generatePrices(attraction.price || 0);

  return (
    <div className="attraction-detail-page">
      {/* Image Section with Back Button */}
      <div className="image-section">
        <img 
          src={mainImage} 
          alt={attraction.name} 
          className="main-image"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
          }}
        />
        <button className="back-button-overlay" onClick={() => navigate(-1)}>
          <svg className="back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Information Section */}
      <div className="info-section">
        {/* Rating */}
        <div className="rating-section">
          <svg className="star-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
          </svg>
          <span className="rating-text">
            {attraction.rating?.toFixed(1) || '0.0'} ({attraction.reviews_count ? attraction.reviews_count.toLocaleString() : '0'} Reviews)
          </span>
        </div>

        {/* Timing and Add to Cart */}
        <div className="timing-cart-row">
          <div className="timing-section">
            <span className="timing-label">Timing - </span>
            <span className="timing-value">{timing}</span>
          </div>
          <button 
            className="add-to-cart-button" 
            onClick={() => {
              if (attraction) {
                addToCart(attraction);
                navigate('/cart');
              }
            }}
          >
            Add to Cart
          </button>
        </div>

        {/* Attraction Name */}
        <h1 className="attraction-name">{attraction.name}</h1>

        {/* Description */}
        <div className="description-section">
          <p className="description-text">{attraction.description}</p>
        </div>

        {/* Prices Section */}
        <div className="prices-section">
          <h2 className="prices-title">Prices</h2>
          <div className="prices-list">
            {prices.map((item, index) => (
              <div key={index} className="price-item">
                <span className="price-category">{item.category}</span>
                <span className="price-value">Rs {item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetail;
