import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Truck,
  Store,
  MapPin,
  FileText,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Plus,
  MessageSquare,
  Upload,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Checkout = () => {
  const {
    user,
    setLoginModalOpen,
    fulfillmentMode,
    setFulfillmentMode,
    stores,
    selectedStore,
    setSelectedStoreId,
    addresses,
    addAddress,
    prescriptions,
    detailedCart,
    cartSubtotal,
    cartRequiresPrescription,
    deliveryFee,
    cartTotal,
    placeHybridOrder
  } = useApp();

  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || 1);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    address_line1: '',
    address_line2: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    phone: user?.whatsapp_number || '9876543210'
  });

  const [deliverySlot, setDeliverySlot] = useState('Same-Day Express (Within 2 Hours)');
  const [pickupSlot, setPickupSlot] = useState(
    `Express Pickup in ${selectedStore.pickup_ready_mins} Minutes`
  );

  // Prescription Selection State
  const [rxMode, setRxMode] = useState('saved'); // 'saved' | 'upload' | 'whatsapp'
  const [selectedRxId, setSelectedRxId] = useState(prescriptions[0]?.id || 101);
  const [newRxDoctor, setNewRxDoctor] = useState('Dr. Rajeshwari Menon');
  const [newRxPatient, setNewRxPatient] = useState(user?.name || 'Jyotiraditya Bose');
  const [newRxPreview, setNewRxPreview] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('UPI (PhonePe / GPay / Razorpay)');
  const [submitting, setSubmitting] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewRxPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddress.address_line1.trim()) return;
    const created = addAddress(newAddress);
    setSelectedAddressId(created.id);
    setShowNewAddressForm(false);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    setSubmitting(true);
    try {
      const chosenAddr =
        addresses.find(a => Number(a.id) === Number(selectedAddressId)) || addresses[0];
      const fullAddressStr = chosenAddr
        ? `${chosenAddr.address_line1}, ${chosenAddr.address_line2 ? chosenAddr.address_line2 + ', ' : ''}${chosenAddr.city} - ${chosenAddr.pincode}`
        : 'Flat 402, Emerald Palms, Indiranagar, Bengaluru - 560038';

      const uploadedRxData =
        cartRequiresPrescription && rxMode !== 'saved'
          ? {
              patient_name: newRxPatient,
              doctor_name: newRxDoctor,
              hospital_name:
                rxMode === 'whatsapp' ? 'Sent via WhatsApp Direct' : 'Uploaded at Checkout',
              image_url: newRxPreview || undefined,
              upload_source: rxMode === 'whatsapp' ? 'WhatsApp' : 'Website'
            }
          : null;

      const createdOrder = await placeHybridOrder({
        order_type: fulfillmentMode,
        store_id: selectedStore.id,
        delivery_address: fullAddressStr,
        delivery_slot: deliverySlot,
        pickup_slot: pickupSlot,
        payment_method: paymentMethod,
        prescription_id: rxMode === 'saved' ? selectedRxId : null,
        uploaded_rx_data: uploadedRxData
      });

      navigate(`/orders/${createdOrder.order_number}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (detailedCart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-14 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-gray-900">Your cart is empty</h2>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-xl"
        >
          Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
          3-Step Fast Hybrid Checkout
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Complete Your Medicine Order
        </h1>
      </div>

      {/* Prompt WhatsApp Login Banner if Guest */}
      {!user && (
        <div className="mb-6 bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm">
              <strong className="font-extrabold text-emerald-950 block">
                WhatsApp OTP Verification Required to Place Order
              </strong>
              <span className="text-emerald-800">
                Verify your 10-digit WhatsApp number to receive instant order &amp; prescription updates.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLoginModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
          >
            Verify WhatsApp OTP Now
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: Fulfillment Mode (Home Delivery vs Store Pickup) */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center">
                1
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">
                  Choose Delivery or 30-Minute Store Pickup
                </h2>
                <p className="text-xs text-gray-500">
                  Switch anytime before placing your order
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => {
                  setFulfillmentMode('delivery');
                  if (paymentMethod === 'Pay at Store Counter') {
                    setPaymentMethod('UPI (PhonePe / GPay / Razorpay)');
                  }
                }}
                className={`p-4 rounded-2xl border-2 text-left transition ${
                  fulfillmentMode === 'delivery'
                    ? 'border-blue-600 bg-blue-50/60 shadow-sm'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    Home Delivery
                  </span>
                  <span className="text-xs font-bold text-blue-700">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Same-day express doorstep delivery with real-time rider tracking.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentMode('pickup')}
                className={`p-4 rounded-2xl border-2 text-left transition ${
                  fulfillmentMode === 'pickup'
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-sm'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                    <Store className="w-4 h-4 text-emerald-600" />
                    Store Pickup (30 Mins)
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    FREE • ₹0
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Skip the queue! Ready in {selectedStore.pickup_ready_mins} mins at nearest MediShop store.
                </p>
              </button>
            </div>

            {/* Conditional Details based on Delivery vs Store Pickup */}
            {fulfillmentMode === 'delivery' ? (
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                    Select Delivery Address
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add New Address
                  </button>
                </div>

                {showNewAddressForm && (
                  <form
                    onSubmit={handleSaveNewAddress}
                    className="bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-3"
                  >
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Flat / House No. / Building *"
                        value={newAddress.address_line1}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, address_line1: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Street / Landmark / Area"
                        value={newAddress.address_line2}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, address_line2: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-xl text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                    >
                      Save &amp; Use Address
                    </button>
                  </form>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                        Number(selectedAddressId) === Number(addr.id)
                          ? 'border-blue-600 bg-blue-50/40'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          {addr.label || 'Address'}
                        </span>
                        {Number(selectedAddressId) === Number(addr.id) && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-800 font-medium">{addr.address_line1}</p>
                      <p className="text-xs text-gray-500">
                        {addr.address_line2}, {addr.city} - {addr.pincode}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                    Delivery Speed Slot
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {[
                      'Same-Day Express (Within 2 Hours)',
                      'Evening Slot (Today, 6:00 PM – 8:00 PM)'
                    ].map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setDeliverySlot(slot)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center gap-2 ${
                          deliverySlot === slot
                            ? 'border-blue-600 bg-blue-50 text-blue-800'
                            : 'border-gray-200 text-gray-700'
                        }`}
                      >
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                  Select Nearest MediShop Hybrid Store for Pickup
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {stores.map(st => (
                    <div
                      key={st.id}
                      onClick={() => {
                        setSelectedStoreId(st.id);
                        setPickupSlot(`Express Pickup in ${st.pickup_ready_mins} Minutes`);
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                        Number(selectedStore.id) === Number(st.id)
                          ? 'border-emerald-600 bg-emerald-50/50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-gray-900">{st.store_name}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded shrink-0">
                          {st.pickup_ready_mins}m Ready
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">{st.address}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                    Choose Pickup Time
                  </label>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {[
                      `Express Pickup in ${selectedStore.pickup_ready_mins} Minutes`,
                      'Today, Within 2 Hours',
                      'Evening After 6:00 PM'
                    ].map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPickupSlot(slot)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left ${
                          pickupSlot === slot
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-gray-200 text-gray-700'
                        }`}
                      >
                        ⚡ {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Prescription Upload / Selection (Shown prominently if cart has Rx items) */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center">
                  2
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900">
                    Prescription Verification
                  </h2>
                  <p className="text-xs text-gray-500">
                    {cartRequiresPrescription
                      ? 'Required for Schedule H medicines in your cart'
                      : 'Optional — All items in your cart are OTC (No Prescription Required)'}
                  </p>
                </div>
              </div>
              {cartRequiresPrescription ? (
                <span className="bg-red-100 text-red-700 text-xs font-extrabold px-3 py-1 rounded-full">
                  Rx Mandatory
                </span>
              ) : (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full">
                  OTC Order ✓
                </span>
              )}
            </div>

            {cartRequiresPrescription && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'saved', label: 'Use Saved Verified Rx' },
                    { id: 'upload', label: 'Upload Photo / PDF' },
                    { id: 'whatsapp', label: 'Send via WhatsApp' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRxMode(opt.id)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold transition ${
                        rxMode === opt.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {rxMode === 'saved' && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {prescriptions.map(rx => (
                      <div
                        key={rx.id}
                        onClick={() => setSelectedRxId(rx.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 ${
                          Number(selectedRxId) === Number(rx.id)
                            ? 'border-emerald-600 bg-emerald-50/40'
                            : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={rx.image_url}
                          alt="Rx"
                          className="w-12 h-14 object-cover rounded-lg border border-gray-200 shrink-0"
                        />
                        <div className="text-xs min-w-0">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              rx.verification_status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {rx.verification_status}
                          </span>
                          <div className="font-bold text-gray-900 truncate mt-1">
                            {rx.doctor_name}
                          </div>
                          <div className="text-gray-500 truncate">Patient: {rx.patient_name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {rxMode === 'upload' && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-emerald-400 space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newRxPatient}
                        onChange={(e) => setNewRxPatient(e.target.value)}
                        placeholder="Patient Name"
                        className="px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white"
                      />
                      <input
                        type="text"
                        value={newRxDoctor}
                        onChange={(e) => setNewRxDoctor(e.target.value)}
                        placeholder="Prescribing Doctor Name"
                        className="px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white"
                      />
                    </div>
                    <label className="flex items-center justify-center gap-2 py-4 px-4 bg-white rounded-xl border border-gray-200 cursor-pointer hover:bg-emerald-50 text-xs font-bold text-emerald-700">
                      <Upload className="w-4 h-4" />
                      <span>
                        {newRxPreview
                          ? '✓ Prescription Image Attached (Click to change)'
                          : 'Select Prescription Photo (JPG/PNG) or PDF'}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {rxMode === 'whatsapp' && (
                  <div className="bg-[#DCF8C6]/60 border border-emerald-300 rounded-2xl p-4 text-xs text-emerald-950">
                    <strong className="font-extrabold block mb-1">
                      📱 Instant WhatsApp Prescription Verification
                    </strong>
                    <span>
                      We will send you a WhatsApp message immediately after order placement. Simply reply with a photo of your prescription — our pharmacist will verify it within 15 minutes!
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP 3: Payment Method Selection */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center">
                3
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">Select Payment Method</h2>
                <p className="text-xs text-gray-500">
                  Pay online via Razorpay/UPI or pay on collection
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'UPI (PhonePe / GPay / Razorpay)',
                  title: 'UPI Instant Pay (PhonePe / GPay / Paytm)',
                  desc: 'Zero transaction fee • Instant confirmation'
                },
                {
                  id: 'Credit / Debit Card (Razorpay)',
                  title: 'Credit / Debit Card / NetBanking',
                  desc: 'Visa, MasterCard, RuPay • 256-bit SSL secured'
                },
                ...(fulfillmentMode === 'pickup'
                  ? [
                      {
                        id: 'Pay at Store Counter',
                        title: 'Pay at Store Counter (Cash / UPI)',
                        desc: 'Pay when collecting your medicines in 30 mins'
                      }
                    ]
                  : [
                      {
                        id: 'Cash on Delivery',
                        title: 'Cash / UPI on Delivery',
                        desc: 'Pay at your doorstep upon receiving order'
                      }
                    ])
              ].map(method => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === method.id
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900">
                      {method.title}
                    </span>
                    {paymentMethod === method.id && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{method.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Order Summary & Place Order CTA */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-5 sticky top-28">
            <h3 className="font-extrabold text-lg text-gray-900 border-b border-gray-100 pb-3">
              Final Order Summary
            </h3>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {detailedCart.map(item => (
                <div key={item.product.id} className="flex justify-between text-xs">
                  <span className="text-gray-700 font-medium truncate max-w-[190px]">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-bold text-gray-900">₹{item.lineTotal.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Fulfillment Mode</span>
                <span className="font-bold text-gray-900">
                  {fulfillmentMode === 'pickup' ? '🏪 30-Min Store Pickup' : '🚚 Home Delivery'}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Pharmacy Hub</span>
                <span className="font-semibold text-gray-800 truncate max-w-[170px]">
                  {selectedStore.store_name.replace('MediShop Hybrid - ', '')}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span className="font-bold text-emerald-600">
                  {deliveryFee === 0 ? 'FREE (₹0)' : `₹${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-gray-200">
                <span className="font-extrabold text-base text-gray-900">Total Amount</span>
                <span className="font-extrabold text-2xl text-blue-600">
                  ₹{(fulfillmentMode === 'pickup' ? cartSubtotal : cartTotal).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={handlePlaceOrder}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm transition"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {submitting
                  ? 'Placing Order & Sending WhatsApp...'
                  : `Place Hybrid Order (₹${(fulfillmentMode === 'pickup' ? cartSubtotal : cartTotal).toFixed(2)})`}
              </span>
            </button>

            <p className="text-[11px] text-gray-500 text-center">
              You will immediately receive a WhatsApp confirmation message with live order tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
