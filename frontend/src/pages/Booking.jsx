import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAttraction } from '../hooks/useAttractions';
import { useBooking } from '../hooks/useBooking';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { attraction, loading: attractionLoading } = useAttraction(id);
  const { createBooking, loading: bookingLoading, error } = useBooking();

  const [formData, setFormData] = useState({
    tickets: 1,
    date: '',
    time: '10:00',
    guestInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: dateString }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('guestInfo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        guestInfo: {
          ...prev.guestInfo,
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.date) {
      errors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      errors.time = 'Time is required';
    }

    if (formData.tickets < 1) {
      errors.tickets = 'At least 1 ticket is required';
    }

    if (!formData.guestInfo.name.trim()) {
      errors['guestInfo.name'] = 'Name is required';
    }

    if (!formData.guestInfo.email.trim()) {
      errors['guestInfo.email'] = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guestInfo.email)) {
      errors['guestInfo.email'] = 'Invalid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const bookingData = {
        attractionId: id,
        tickets: parseInt(formData.tickets),
        date: formData.date,
        time: formData.time,
        guestInfo: formData.guestInfo,
      };

      const booking = await createBooking(bookingData);
      navigate(`/booking/${booking._id}/confirmation`);
    } catch (err) {
      console.error('Booking error:', err);
    }
  };

  if (attractionLoading) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="error-message">
            <p>Attraction not found</p>
            <Link to="/attractions">Back to Attractions</Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = attraction.price * formData.tickets;
  const imageUrl = attraction.images && attraction.images.length > 0 
    ? attraction.images[0] 
    : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

  return (
    <div className="booking-page">
      <div className="container">
        <Link to={`/attractions/${id}`} className="back-link">← Back to Attraction</Link>

        <div className="booking-content">
          <div className="booking-summary">
            <h2>Booking Summary</h2>
            <div className="summary-attraction">
              <img src={imageUrl} alt={attraction.name} />
              <div>
                <h3>{attraction.name}</h3>
                <p>{attraction.cityId?.name || 'Unknown City'}</p>
                <p className="summary-price">${attraction.price} per ticket</p>
              </div>
            </div>
            <div className="summary-total">
              <div className="total-line">
                <span>Tickets: {formData.tickets}</span>
                <span>${attraction.price} × {formData.tickets}</span>
              </div>
              <div className="total-line total">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <h2>Booking Details</h2>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="tickets">Number of Tickets *</label>
              <input
                type="number"
                id="tickets"
                name="tickets"
                min="1"
                max="10"
                value={formData.tickets}
                onChange={handleChange}
                required
              />
              {formErrors.tickets && (
                <span className="field-error">{formErrors.tickets}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              {formErrors.date && (
                <span className="field-error">{formErrors.date}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
              {formErrors.time && (
                <span className="field-error">{formErrors.time}</span>
              )}
            </div>

            <div className="form-section">
              <h3>Guest Information</h3>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="guestInfo.name"
                  value={formData.guestInfo.name}
                  onChange={handleChange}
                  required
                />
                {formErrors['guestInfo.name'] && (
                  <span className="field-error">{formErrors['guestInfo.name']}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="guestInfo.email"
                  value={formData.guestInfo.email}
                  onChange={handleChange}
                  required
                />
                {formErrors['guestInfo.email'] && (
                  <span className="field-error">{formErrors['guestInfo.email']}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="guestInfo.phone"
                  value={formData.guestInfo.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={bookingLoading}
            >
              {bookingLoading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;

