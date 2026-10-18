import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Truck,
  Store,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  FileText,
  MessageSquare,
  Sparkles,
  Package,
  Printer,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const OrderTracking = () => {
  const { id } = useParams();
  const { orders, advanceOrderStatus } = useApp();

  const [lookupInput, setLookupInput] = useState(id || '');

  const activeOrder =
    orders.find(
      o =>
        o.order_number.toUpperCase() === String(id || lookupInput).toUpperCase() ||
        String(o.id) === String(id)
    ) || orders[0];

  const isPickup = activeOrder.order_type === 'pickup';
  const nextIncompleteStep = activeOrder.timeline.find(t => !t.completed);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Order Switcher & Search */}
      <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
            Real-Time Hybrid Fulfillment Tracker
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Order #{activeOrder.order_number}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Switch between orders below or simulate live pharmacist &amp; delivery updates on WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {orders.map(o => (
            <Link
              key={o.order_number}
              to={`/orders/${o.order_number}`}
              onClick={() => setLookupInput(o.order_number)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition flex items-center gap-1.5 ${
                o.order_number === activeOrder.order_number
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 text-gray-700 border-gray-200 hover:border-blue-400'
              }`}
            >
              {o.order_type === 'pickup' ? (
                <Store className="w-3.5 h-3.5" />
              ) : (
                <Truck className="w-3.5 h-3.5" />
              )}
              <span>#{o.order_number}</span>
              <span className="opacity-80">({o.order_type === 'pickup' ? 'Pickup' : 'Delivery'})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Interactive WhatsApp Status Simulator Bar */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-400 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm">
            <strong className="font-extrabold text-emerald-950 block">
              Live Journey Simulator (Triggers Real-Time WhatsApp Notification)
            </strong>
            <span className="text-emerald-800">
              {nextIncompleteStep
                ? `Next stage for Order #${activeOrder.order_number}: "${nextIncompleteStep.status}"`
                : `Order #${activeOrder.order_number} has completed all stages!`}
            </span>
          </div>
        </div>

        {nextIncompleteStep && (
          <button
            type="button"
            onClick={() => advanceOrderStatus(activeOrder.order_number, nextIncompleteStep.status)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 shrink-0 transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Advance to "{nextIncompleteStep.status}" + Send WhatsApp</span>
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Timeline & Status */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center ${
                  isPickup ? 'bg-emerald-600' : 'bg-blue-600'
                }`}
              >
                {isPickup ? <Store className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                  {isPickup ? '30-Minute Store Pickup' : 'Express Home Delivery'}
                </span>
                <h2 className="text-xl font-extrabold text-gray-900">
                  Current Status: <span className="text-blue-600">{activeOrder.order_status}</span>
                </h2>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-400 block">Expected By</span>
              <strong className="text-sm font-extrabold text-emerald-700">
                {activeOrder.expected_by}
              </strong>
            </div>
          </div>

          {/* Step-by-Step Timeline */}
          <div className="space-y-6 relative pl-4">
            {activeOrder.timeline.map((step, index) => (
              <div key={index} className="flex items-start gap-4 relative">
                {index < activeOrder.timeline.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-8 w-0.5 h-12 ${
                      step.completed ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    step.completed
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-400 border border-gray-300'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="flex-1 bg-slate-50 rounded-2xl p-3.5 border border-gray-100">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`font-extrabold text-sm ${
                        step.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.status}
                    </h4>
                    <span className="text-xs font-bold text-blue-600">{step.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{step.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Rider / Store Pickup Counter Info & Itemized Bill */}
        <div className="lg:col-span-5 space-y-6">
          {/* Delivery Partner OR Store Pickup Counter Card */}
          {isPickup ? (
            <div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full">
                  EXPRESS PICKUP COUNTER
                </span>
                <span className="text-2xl font-extrabold tracking-wider text-emerald-300">
                  Token: {activeOrder.pickup_token || 'PK-884'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold">{activeOrder.store_name}</h3>
                <p className="text-xs text-emerald-100 mt-1">{activeOrder.store_address}</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-3.5 text-xs space-y-1">
                <div>
                  <strong>Pickup Slot:</strong> {activeOrder.pickup_slot}
                </div>
                <div>
                  <strong>Instructions:</strong> Show Order #{activeOrder.order_number} or your WhatsApp message at Express Counter #2 to collect immediately.
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-900 text-white rounded-3xl p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-extrabold px-3 py-1 rounded-full">
                  LIVE DELIVERY PARTNER
                </span>
                <span className="text-xs font-bold text-emerald-300">GPS Active • Vaccinated</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold">
                    {activeOrder.delivery_partner?.name || 'Ramesh Kumar'}
                  </h3>
                  <p className="text-xs text-blue-200">
                    Vehicle: {activeOrder.delivery_partner?.vehicle || 'KA-03-JM-4421 (EV Scooter)'}
                  </p>
                </div>
                <a
                  href={`tel:${activeOrder.delivery_partner?.phone || '+919845077812'}`}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Rider</span>
                </a>
              </div>
              <div className="bg-white/10 rounded-2xl p-3.5 text-xs space-y-1">
                <div>
                  <strong>Delivering To:</strong> {activeOrder.delivery_address}
                </div>
                <div>
                  <strong>Dispatched From:</strong> {activeOrder.store_name}
                </div>
              </div>
            </div>
          )}

          {/* Itemized Pharmacy Invoice Card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Ordered Medicines ({activeOrder.items.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => window.print()}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                Print GST Invoice
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {activeOrder.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1.5 border-b border-gray-50"
                >
                  <div>
                    <span className="font-bold text-gray-900">
                      {item.quantity}x {item.name}
                    </span>
                    {item.prescription_required && (
                      <span className="ml-2 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">
                        Rx
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-gray-900">₹{item.total_price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Payment Method</span>
                <span className="font-semibold text-gray-800">{activeOrder.payment_method}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Charges</span>
                <span className="font-bold text-emerald-600">
                  {activeOrder.delivery_fee === 0 ? 'FREE (₹0)' : `₹${activeOrder.delivery_fee}`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
                <span className="font-extrabold text-sm text-gray-900">Total Amount</span>
                <span className="font-extrabold text-xl text-blue-600">
                  ₹{activeOrder.total_amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
