import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Hide header on home page for mobile-first design
  if (isHomePage) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>ONOT</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/attractions" className="nav-link">Attractions</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
