import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CityProvider } from './context/CityContext';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AttractionsList from './pages/AttractionsList';
import CategoryPage from './pages/CategoryPage';
import AttractionDetail from './pages/AttractionDetail';
import Cart from './pages/Cart';
import VisitorDetails from './pages/VisitorDetails';
import UploadDocuments from './pages/UploadDocuments';
import Payment from './pages/Payment';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import './App.css';

function App() {
  return (
    <CityProvider>
      <SearchProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/attractions" element={<AttractionsList />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/attractions/:id" element={<AttractionDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/visitor-details" element={<VisitorDetails />} />
                <Route path="/upload-documents" element={<UploadDocuments />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/attractions/:id/booking" element={<Booking />} />
                <Route path="/booking/:id/confirmation" element={<BookingConfirmation />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </SearchProvider>
    </CityProvider>
  );
}

export default App;
