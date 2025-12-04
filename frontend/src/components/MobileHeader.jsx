import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import './MobileHeader.css';

const MobileHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();

  // Get user name (you can replace this with actual user data later)
  const userName = 'Meet'; // Default user name

  // Hide header on attraction detail pages, category pages, cart page, and visitor details page
  const isAttractionDetail = location.pathname.startsWith('/attractions/') && 
                             !location.pathname.includes('/booking') &&
                             location.pathname.split('/').length === 3;
  const isCategoryPage = location.pathname.startsWith('/category/');
  const isCartPage = location.pathname === '/cart';
  const isVisitorDetailsPage = location.pathname === '/visitor-details';
  const isUploadDocumentsPage = location.pathname === '/upload-documents';
  const isPaymentPage = location.pathname === '/payment';

  // Clear search when navigating away from home
  useEffect(() => {
    if (location.pathname !== '/') {
      setSearchQuery('');
    }
  }, [location.pathname, setSearchQuery]);

  if (isAttractionDetail || isCategoryPage || isCartPage || isVisitorDetailsPage || isUploadDocumentsPage || isPaymentPage) {
    return null;
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mobile-header">
      {/* User Header */}
      <div className="user-header">
        <div className="user-header-left">
          <div className="user-icon-circle">
            <svg className="user-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="user-greeting">
            <p className="greeting-text">Hello, {userName}</p>
            <h1 className="welcome-text">WELCOME</h1>
          </div>
        </div>
        <div className="user-header-right">
          <button className="header-icon-btn" aria-label="Notifications">
            <svg className="header-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="header-icon-btn" 
            aria-label="Cart"
            onClick={() => navigate('/cart')}
          >
            <svg className="header-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="21" r="1" fill="currentColor"/>
              <circle cx="20" cy="21" r="1" fill="currentColor"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
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
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;

