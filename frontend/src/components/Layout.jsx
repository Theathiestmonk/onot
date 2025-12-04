import MobileHeader from './MobileHeader';
import Footer from './Footer';
import BottomNav from './BottomNav';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <MobileHeader />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Layout;
