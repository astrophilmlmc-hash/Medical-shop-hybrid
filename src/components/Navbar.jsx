import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  FileText,
  Truck,
  Store,
  ShieldCheck,
  PackageCheck,
  Menu,
  X,
  MessageSquare,
  ChevronRight,
  LogOut,
  Pill
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const {
    user,
    setLoginModalOpen,
    logout,
    fulfillmentMode,
    setFulfillmentMode,
    selectedStore,
    stores,
    setSelectedStoreId,
    cartCount,
    products,
    prescriptions
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const pendingRxCount = prescriptions.filter(p => p.verification_status === 'Pending').length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? products
        .filter(
          p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.generic_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      {/* Top Hybrid Fulfillment & Compliance Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Hybrid Mode Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 hidden sm:inline font-medium">Mode:</span>
            <div className="inline-flex bg-slate-800 p-0.5 rounded-full border border-slate-700">
              <button
                type="button"
                onClick={() => setFulfillmentMode('delivery')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition ${
                  fulfillmentMode === 'delivery'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Home Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setFulfillmentMode('pickup')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition ${
                  fulfillmentMode === 'pickup'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Store Pickup (30m • Free)</span>
              </button>
            </div>

            {/* Active Store Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate max-w-[180px] sm:max-w-[240px]">
                  {selectedStore.store_name.replace('MediShop Hybrid - ', '').replace('MediShop Hybrid ', '')}
                </span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {storeDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-72 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 p-2 z-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 py-1">
                    Select Nearest Hybrid Store
                  </div>
                  {stores.map(st => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        setSelectedStoreId(st.id);
                        setStoreDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-start justify-between gap-2 transition ${
                        Number(st.id) === Number(selectedStore.id)
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{st.store_name}</div>
                        <div className="text-[11px] text-gray-500">
                          Ready in {st.pickup_ready_mins} mins • {st.opening_time}
                        </div>
                      </div>
                      {Number(st.id) === Number(selectedStore.id) && (
                        <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                  <Link
                    to="/stores"
                    onClick={() => setStoreDropdownOpen(false)}
                    className="block text-center text-xs font-semibold text-blue-600 hover:underline pt-2 mt-1 border-t border-gray-100"
                  >
                    View Map &amp; All 5 Stores →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Quick Links */}
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              DL: KA-BLR-20B-88412
            </span>
            <Link to="/track" className="hover:text-white flex items-center gap-1 transition">
              <PackageCheck className="w-3.5 h-3.5 text-blue-400" />
              Track Order
            </Link>
            <Link
              to="/admin"
              className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1.5 transition"
            >
              <span>Pharmacist / Admin Panel</span>
              {pendingRxCount > 0 && (
                <span className="bg-amber-400 text-slate-900 px-1.5 rounded-full text-[10px] font-extrabold">
                  {pendingRxCount} Rx
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white font-extrabold text-xl shadow-sm">
            M+
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600">
                MediShop
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border border-emerald-200">
                Hybrid
              </span>
            </div>
            <p className="text-[11px] text-gray-500 hidden sm:block leading-none">
              Online Delivery + 30-Min Store Pickup
            </p>
          </div>
        </Link>

        {/* Search Bar with Live Generic/Brand Autocomplete */}
        <div ref={searchRef} className="flex-1 max-w-xl mx-2 relative hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search medicine or generic salt (e.g. Metformin, Vitamin C, Telma, Dolo)..."
              className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <Search className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition"
            >
              Search
            </button>
          </form>

          {/* Instant Search Dropdown */}
          {showSuggestions && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
              {filteredSuggestions.length > 0 ? (
                <div>
                  <div className="px-3.5 py-2 bg-slate-50 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500 flex justify-between">
                    <span>Matching Medicines &amp; Generic Salts</span>
                    <span>{filteredSuggestions.length} matches</span>
                  </div>
                  {filteredSuggestions.map(item => (
                    <Link
                      key={item.id}
                      to={`/products/${item.id}`}
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-blue-50/60 border-b border-gray-100 last:border-none transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          <Pill className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-gray-900 truncate">
                              {item.name}
                            </span>
                            {item.prescription_required ? (
                              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                Rx Required
                              </span>
                            ) : (
                              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                OTC
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            Salt: {item.generic_name} • {item.manufacturer}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <div className="text-sm font-bold text-gray-900">₹{item.selling_price}</div>
                        <div className="text-[11px] text-gray-400 line-through">₹{item.mrp}</div>
                      </div>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full py-2.5 bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 flex items-center justify-center gap-1"
                  >
                    <span>See all results for "{searchQuery}"</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No direct match for "{searchQuery}". Try searching by salt name like{' '}
                  <button
                    type="button"
                    onClick={() => setSearchQuery('Metformin')}
                    className="text-blue-600 underline font-medium"
                  >
                    Metformin
                  </button>{' '}
                  or{' '}
                  <button
                    type="button"
                    onClick={() => setSearchQuery('Vitamin C')}
                    className="text-blue-600 underline font-medium"
                  >
                    Vitamin C
                  </button>
                  .
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Nav Actions */}
        <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-700">
          <Link
            to="/products"
            className={`hover:text-blue-600 transition ${
              isActive('/products') ? 'text-blue-600 font-bold' : ''
            }`}
          >
            Medicines
          </Link>

          <Link
            to="/stores"
            className={`flex items-center gap-1 hover:text-blue-600 transition ${
              isActive('/stores') ? 'text-blue-600 font-bold' : ''
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Stores</span>
          </Link>

          <Link
            to="/prescriptions"
            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold transition"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Upload Rx</span>
          </Link>
        </div>

        {/* Cart & WhatsApp Login */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-gray-800 hover:text-blue-600 transition"
            title="View Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-semibold">Cart</span>
            <span className="bg-blue-600 text-white text-xs font-extrabold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {user ? (
            <div className="flex items-center gap-1.5">
              <Link
                to="/account"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm border border-blue-200 transition"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[110px] truncate">{user.name.split(' ')[0]}</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                title="Logout"
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Login</span>
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicines or generic salt..."
            className="w-full pl-9 pr-20 py-2 bg-slate-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <button
            type="submit"
            className="absolute right-1.5 top-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
          >
            Go
          </button>
        </form>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2 text-sm font-medium">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-gray-50"
          >
            All Medicines &amp; Catalog
          </Link>
          <Link
            to="/prescriptions"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 font-semibold"
          >
            📋 Upload Prescription (Website / WhatsApp)
          </Link>
          <Link
            to="/stores"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-gray-50"
          >
            🏪 Store Locator (30-Min Pickup)
          </Link>
          <Link
            to="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-gray-50"
          >
            🚚 Track Order
          </Link>
          <Link
            to="/account"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-gray-50"
          >
            👤 My Account (Addresses, Family, Rx Vault)
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg bg-amber-50 text-amber-800 font-semibold"
          >
            🛡️ Pharmacist &amp; Admin Panel ({pendingRxCount} Pending Rx)
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
