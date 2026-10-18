import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  FileText,
  Truck,
  Store,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Activity,
  HeartPulse,
  Flame,
  Wind,
  Pill,
  Stethoscope,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const categoryIconMap = {
  Activity: Activity,
  HeartPulse: HeartPulse,
  Flame: Flame,
  Sparkles: Sparkles,
  ShieldAlert: ShieldCheck,
  Wind: Wind,
  Pill: Pill,
  Stethoscope: Stethoscope
};

const Home = () => {
  const {
    categories,
    products,
    stores,
    fulfillmentMode,
    setFulfillmentMode,
    selectedStore,
    setSelectedStoreId
  } = useApp();

  const [heroSearch, setHeroSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const featuredProducts = products.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'chronic') return p.category_id === 1 || p.category_id === 2;
    if (activeTab === 'otc') return !p.prescription_required;
    if (activeTab === 'devices') return p.category_id === 8;
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-14 pb-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600 text-white py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>INDIA'S HYBRID MEDICAL SHOP • ONLINE + 30-MIN STORE PICKUP</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Your Health,{' '}
              <span className="text-emerald-300 underline decoration-emerald-400/50">
                Delivered
              </span>{' '}
              or Ready at Store in 30 Mins.
            </h1>

            <p className="text-base sm:text-lg text-blue-50 max-w-2xl leading-relaxed">
              Order genuine batch-verified medicines online for same-day doorstep delivery, or reserve stock at your nearest MediShop Hybrid store and pick up in 20–30 minutes with zero delivery fees.
            </p>

            {/* Hero Search Bar */}
            <form
              onSubmit={handleHeroSearch}
              className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl"
            >
              <div className="flex-1 flex items-center px-3 py-2">
                <Search className="w-5 h-5 text-blue-600 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search by medicine or salt (e.g. Metformin, Vitamin C, Telma 40)..."
                  className="w-full text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shrink-0"
              >
                <span>Search Medicines</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Search Salt/Medicine Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-blue-100 font-semibold">Popular Searches:</span>
              {['Metformin', 'Vitamin C', 'Dolo 650', 'Telma 40', 'Augmentin', 'Insulin Pen', 'BP Monitor'].map(
                term => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => navigate(`/products?search=${encodeURIComponent(term)}`)}
                    className="bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1 rounded-full font-medium transition"
                  >
                    {term}
                  </button>
                )
              )}
            </div>

            {/* Hero Primary CTAs */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <Link
                to="/products"
                className="bg-white text-blue-700 hover:bg-blue-50 px-7 py-3.5 rounded-xl font-extrabold text-sm shadow-lg flex items-center gap-2 transition"
              >
                <span>Shop All Medicines</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/prescriptions"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3.5 rounded-xl font-extrabold text-sm shadow-lg flex items-center gap-2 border border-emerald-400 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Upload Prescription</span>
              </Link>
              <Link
                to="/stores"
                className="bg-blue-900/50 hover:bg-blue-900/70 text-white px-5 py-3.5 rounded-xl font-bold text-sm border border-white/25 flex items-center gap-2 transition"
              >
                <MapPin className="w-4 h-4 text-emerald-300" />
                <span>Find Nearest Store</span>
              </Link>
            </div>
          </div>

          {/* Right Hybrid Interactive Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-gray-800 rounded-3xl p-6 shadow-2xl border border-white/40 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
                    Hybrid Fulfillment Selector
                  </span>
                  <h2 className="text-lg font-extrabold text-gray-900">
                    How would you like your order?
                  </h2>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-1 rounded-full">
                  Live Inventory
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('delivery')}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    fulfillmentMode === 'delivery'
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2.5">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-sm text-gray-900">Home Delivery</div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Same-day delivery in 2 hrs • Free above ₹500
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentMode('pickup')}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    fulfillmentMode === 'pickup'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2.5">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-sm text-gray-900">Store Pickup</div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Ready in {selectedStore.pickup_ready_mins} mins • ₹0 Delivery Fee
                  </p>
                </button>
              </div>

              {/* Active Store Info Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">
                    Selected Pharmacy Hub
                  </span>
                  <Link to="/stores" className="text-xs font-bold text-blue-600 hover:underline">
                    Change Store →
                  </Link>
                </div>
                <div className="font-bold text-sm text-gray-900">{selectedStore.store_name}</div>
                <p className="text-xs text-gray-600">{selectedStore.address}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                    ⚡ Ready in {selectedStore.pickup_ready_mins} mins
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
                    👨‍⚕️ {selectedStore.pharmacist_name.split('(')[0]}
                  </span>
                </div>
              </div>

              {/* Quick WhatsApp Prescription Banner */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Have a Doctor's Prescription?</span>
                  </div>
                  <p className="text-emerald-800 mt-0.5">
                    Upload photo/PDF or send on WhatsApp. Verified in 15 mins!
                  </p>
                </div>
                <Link
                  to="/prescriptions"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shrink-0 shadow-sm transition"
                >
                  Upload Rx
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Browse Department
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Shop by Category</h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {categories.map(cat => {
            const IconComp = categoryIconMap[cat.icon] || Pill;
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-blue-500 hover:shadow-md transition text-center flex flex-col items-center group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border transition group-hover:scale-110 ${cat.color}`}
                >
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-blue-600 leading-snug">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-gray-400 mt-1">{cat.count}+ items</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Catalog Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
              100% Genuine &amp; Batch Verified
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Popular Medicines &amp; Healthcare Essentials
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Essentials' },
              { id: 'chronic', label: 'Diabetes & Heart (Rx)' },
              { id: 'otc', label: 'OTC & Immunity' },
              { id: 'devices', label: 'Devices (BP / Glucometer)' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-600 font-bold px-6 py-3 rounded-xl text-sm transition"
          >
            <span>Browse Complete Medicine Catalog ({products.length} Products)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* How It Works (3 Steps) & Hybrid Comparison */}
      <section className="bg-white border-y border-gray-200 py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Simple 3-Step Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              How MediShop Hybrid Works
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Designed for speed, safety, and zero password hassle — everything runs seamlessly with your WhatsApp number.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-gray-200 relative">
              <span className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-base mb-4">
                1
              </span>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">
                Search Medicines or Upload Rx
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Search by brand name or generic salt (e.g., Metformin, Telmisartan), check live stock across 5 physical stores, and upload your prescription if required.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-gray-200 relative">
              <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-base mb-4">
                2
              </span>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">
                Instant WhatsApp OTP Login
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No email or password needed. Enter your 10-digit WhatsApp number at checkout, verify the 6-digit OTP, and our licensed pharmacist verifies your Rx in 15 mins.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-gray-200 relative">
              <span className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-base mb-4">
                3
              </span>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">
                Home Delivery or 30-Min Pickup
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Get same-day express home delivery with live rider tracking, OR pick up directly from the store counter in 30 minutes with ₹0 delivery charges.
              </p>
            </div>
          </div>

          {/* Hybrid Model Side-by-Side Comparison */}
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase text-blue-700">Option 1</span>
                  <h3 className="text-xl font-extrabold text-gray-900">Express Home Delivery</h3>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Same-day delivery within 2 hours across the city</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>2°C–8°C insulated cold-chain box for Insulin &amp; biologics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Live WhatsApp tracking + delivery partner contact details</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>FREE delivery on orders above ₹500 (₹35 standard fee)</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  setFulfillmentMode('delivery');
                  navigate('/products');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition"
              >
                Order with Home Delivery →
              </button>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase text-emerald-700">Option 2</span>
                  <h3 className="text-xl font-extrabold text-gray-900">30-Minute Store Pickup</h3>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ready in 20–30 minutes at your nearest MediShop store</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero delivery charges — save 100% on shipping fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant "🎉 Order Ready for Pickup" notification on WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pay online via UPI or pay directly at the pharmacy counter</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  setFulfillmentMode('pickup');
                  navigate('/stores');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition"
              >
                Select Store for Pickup →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Store Locator Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
              5 Physical Pharmacy Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Our Hybrid Stores Near You
            </h2>
          </div>
          <Link
            to="/stores"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Open Interactive Store Map &amp; GPS Finder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {stores.slice(0, 3).map(st => {
            const isSelected = Number(st.id) === Number(selectedStore.id);
            return (
              <div
                key={st.id}
                className={`bg-white rounded-2xl p-5 border-2 transition flex flex-col justify-between ${
                  isSelected ? 'border-emerald-500 shadow-md' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-base text-gray-900">{st.store_name}</h3>
                    {st.is_24x7 && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                        24x7 OPEN
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{st.address}</p>
                  <div className="space-y-1 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        {st.opening_time} – {st.closing_time} • Ready in{' '}
                        <strong>{st.pickup_ready_mins} mins</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{st.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStoreId(st.id);
                      setFulfillmentMode('pickup');
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-700'
                    }`}
                  >
                    {isSelected ? '✓ Selected for Pickup' : 'Select for Pickup'}
                  </button>
                  <Link
                    to="/stores"
                    className="py-2 px-3 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100"
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
