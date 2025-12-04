import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './VisitorDetails.css';

const VisitorDetails = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Calculate total number of visitors from all cart items
  const totalVisitors = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + item.tickets.adult + item.tickets.child + 
             item.tickets.seniorCitizen + item.tickets.foreignNationals;
    }, 0);
  }, [cartItems]);

  // Initialize visitor data
  const [visitors, setVisitors] = useState(() => {
    const initialVisitors = [];
    for (let i = 0; i < totalVisitors; i++) {
      initialVisitors.push({
        name: i === 0 ? 'Meet Bhatt' : '',
        age: i === 0 ? '35' : '',
        gender: i === 0 ? 'Male' : '',
        nationality: i === 0 ? 'Indian' : ''
      });
    }
    return initialVisitors;
  });

  const handleInputChange = (index, field, value) => {
    const updatedVisitors = [...visitors];
    updatedVisitors[index][field] = value;
    setVisitors(updatedVisitors);
  };

  const handleNext = () => {
    // Validate all fields are filled
    const allFilled = visitors.every(v => v.name && v.age && v.gender && v.nationality);
    if (!allFilled) {
      alert('Please fill in all visitor details');
      return;
    }
    // Store visitors in sessionStorage to pass to next page
    sessionStorage.setItem('visitorDetails', JSON.stringify(visitors));
    // Navigate to upload documents page
    navigate('/upload-documents');
  };

  if (cartItems.length === 0) {
    return (
      <div className="visitor-details-page">
        <div className="empty-cart-message">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/cart')}>Go to Cart</button>
        </div>
      </div>
    );
  }

  return (
    <div className="visitor-details-page">
      {/* Header */}
      <div className="visitor-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg className="back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="page-title">Detail and Verification</h1>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className="progress-step active">
          <div className="step-circle">1</div>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-circle">2</div>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-circle">3</div>
        </div>
      </div>

      {/* Visitor Forms */}
      <div className="visitor-forms">
        {visitors.map((visitor, index) => (
          <div key={index} className="visitor-section">
            {index > 0 && <div className="section-divider"></div>}
            <h2 className="visitor-heading">Visitor {index + 1}</h2>
            <div className="visitor-fields">
              <input
                type="text"
                className="visitor-input"
                placeholder="Name"
                value={visitor.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              />
              <input
                type="number"
                className="visitor-input"
                placeholder="Age"
                value={visitor.age}
                onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                min="1"
                max="120"
              />
              <select
                className="visitor-input"
                value={visitor.gender}
                onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                className="visitor-input"
                placeholder="Nationality"
                value={visitor.nationality}
                onChange={(e) => handleInputChange(index, 'nationality', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="action-footer">
        <button className="next-button" onClick={handleNext}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default VisitorDetails;

