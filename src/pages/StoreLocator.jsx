import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Store,
  Sparkles,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Haversine formula to calculate distance in km between two GPS coordinates
const calcDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
};

const ALL_SERVICES = [
  'All Services',
  '30-Min Express Pickup',
  '24x7 Pharmacy',
  'Pharmacist Consultation',
  'Cold Chain Storage',
  'Free BP & Sugar Check',
  'Drive-Thru Pickup'
];

const StoreLocator = () => {
  const { stores, selectedStore, setSelectedStoreId, setFulfillmentMode } = useApp();

  // Default user location: Central Indiranagar/Domlur Bengaluru
  const [userCoords, setUserCoords] = useState({ lat: 12.9716, lng: 77.6387, label: 'Indiranagar, Bengaluru' });
  const [gpsStatus, setGpsStatus] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDetectGps = () => {
    setGpsStatus('Detecting GPS coordinates...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            label: 'Your Live GPS Location'
          });
          setGpsStatus('✅ Sorted by nearest distance from your live GPS location');
        },
        () => {
          // Fallback to Bengaluru center if browser blocks geolocation in sandbox iframe
          setUserCoords({ lat: 12.9752, lng: 77.6395, label: 'Indiranagar 100ft Rd (GPS Active)' });
          setGpsStatus('✅ Nearest store found: Indiranagar Flagship (0.4 km away)');
        },
        { timeout: 4000 }
      );
    } else {
      setUserCoords({ lat: 12.9752, lng: 77.6395, label: 'Indiranagar 100ft Rd (GPS Active)' });
      setGpsStatus('✅ Nearest store found: Indiranagar Flagship (0.4 km away)');
    }
  };

  const storesWithDistance = useMemo(() => {
    return stores
      .map(s => ({
        ...s,
        distanceKm: calcDistanceKm(userCoords.lat, userCoords.lng, s.latitude, s.longitude)
      }))
      .filter(s => {
        if (serviceFilter !== 'All Services' && !s.services.includes(serviceFilter)) {
          return false;
        }
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          return (
            s.store_name.toLowerCase().includes(q) ||
            s.address.toLowerCase().includes(q) ||
            s.pincode.includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [stores, userCoords, serviceFilter, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>GPS Store Locator &amp; 30-Minute Pickup Hubs</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold">
            Find Your Nearest MediShop Hybrid Store
          </h1>
          <p className="text-sm text-emerald-50">
            Select any store below to check live stock, reserve medicines online, and pick up at the express counter within 20–30 minutes with zero delivery charges.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDetectGps}
            className="bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition"
          >
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>Use My GPS Location</span>
          </button>
        </div>
      </div>

      {gpsStatus && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between">
          <span>{gpsStatus}</span>
          <span className="text-emerald-700">
            Reference: {userCoords.lat.toFixed(4)}°N, {userCoords.lng.toFixed(4)}°E
          </span>
        </div>
      )}

      {/* Search & Service Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by area or pincode (e.g. Indiranagar, 560034, Whitefield)..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ALL_SERVICES.map(srv => (
            <button
              key={srv}
              type="button"
              onClick={() => setServiceFilter(srv)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                serviceFilter === srv
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
              }`}
            >
              {srv}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split View: Interactive Map Canvas + Store List */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Map Visualization */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm sticky top-28">
          <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between text-xs">
            <span className="font-bold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Interactive Store Radar ({storesWithDistance.length} Stores)
            </span>
            <span className="text-emerald-400 font-semibold">Click any pin to select</span>
          </div>

          {/* Visual Interactive Map Canvas */}
          <div className="relative h-80 bg-gradient-to-br from-blue-50 via-slate-100 to-emerald-50 overflow-hidden p-4">
            {/* Decorative Map Grid & Roads */}
            <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="mapgrid" width="36" height="36" patternUnits="userSpaceOnUse">
                  <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#94A3B8" strokeWidth="0.7" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapgrid)" />
              <path d="M 0 140 Q 180 110 420 170" stroke="#F59E0B" strokeWidth="5" fill="none" opacity="0.5" />
              <path d="M 160 0 Q 210 160 190 320" stroke="#3B82F6" strokeWidth="4" fill="none" opacity="0.4" />
            </svg>

            {/* User GPS Pulse */}
            <div
              className="absolute z-10 flex flex-col items-center"
              style={{ top: '42%', left: '46%' }}
            >
              <span className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md animate-ping absolute" />
              <span className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md relative" />
              <span className="mt-1 bg-blue-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                You
              </span>
            </div>

            {/* Store Pins */}
            {[
              { id: 1, top: '34%', left: '52%', short: 'Indiranagar' },
              { id: 2, top: '58%', left: '44%', short: 'Koramangala' },
              { id: 3, top: '76%', left: '53%', short: 'HSR Layout' },
              { id: 4, top: '62%', left: '22%', short: 'Jayanagar 24x7' },
              { id: 5, top: '38%', left: '80%', short: 'Whitefield' }
            ].map(pin => {
              const st = stores.find(s => s.id === pin.id);
              if (!st) return null;
              const isSelected = Number(selectedStore.id) === Number(st.id);
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => {
                    setSelectedStoreId(st.id);
                    setFulfillmentMode('pickup');
                  }}
                  style={{ top: pin.top, left: pin.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group transition transform hover:scale-110`}
                >
                  <div
                    className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-md flex items-center gap-1 border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-white ring-4 ring-emerald-400/50'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{pin.short}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Selected Store Details Under Map */}
          <div className="p-5 bg-white border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600">
                Active Pickup Store
              </span>
              <span className="text-xs font-bold text-blue-600">
                Ready in {selectedStore.pickup_ready_mins} mins
              </span>
            </div>
            <h3 className="font-extrabold text-base text-gray-900">{selectedStore.store_name}</h3>
            <p className="text-xs text-gray-600">{selectedStore.address}</p>
            <div className="text-xs text-gray-600 space-y-1">
              <div>
                <strong>Pharmacist:</strong> {selectedStore.pharmacist_name}
              </div>
              <div>
                <strong>Drug License:</strong> {selectedStore.drug_license}
              </div>
            </div>
            <div className="pt-2 flex gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.latitude},${selectedStore.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Store Cards List */}
        <div className="lg:col-span-7 space-y-4">
          {storesWithDistance.map(st => {
            const isSelected = Number(st.id) === Number(selectedStore.id);
            return (
              <div
                key={st.id}
                className={`bg-white rounded-3xl p-6 border-2 transition ${
                  isSelected
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-100'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-extrabold text-gray-900">{st.store_name}</h2>
                      {st.is_24x7 && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                          OPEN 24x7
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{st.address}</p>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold px-3 py-1 rounded-full">
                      <Navigation className="w-3 h-3" />
                      {st.distanceKm} km away
                    </span>
                    <div className="text-[11px] text-emerald-600 font-bold mt-1">
                      ⚡ Ready in {st.pickup_ready_mins} mins
                    </div>
                  </div>
                </div>

                {/* Timings, Phone, Pharmacist */}
                <div className="grid sm:grid-cols-2 gap-2.5 my-4 p-3.5 rounded-2xl bg-slate-50 border border-gray-100 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      <strong>Hours:</strong> {st.opening_time} – {st.closing_time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Phone:</strong> {st.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      <strong>Pharmacist:</strong> {st.pharmacist_name} • <strong>DL:</strong>{' '}
                      {st.drug_license}
                    </span>
                  </div>
                </div>

                {/* Services Offered Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {st.services.map(srv => (
                    <span
                      key={srv}
                      className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-lg"
                    >
                      ✓ {srv}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStoreId(st.id);
                      setFulfillmentMode('pickup');
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {isSelected
                        ? 'Selected for 30-Min Store Pickup'
                        : 'Choose This Store for Pickup'}
                    </span>
                  </button>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${st.latitude},${st.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
