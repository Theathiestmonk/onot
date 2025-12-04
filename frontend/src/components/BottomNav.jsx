import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link
        to="/"
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        aria-label="Home"
      >
        <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor"/>
          <path d="M9 22V12h6v10" fill="currentColor" opacity="0.3"/>
        </svg>
      </Link>
      <Link
        to="/notifications"
        className={`nav-item ${location.pathname === '/notifications' ? 'active' : ''}`}
        aria-label="Notifications"
      >
        <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="currentColor"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="currentColor"/>
        </svg>
      </Link>
      <Link
        to="/cart"
        className={`nav-item ${location.pathname === '/cart' ? 'active' : ''}`}
        aria-label="Cart"
      >
        <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="21" r="1.5" fill="currentColor"/>
          <circle cx="20" cy="21" r="1.5" fill="currentColor"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" fill="currentColor"/>
        </svg>
      </Link>
      <Link
        to="/profile"
        className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
        aria-label="Profile"
      >
        <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="currentColor"/>
          <circle cx="12" cy="7" r="4" fill="currentColor"/>
        </svg>
      </Link>
    </nav>
  );
};

export default BottomNav;
