import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, calculateTotal } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('googlepay');

  // Calculate order totals
  const orderDetails = useMemo(() => {
    const subtotal = calculateTotal();
    const conveyanceFee = 5.00;
    const platformFee = 5.00;
    const total = subtotal + conveyanceFee + platformFee;
    
    // Generate order ID
    const orderId = Math.floor(10000000 + Math.random() * 90000000).toString();

    return {
      orderId,
      subtotal,
      conveyanceFee,
      platformFee,
      total
    };
  }, [cartItems, calculateTotal]);

  const handlePayment = () => {
    // Process payment and navigate to confirmation
    navigate('/booking/confirmation');
  };

  if (cartItems.length === 0) {
    return (
      <div className="payment-page">
        <div className="empty-cart-message">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/cart')}>Go to Cart</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      {/* Header */}
      <div className="payment-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg className="back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="page-title">Payment</h1>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className="progress-step active">
          <div className="step-circle">1</div>
        </div>
        <div className="progress-line active"></div>
        <div className="progress-step active current">
          <div className="step-circle">2</div>
          <div className="step-underline"></div>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-circle">3</div>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="order-details-card">
        <h2 className="order-details-title">Order Details</h2>
        <div className="order-details-list">
          <div className="order-detail-item">
            <span className="detail-label">Order ID</span>
            <span className="detail-value">{orderDetails.orderId}</span>
          </div>
          <div className="order-detail-item">
            <span className="detail-label">Conveyance Fee</span>
            <span className="detail-value">₹ {orderDetails.conveyanceFee.toFixed(2)}</span>
          </div>
          <div className="order-detail-item">
            <span className="detail-label">Platform fee</span>
            <span className="detail-value">₹ {orderDetails.platformFee.toFixed(2)}</span>
          </div>
          <div className="order-detail-item">
            <span className="detail-label">Sub Total</span>
            <span className="detail-value">₹ {orderDetails.subtotal.toFixed(2)}</span>
          </div>
        </div>
        <div className="order-divider"></div>
        <div className="order-total">
          <div className="total-left">
            <span className="total-label">TOTAL</span>
            <span className="total-amount">₹{orderDetails.total.toFixed(2)}</span>
          </div>
          <div className="document-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="10 9 9 9 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Preferred Mode Section */}
      <div className="payment-methods-section">
        <h2 className="section-title">Preferred Mode</h2>
        <div className="payment-methods">
          {/* Google Pay */}
          <div 
            className={`payment-method ${selectedPaymentMethod === 'googlepay' ? 'selected' : ''}`}
            onClick={() => setSelectedPaymentMethod('googlepay')}
          >
            <div className="payment-method-left">
              <div className="payment-logo googlepay-logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C12.6863 8 10 10.6863 10 14C10 17.3137 12.6863 20 16 20C19.3137 20 22 17.3137 22 14C22 10.6863 19.3137 8 16 8Z" fill="#4285F4"/>
                  <path d="M16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24Z" fill="#34A853"/>
                </svg>
              </div>
              <div className="payment-method-info">
                <span className="payment-method-name">Google Pay</span>
              </div>
            </div>
            <div className="payment-radio">
              {selectedPaymentMethod === 'googlepay' ? (
                <div className="radio-selected">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#10b981"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <div className="radio-unselected"></div>
              )}
            </div>
          </div>
          {selectedPaymentMethod === 'googlepay' && (
            <button className="pay-button googlepay-button" onClick={handlePayment}>
              Pay using Google Pay
            </button>
          )}

          {/* Paytm */}
          <div 
            className={`payment-method ${selectedPaymentMethod === 'paytm' ? 'selected' : ''}`}
            onClick={() => setSelectedPaymentMethod('paytm')}
          >
            <div className="payment-method-left">
              <div className="payment-logo paytm-logo">
                <span className="paytm-text">Paytm</span>
              </div>
              <div className="payment-method-info">
                <span className="payment-method-name">Paytm</span>
                <span className="payment-amount">₹{orderDetails.total.toFixed(0)}</span>
              </div>
            </div>
            <div className="payment-radio">
              {selectedPaymentMethod === 'paytm' ? (
                <div className="radio-selected">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#10b981"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <div className="radio-unselected"></div>
              )}
            </div>
          </div>

          {/* Mastercard */}
          <div 
            className={`payment-method ${selectedPaymentMethod === 'mastercard' ? 'selected' : ''}`}
            onClick={() => setSelectedPaymentMethod('mastercard')}
          >
            <div className="payment-method-left">
              <div className="payment-logo mastercard-logo">
                <div className="mastercard-circles">
                  <div className="mastercard-circle red"></div>
                  <div className="mastercard-circle orange"></div>
                </div>
              </div>
              <div className="payment-method-info">
                <span className="payment-method-name">... 9999</span>
                <span className="secured-tag">Secured</span>
              </div>
            </div>
            <div className="payment-radio">
              {selectedPaymentMethod === 'mastercard' ? (
                <div className="radio-selected">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#10b981"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <div className="radio-unselected"></div>
              )}
            </div>
          </div>

          {/* UPI */}
          <div 
            className={`payment-method ${selectedPaymentMethod === 'upi' ? 'selected' : ''}`}
            onClick={() => setSelectedPaymentMethod('upi')}
          >
            <div className="payment-method-left">
              <div className="payment-method-info">
                <span className="payment-method-name">UPI</span>
              </div>
            </div>
            <div className="payment-radio">
              {selectedPaymentMethod === 'upi' ? (
                <div className="radio-selected">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#10b981"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <div className="radio-unselected"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

