import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Truck,
  Store,
  FileText,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Cart = () => {
  const {
    user,
    requireLogin,
    detailedCart,
    cartCount,
    cartSubtotal,
    cartMrpTotal,
    cartSavings,
    cartRequiresPrescription,
    deliveryFee,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    fulfillmentMode,
    setFulfillmentMode,
    selectedStore,
    addToCart
  } = useApp();

  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      requireLogin(() => {
        navigate('/checkout');
      });
    }
  };

  if (detailedCart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Your Medicine Cart is Empty
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Browse our catalog of genuine batch-verified medicines or quickly load a sample prescription/OTC cart below.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition"
          >
            Browse Medicines Catalog
          </Link>
          <button
            type="button"
            onClick={() => {
              addToCart(1, 2);
              addToCart(2, 1);
            }}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm px-5 py-3 rounded-xl transition"
          >
            + Load Sample Cart (Metformin + Vitamin C)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
            Hybrid Pharmacy Checkout Flow
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Shopping Cart ({cartCount} {cartCount === 1 ? 'Pack' : 'Packs'})
          </h1>
        </div>
        <Link to="/products" className="text-xs sm:text-sm font-bold text-blue-600 hover:underline">
          + Add More Medicines
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Cart Items & Fulfillment Mode */}
        <div className="lg:col-span-8 space-y-5">
          {/* Hybrid Fulfillment Switcher Card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-3">
              Choose How You Want to Receive Your Order
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfillmentMode('delivery')}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition ${
                  fulfillmentMode === 'delivery'
                    ? 'border-blue-600 bg-blue-50/60'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm text-gray-900">
                    Home Delivery (Same-Day)
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {cartSubtotal >= 500
                      ? 'FREE Delivery unlocked (Order ≥ ₹500)'
                      : '₹35 Delivery Fee (Free above ₹500)'}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentMode('pickup')}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition ${
                  fulfillmentMode === 'pickup'
                    ? 'border-emerald-600 bg-emerald-50/60'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm text-gray-900">
                    Store Pickup (Ready in {selectedStore.pickup_ready_mins}m)
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    ₹0 Delivery Fee at {selectedStore.store_name.replace('MediShop Hybrid - ', '')}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Prescription Required Notice */}
          {cartRequiresPrescription && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <FileText className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950">
                <strong className="font-extrabold block">
                  Schedule H Prescription Medicine in Cart
                </strong>
                <span>
                  One or more items require a doctor's prescription. In the next step, you can select a saved prescription, upload a photo/PDF, or send it via WhatsApp.
                </span>
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="space-y-3">
            {detailedCart.map(item => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="w-20 h-20 rounded-xl bg-slate-50 border border-gray-100 p-1.5 shrink-0"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to={`/products/${item.product.id}`}
                        className="font-extrabold text-base text-gray-900 hover:text-blue-600"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.prescription_required ? (
                        <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Rx Required
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          OTC
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Salt: {item.product.generic_name}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {item.product.pack_size} • {item.storeStock} in stock at{' '}
                      {selectedStore.store_name.replace('MediShop Hybrid - ', '')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-2 hover:bg-gray-200 text-gray-700"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-extrabold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-200 text-gray-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Price */}
                  <div className="text-right min-w-[80px]">
                    <div className="font-extrabold text-base text-gray-900">
                      ₹{item.lineTotal.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400 line-through">
                      ₹{item.lineMrp.toFixed(2)}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Bill Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-5 sticky top-28">
            <h2 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-3">
              Order Bill Summary
            </h2>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Total MRP ({cartCount} items)</span>
                <span>₹{cartMrpTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>MediShop Discount</span>
                <span>- ₹{cartSavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">₹{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>
                  {fulfillmentMode === 'pickup'
                    ? 'Store Pickup Fee (30m Ready)'
                    : 'Home Delivery Charges'}
                </span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-600 font-extrabold">FREE (₹0)</span>
                ) : (
                  <span className="font-semibold text-gray-900">₹{deliveryFee.toFixed(2)}</span>
                )}
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="font-extrabold text-base text-gray-900">Total Payable</span>
                <span className="font-extrabold text-2xl text-blue-600">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                You are saving ₹{(cartSavings + (fulfillmentMode === 'pickup' ? 35 : 0)).toFixed(2)} on this order!
              </span>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm transition"
            >
              {user ? (
                <>
                  <span>Proceed to Hybrid Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" />
                  <span>Login with WhatsApp OTP to Checkout</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-gray-500 flex items-center gap-2 pt-1">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                100% Genuine Medicines • Live WhatsApp Order Updates
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
