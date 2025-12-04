import { Link } from 'react-router-dom';
import './AttractionCard.css';

const AttractionCard = ({ attraction }) => {
  if (!attraction) return null;

  const imageUrl = attraction.images && attraction.images.length > 0 
    ? attraction.images[0] 
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <Link to={`/attractions/${attraction._id}`} className="attraction-card">
      <div className="attraction-card-image">
        <img src={imageUrl} alt={attraction.name} />
        {attraction.featured && (
          <span className="attraction-card-badge">Featured</span>
        )}
      </div>
      <div className="attraction-card-content">
        <div className="attraction-card-header">
          <h3 className="attraction-card-title">{attraction.name}</h3>
          <div className="attraction-card-rating">
            <span className="rating-star">⭐</span>
            <span>{attraction.rating?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
        <p className="attraction-card-location">
          {attraction.cityId?.name || 'Unknown City'}
        </p>
        <p className="attraction-card-description">
          {attraction.description?.substring(0, 100)}...
        </p>
        <div className="attraction-card-footer">
          <span className="attraction-card-category">{attraction.category}</span>
          <span className="attraction-card-price">
            {attraction.price === 0 ? 'Free' : `$${attraction.price}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AttractionCard;

