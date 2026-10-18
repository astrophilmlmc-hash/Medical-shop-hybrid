import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppLogin from './components/WhatsAppLogin';
import WhatsAppWidget from './components/WhatsAppWidget';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import StoreLocator from './pages/StoreLocator';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import PrescriptionUpload from './pages/PrescriptionUpload';
import MyAccount from './pages/MyAccount';
import AdminDashboard from './pages/AdminDashboard';
import AboutLegal from './pages/AboutLegal';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/stores" element={<StoreLocator />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/track" element={<OrderTracking />} />
              <Route path="/orders/:id" element={<OrderTracking />} />
              <Route path="/prescriptions" element={<PrescriptionUpload />} />
              <Route path="/account" element={<MyAccount />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/about" element={<AboutLegal />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppLogin />
          <WhatsAppWidget />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
