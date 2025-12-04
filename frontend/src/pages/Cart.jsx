import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import DateSelector from '../components/DateSelector';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateTicketCount, calculateTotal, setSelectedDate } = useCart();
  const [dateSelectorOpen, setDateSelectorOpen] = useState(false);
  const [selectedAttractionId, setSelectedAttractionId] = useState(null);
  const [selectedAttractionName, setSelectedAttractionName] = useState('');

  const handleProceedToBuy = () => {
    // Navigate to visitor details page
    navigate('/visitor-details');
  };

  const handleSelectDates = (attractionId, attractionName) => {
    setSelectedAttractionId(attractionId);
    setSelectedAttractionName(attractionName);
    setDateSelectorOpen(true);
  };

  const handleDateSelected = (date) => {
    if (selectedAttractionId) {
      setSelectedDate(selectedAttractionId, date);
    }
  };

  const formatTiming = (hours) => {
    if (!hours) return '9:00 AM - 6:00 PM';
    return hours.replace(/:/g, '').replace(/\s/g, ' ').trim();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    
    // Add ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  const getItemPrice = (item) => {
    // Calculate price based on tickets
    const basePrice = item.price || 0;
    const ticketCount = item.tickets.adult + item.tickets.child + 
                       item.tickets.seniorCitizen + item.tickets.foreignNationals;
    
    if (basePrice === 0) {
      // Use default pricing structure
      const adultPrice = 50;
      const childPrice = 40;
      const seniorPrice = 30;
      const foreignPrice = 100;
      
      return (item.tickets.adult * adultPrice) +
             (item.tickets.child * childPrice) +
             (item.tickets.seniorCitizen * seniorPrice) +
             (item.tickets.foreignNationals * foreignPrice);
    }
    
    return basePrice * ticketCount || 200;
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <svg className="back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="cart-title">Cart</h1>
        </div>
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Header */}
      <div className="cart-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg className="back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="cart-title">Cart</h1>
      </div>

      {/* Cart Items */}
      <div className="cart-items">
        {cartItems.map((item) => {
          const attraction = item.attraction;
          const imageUrl = attraction.images && attraction.images.length > 0 
            ? attraction.images[0] 
            : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
          const timing = formatTiming(attraction.opening_hours || attraction.openingHours);
          const location = attraction.address?.split(',')[0] || attraction.cityId?.name || 'Unknown';
          const itemPrice = getItemPrice(item);

          return (
            <div key={item.attractionId} className="cart-item-card">
              {/* Remove Button */}
              <button 
                className="remove-button"
                onClick={() => removeFromCart(item.attractionId)}
                aria-label="Remove item"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Item Content */}
              <div className="cart-item-content">
                {/* Thumbnail and Details */}
                <div className="item-header">
                  <div className="item-thumbnail">
                    <img src={imageUrl} alt={attraction.name} />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{attraction.name}</h3>
                    <p className="item-location">{location}</p>
                    <p className="item-timing">Timing - {timing}</p>
                  </div>
                </div>

                {/* Select Tickets */}
                <div className="ticket-selection">
                  <h4 className="ticket-selection-title">Select Tickets</h4>
                  <div className="ticket-types">
                    {[
                      { key: 'adult', label: 'Adult' },
                      { key: 'child', label: 'Child' },
                      { key: 'seniorCitizen', label: 'Senior Citizen' },
                      { key: 'foreignNationals', label: 'Foreign Nationals' }
                    ].map(({ key, label }) => (
                      <div key={key} className="ticket-type">
                        <span className="ticket-label">{label}</span>
                        <div className="ticket-controls">
                          <button
                            className="ticket-button minus"
                            onClick={() => updateTicketCount(item.attractionId, key, item.tickets[key] - 1)}
                            disabled={item.tickets[key] === 0}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <span className="ticket-count">{item.tickets[key]}</span>
                          <button
                            className="ticket-button plus"
                            onClick={() => updateTicketCount(item.attractionId, key, item.tickets[key] + 1)}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Status and Price */}
                <div className="item-footer">
                  <div className="payment-info">
                    <p className="payment-status">
                      Payment Status: <span className="pending">Pending</span>
                    </p>
                    <p className="item-price">RS {itemPrice}</p>
                    {item.selectedDate && (
                      <p className="selected-date-text">{formatDate(item.selectedDate)}</p>
                    )}
                  </div>
                  {!item.selectedDate && (
                    <button
                      className="select-dates-button"
                      onClick={() => handleSelectDates(item.attractionId, attraction.name)}
                    >
                      Select Dates
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Proceed to Buy Button */}
      <div className="cart-footer">
        <button className="proceed-button" onClick={handleProceedToBuy}>
          Proceed to buy
        </button>
      </div>

      {/* Date Selector Modal */}
      <DateSelector
        isOpen={dateSelectorOpen}
        onClose={() => setDateSelectorOpen(false)}
        onSelectDate={handleDateSelected}
        selectedDate={cartItems.find(item => item.attractionId === selectedAttractionId)?.selectedDate || null}
        attractionName={selectedAttractionName}
      />
    </div>
  );
};

export default Cart;

