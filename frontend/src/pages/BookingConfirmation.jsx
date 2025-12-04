import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const { id } = useParams();
  const { getBooking, loading, error } = useBooking();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBooking(id);
        setBooking(data);
      } catch (err) {
        console.error('Error fetching booking:', err);
      }
    };

    if (id) {
      fetchBooking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="loading">Loading booking confirmation...</div>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="error-message">
            <p>{error || 'Booking not found'}</p>
            <Link to="/attractions">Back to Attractions</Link>
          </div>
        </div>
      </div>
    );
  }

  const attraction = booking.attractionId;
  const imageUrl = attraction?.images && attraction.images.length > 0 
    ? attraction.images[0] 
    : 'https://via.placeholder.com/400x300?text=No+Image';

  const bookingDate = new Date(booking.date);
  const formattedDate = bookingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = (() => {
    const [hours, minutes] = booking.time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  })();

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <h1 className="confirmation-title">Booking Confirmed!</h1>
          <p className="confirmation-subtitle">
            Your booking has been successfully confirmed. A confirmation email has been sent to {booking.guestInfo.email}.
          </p>

          <div className="confirmation-details">
            <div className="detail-card">
              <h3>Booking Details</h3>
              <div className="detail-row">
                <span className="detail-label">Booking ID</span>
                <span className="detail-value">{booking._id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className="detail-value status-confirmed">{booking.status}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date</span>
                <span className="detail-value">{formattedDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time</span>
                <span className="detail-value">{formattedTime}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tickets</span>
                <span className="detail-value">{booking.tickets}</span>
              </div>
              <div className="detail-row total-row">
                <span className="detail-label">Total Amount</span>
                <span className="detail-value">${booking.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="detail-card">
              <h3>Attraction</h3>
              <div className="attraction-preview">
                <img src={imageUrl} alt={attraction?.name} />
                <div>
                  <h4>{attraction?.name}</h4>
                  <p className="attraction-price">${attraction?.price} per ticket</p>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <h3>Guest Information</h3>
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{booking.guestInfo.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{booking.guestInfo.email}</span>
              </div>
              {booking.guestInfo.phone && (
                <div className="detail-row">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{booking.guestInfo.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/attractions" className="action-button secondary">
              Browse More Attractions
            </Link>
            <Link to="/" className="action-button primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

