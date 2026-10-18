import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Store,
  Truck,
  FileText,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Plus,
  Minus,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    stores,
    selectedStore,
    setSelectedStoreId,
    setFulfillmentMode,
    addToCart,
    cart,
    updateCartQuantity
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');

  const product = products.find(p => Number(p.id) === Number(id)) || products[0];
  const cartItem = cart.find(c => Number(c.productId) === Number(product.id));
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const discountPct = Math.round(((product.mrp - product.selling_price) / product.mrp) * 100);
  const selectedStoreInv =
    product.inventory.find(i => Number(i.store_id) === Number(selectedStore.id)) ||
    product.inventory[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Medicines</span>
        </button>
        <div className="text-xs text-gray-400">
          <Link to="/" className="hover:underline">Home</Link> /{' '}
          <Link to="/products" className="hover:underline">Catalog</Link> /{' '}
          <span className="text-gray-700 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 grid lg:grid-cols-12 gap-8 shadow-sm">
        {/* Left Image Column */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full">
              SAVE {discountPct}%
            </span>
            {product.prescription_required ? (
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                {product.schedule_type} • Prescription Required
              </span>
            ) : (
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                OTC • No Prescription Required
              </span>
            )}
          </div>

          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-contain my-4"
          />

          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 pt-4 border-t border-gray-200">
            <div className="bg-white p-2.5 rounded-xl border border-gray-200">
              <span className="text-gray-400 block">Batch Number</span>
              <strong className="text-gray-900">{selectedStoreInv.batch_number}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-200">
              <span className="text-gray-400 block">Expiry Date</span>
              <strong className="text-emerald-700">{selectedStoreInv.expiry_date}</strong>
            </div>
          </div>
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <span>{product.category_name}</span>
              <span>•</span>
              <span className="text-gray-500">{product.manufacturer}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              {product.name}
            </h1>
            <p className="text-sm font-semibold text-blue-700 bg-blue-50 inline-block px-3 py-1 rounded-lg mt-2 border border-blue-100">
              Generic Salt: {product.generic_name}
            </p>
            <p className="text-xs text-gray-500 mt-1.5">Pack Size: {product.pack_size}</p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold text-gray-900">
                  ₹{product.selling_price}
                </span>
                <span className="text-sm text-gray-400 line-through">MRP ₹{product.mrp}</span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  You Save ₹{(product.mrp - product.selling_price).toFixed(2)} ({discountPct}%)
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Inclusive of all GST • Authentic manufacturer-sealed strip
              </p>
            </div>

            {/* Add to Cart / Quantity Controls */}
            <div className="flex items-center gap-3">
              {qtyInCart > 0 ? (
                <div className="flex items-center bg-blue-600 text-white rounded-xl overflow-hidden shadow-md">
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(product.id, qtyInCart - 1)}
                    className="px-3.5 py-3 hover:bg-blue-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-extrabold text-sm">{qtyInCart} in Cart</span>
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(product.id, qtyInCart + 1)}
                    className="px-3.5 py-3 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCart(product.id, 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md flex items-center gap-2 transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              )}

              <Link
                to="/cart"
                onClick={() => {
                  if (qtyInCart === 0) addToCart(product.id, 1);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-5 py-3.5 rounded-xl shadow-md transition"
              >
                Buy Now
              </Link>
            </div>
          </div>

          {/* Prescription Requirement Alert if Schedule H */}
          {product.prescription_required && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <FileText className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950">
                <strong className="font-extrabold block">
                  {product.schedule_type} Prescription Medicine
                </strong>
                <span>
                  A valid doctor's prescription is required at checkout (or via WhatsApp). Our registered pharmacist verifies prescriptions within 15–30 minutes.
                </span>
              </div>
            </div>
          )}

          {/* Hybrid Fulfillment Summary */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-gray-900 block">Same-Day Home Delivery</strong>
                <span className="text-gray-600">
                  Delivered in 2 hours • Free delivery on orders above ₹500
                </span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-3">
              <Store className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-gray-900 block">
                  Store Pickup ({selectedStoreInv.quantity} Strips in Stock)
                </strong>
                <span className="text-gray-600">
                  Ready in {selectedStore.pickup_ready_mins} mins at{' '}
                  {selectedStore.store_name.replace('MediShop Hybrid - ', '')} • ₹0 Fee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Stock Availability by Store & Generic Alternatives */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Store-by-Store Inventory Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                Real-Time Pharmacy Inventory
              </span>
              <h2 className="text-xl font-extrabold text-gray-900">
                Stock Availability Across Our 5 Hybrid Stores
              </h2>
            </div>
            <Link to="/stores" className="text-xs font-bold text-blue-600 hover:underline">
              Open Store Map →
            </Link>
          </div>

          <div className="space-y-3">
            {stores.map(st => {
              const inv = product.inventory.find(i => Number(i.store_id) === Number(st.id)) || {
                quantity: 20,
                batch_number: 'MS-2026',
                expiry_date: '2028-06-30'
              };
              const isSelected = Number(st.id) === Number(selectedStore.id);
              return (
                <div
                  key={st.id}
                  className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/40'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold text-sm text-gray-900">{st.store_name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 pl-6">
                      Batch: {inv.batch_number} • Exp: {inv.expiry_date} • Ready in{' '}
                      <strong>{st.pickup_ready_mins} mins</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      {inv.quantity} Packs Available
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStoreId(st.id);
                        setFulfillmentMode('pickup');
                        if (qtyInCart === 0) addToCart(product.id, 1);
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-blue-600 hover:text-white text-gray-800'
                      }`}
                    >
                      {isSelected ? '✓ Selected Store' : 'Pickup Here'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generic Alternatives / Substitutes */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Same Generic Salt Composition
            </span>
            <h2 className="text-xl font-extrabold text-gray-900 mt-0.5">
              Approved Alternative Medicines
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              All alternatives below contain the exact same active ingredient (
              <strong>{product.generic_name}</strong>). Consult your doctor or our pharmacist before switching brands.
            </p>

            <div className="space-y-3">
              {product.alternatives && product.alternatives.length > 0 ? (
                product.alternatives.map((alt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-gray-200 hover:border-blue-400 bg-slate-50 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{alt.name}</h4>
                      <p className="text-xs text-gray-500">By {alt.manufacturer}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-sm text-gray-900">
                        ₹{alt.selling_price.toFixed(2)}
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600">
                        {alt.savings_pct}% cheaper
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">
                  This formulation is already our best-value generic option in this category.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
            <strong className="block font-bold mb-1">
              👨‍⚕️ Need Pharmacist Guidance on Generic Substitutes?
            </strong>
            <span>
              Tap the green "WhatsApp Pharmacist" button at the bottom right to chat directly with{' '}
              {selectedStore.pharmacist_name}.
            </span>
          </div>
        </div>
      </div>

      {/* Clinical Information Tabs (Description, Usage, Side Effects) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-5">
          {[
            { id: 'overview', label: 'Description & Clinical Use' },
            { id: 'dosage', label: 'Dosage & Usage Instructions' },
            { id: 'side_effects', label: 'Side Effects & Safety Warnings' }
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                activeTab === t.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h3 className="font-extrabold text-base text-gray-900">About {product.name}</h3>
            <p>{product.description}</p>
            <p className="text-xs text-gray-500 pt-2">
              <strong>Active Composition:</strong> {product.generic_name} •{' '}
              <strong>Manufactured by:</strong> {product.manufacturer}
            </p>
          </div>
        )}

        {activeTab === 'dosage' && (
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h3 className="font-extrabold text-base text-gray-900">How to Use</h3>
            <p>{product.usage_instructions}</p>
          </div>
        )}

        {activeTab === 'side_effects' && (
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Possible Side Effects &amp; Precautions</span>
            </h3>
            <p>{product.side_effects}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
