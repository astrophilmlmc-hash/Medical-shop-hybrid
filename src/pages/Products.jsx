import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, Store, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products, categories, selectedStore } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [rxFilter, setRxFilter] = useState('all'); // 'all' | 'rx' | 'otc'
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState('popular');
  const [onlySelectedStoreStock, setOnlySelectedStoreStock] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const brands = useMemo(() => {
    const set = new Set(products.map(p => p.brand));
    return ['all', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.generic_name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q) ||
          p.manufacturer.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      list = list.filter(p => String(p.category_id) === String(selectedCategory));
    }

    if (selectedBrand !== 'all') {
      list = list.filter(p => p.brand === selectedBrand);
    }

    if (rxFilter === 'rx') {
      list = list.filter(p => p.prescription_required);
    } else if (rxFilter === 'otc') {
      list = list.filter(p => !p.prescription_required);
    }

    list = list.filter(p => p.selling_price <= maxPrice);

    if (onlySelectedStoreStock) {
      list = list.filter(p =>
        p.inventory.some(
          inv => Number(inv.store_id) === Number(selectedStore.id) && inv.quantity > 0
        )
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.selling_price - b.selling_price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.selling_price - a.selling_price);
    } else if (sortBy === 'discount') {
      list.sort(
        (a, b) =>
          (b.mrp - b.selling_price) / b.mrp - (a.mrp - a.selling_price) / a.mrp
      );
    }

    return list;
  }, [
    products,
    search,
    selectedCategory,
    selectedBrand,
    rxFilter,
    maxPrice,
    sortBy,
    onlySelectedStoreStock,
    selectedStore
  ]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setRxFilter('all');
    setMaxPrice(2500);
    setSortBy('popular');
    setOnlySelectedStoreStock(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Batch &amp; Expiry Verified Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Medicines &amp; Healthcare Catalog
          </h1>
          <p className="text-sm text-blue-50 mt-1">
            Search by brand name or generic salt composition. Available for same-day delivery or{' '}
            {selectedStore.pickup_ready_mins}-minute pickup at {selectedStore.store_name}.
          </p>
        </div>

        {/* Search Input inside Catalog Header */}
        <div className="w-full md:w-96 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by name or generic salt..."
            className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5 sticky top-28">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-sm text-gray-900">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                Category
              </label>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-100 text-gray-700'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(String(cat.id))}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex justify-between ${
                      String(selectedCategory) === String(cat.id)
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-slate-100 text-gray-700'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span>
                      {products.filter(p => Number(p.category_id) === Number(cat.id)).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prescription Type */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                Prescription Type
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'otc', label: 'OTC Only' },
                  { id: 'rx', label: 'Schedule H' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRxFilter(opt.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                      rxFilter === opt.id
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {brands.map(b => (
                  <option key={b} value={b}>
                    {b === 'all' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-extrabold uppercase tracking-wider text-gray-500">
                  Max Price
                </span>
                <span className="font-extrabold text-blue-600">Up to ₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min={30}
                max={2500}
                step={20}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>₹30</span>
                <span>₹1,200</span>
                <span>₹2,500</span>
              </div>
            </div>

            {/* Store Pickup Ready Toggle */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 cursor-pointer">
              <input
                type="checkbox"
                checked={onlySelectedStoreStock}
                onChange={(e) => setOnlySelectedStoreStock(e.target.checked)}
                className="mt-0.5 accent-emerald-600 rounded"
              />
              <span className="text-xs text-emerald-950 font-semibold leading-snug">
                Ready in {selectedStore.pickup_ready_mins} mins at{' '}
                <span className="underline">{selectedStore.store_name.replace('MediShop Hybrid - ', '')}</span>
              </span>
            </label>
          </div>
        </aside>

        {/* Main Products Grid */}
        <div className="lg:col-span-9 space-y-5">
          {/* Sort & Count Bar */}
          <div className="bg-white rounded-2xl border border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-gray-600">
              Showing <strong className="text-gray-900">{filteredProducts.length}</strong> medicines
              {search && (
                <span>
                  {' '}
                  for "<strong className="text-blue-600">{search}</strong>"
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-gray-300 rounded-xl font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Popularity &amp; Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Highest Discount %</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-3">
              <p className="text-lg font-extrabold text-gray-800">
                No medicines matched your current filters
              </p>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Try clearing your filters or searching by generic salt composition (e.g., Metformin, Paracetamol, Telmisartan, Vitamin C).
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
