import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCheck2,
  Package,
  Boxes,
  Store,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Send,
  Truck,
  Printer,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminDashboard = () => {
  const {
    orders,
    prescriptions,
    products,
    categories,
    stores,
    whatsappMessages,
    verifyPrescriptionAdmin,
    advanceOrderStatus,
    updateProductStockAdmin,
    addNewProductAdmin,
    pushWhatsAppNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [selectedStoreInvFilter, setSelectedStoreInvFilter] = useState(1);
  const [rxNotesMap, setRxNotesMap] = useState({});

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    generic_name: '',
    brand: '',
    category_id: 1,
    manufacturer: '',
    pack_size: 'Strip of 15 Tablets',
    mrp: 120,
    selling_price: 98,
    prescription_required: true,
    initial_stock: 60
  });

  // WhatsApp Broadcast Form State
  const [waCampaign, setWaCampaign] = useState({
    toNumber: '+91 98765 43210',
    type: 'REFILL_REMINDER',
    title: 'Monthly Medicine Refill Reminder',
    content: `🔔 MediShop Hybrid Refill Alert\n\nNamaste Jyotiraditya! Your 30-day supply of Glycomet-500 SR & Telma 40 is due for refill in 3 days.\n\nReply REFILL on WhatsApp or order online for 30-min store pickup!`
  });

  // KPI Metrics
  const totalRevenue = orders.reduce((s, o) => s + Number(o.total_amount || 0), 0);
  const pendingRxList = prescriptions.filter(p => p.verification_status === 'Pending');
  const pickupOrdersCount = orders.filter(o => o.order_type === 'pickup').length;
  const deliveryOrdersCount = orders.filter(o => o.order_type === 'delivery').length;

  const lowStockItems = [];
  products.forEach(p => {
    p.inventory.forEach(inv => {
      if (inv.quantity <= 15) {
        const st = stores.find(s => Number(s.id) === Number(inv.store_id));
        lowStockItems.push({
          product: p,
          storeName: st ? st.store_name : `Store #${inv.store_id}`,
          quantity: inv.quantity,
          batch: inv.batch_number
        });
      }
    });
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProd.name.trim() || !newProd.generic_name.trim()) return;
    addNewProductAdmin(newProd);
    setNewProd({
      name: '',
      generic_name: '',
      brand: '',
      category_id: 1,
      manufacturer: '',
      pack_size: 'Strip of 15 Tablets',
      mrp: 120,
      selling_price: 98,
      prescription_required: true,
      initial_stock: 60
    });
  };

  const handleSendCampaign = (e) => {
    e.preventDefault();
    pushWhatsAppNotification({
      whatsapp_number: waCampaign.toNumber,
      message_type: waCampaign.type,
      title: waCampaign.title,
      message_content: waCampaign.content
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-0.5 rounded-full uppercase">
              Pharmacist &amp; Admin Control Center
            </span>
            <span className="text-xs text-emerald-400 font-semibold">
              • Chief Pharmacist: Dr. Ananya Rao (Reg #KA-44821)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            MediShop Hybrid Operations &amp; Verification Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Verify Schedule H prescriptions, manage hybrid delivery/pickup orders, update store-level inventory, and dispatch WhatsApp notifications.
          </p>
        </div>

        {/* Navigation Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            {
              id: 'prescriptions',
              label: `Rx Queue (${pendingRxList.length})`,
              icon: FileCheck2
            },
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'inventory', label: 'Products & Stock', icon: Boxes },
            { id: 'stores', label: 'Stores (5)', icon: Store },
            { id: 'whatsapp', label: 'WhatsApp Hub', icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
              <span className="text-xs font-extrabold uppercase text-gray-400">
                Today's Hybrid Orders
              </span>
              <div className="text-3xl font-extrabold text-gray-900 mt-1">{orders.length}</div>
              <p className="text-xs text-blue-600 font-semibold mt-1">
                🚚 {deliveryOrdersCount} Delivery • 🏪 {pickupOrdersCount} Store Pickup
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
              <span className="text-xs font-extrabold uppercase text-gray-400">
                Pending Rx Verification
              </span>
              <div className="text-3xl font-extrabold text-amber-600 mt-1">
                {pendingRxList.length}
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('prescriptions')}
                className="text-xs text-amber-700 font-bold underline mt-1"
              >
                Open Pharmacist Queue →
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
              <span className="text-xs font-extrabold uppercase text-gray-400">Total Revenue</span>
              <div className="text-3xl font-extrabold text-emerald-600 mt-1">
                ₹{totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 100% GST Invoice Compliant
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
              <span className="text-xs font-extrabold uppercase text-gray-400">
                Low Stock Alerts (&le;15)
              </span>
              <div className="text-3xl font-extrabold text-red-600 mt-1">
                {lowStockItems.length}
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className="text-xs text-red-600 font-bold underline mt-1"
              >
                View Store Batches →
              </button>
            </div>
          </div>

          {/* Pending Prescriptions Quick Action + Low Stock Alerts */}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-lg text-gray-900">
                  Recent Hybrid Orders (Live Action)
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Manage All Orders →
                </button>
              </div>
              <div className="space-y-3">
                {orders.map(o => (
                  <div
                    key={o.order_number}
                    className="p-4 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-gray-900">
                          #{o.order_number}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            o.order_type === 'pickup'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {o.order_type === 'pickup' ? '🏪 30m Pickup' : '🚚 Delivery'}
                        </span>
                        <span className="text-xs font-bold text-gray-700">
                          • ₹{o.total_amount}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {o.customer_name} (+91 {o.whatsapp_number}) • Status:{' '}
                        <strong className="text-blue-600">{o.order_status}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => advanceOrderStatus(o.order_number)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl"
                      >
                        Advance Status + WA
                      </button>
                      <Link
                        to={`/orders/${o.order_number}`}
                        className="bg-white border border-gray-300 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-xl"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h2 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Low Stock Store Alerts</span>
              </h2>
              <div className="space-y-2.5">
                {lowStockItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-red-50/70 border border-red-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <strong className="text-gray-900 block">{item.product.name}</strong>
                      <span className="text-gray-600">
                        {item.storeName.replace('MediShop Hybrid - ', '')} (Batch {item.batch})
                      </span>
                    </div>
                    <span className="bg-red-600 text-white font-extrabold px-2.5 py-1 rounded-full">
                      {item.quantity} left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRESCRIPTION VERIFICATION QUEUE */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-gray-900">
              Pharmacist Prescription Verification Queue
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Approving or rejecting a prescription automatically updates the linked order and dispatches a WhatsApp template message to the customer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {prescriptions.map(rx => (
              <div
                key={rx.id}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={rx.image_url}
                    alt="Rx"
                    className="w-full sm:w-36 h-48 object-contain bg-slate-50 rounded-2xl border border-gray-200 p-1 shrink-0"
                  />
                  <div className="space-y-2 text-xs flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-extrabold px-2.5 py-1 rounded-full ${
                          rx.verification_status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rx.verification_status === 'Rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rx.verification_status}
                      </span>
                      <span className="text-gray-400 font-bold">
                        Rx #{rx.id} {rx.order_id ? `• Order #${rx.order_id}` : ''}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-gray-900">{rx.doctor_name}</h3>
                    <p className="text-gray-600">
                      <strong>Patient:</strong> {rx.patient_name}
                    </p>
                    <p className="text-gray-600">
                      <strong>Clinic:</strong> {rx.hospital_name}
                    </p>
                    <p className="text-gray-500">
                      <strong>Source:</strong> {rx.upload_source} • <strong>Expiry:</strong>{' '}
                      {rx.expiry_date}
                    </p>
                    <input
                      type="text"
                      placeholder="Add pharmacist verification note..."
                      value={rxNotesMap[rx.id] ?? rx.pharmacist_notes}
                      onChange={(e) =>
                        setRxNotesMap({ ...rxNotesMap, [rx.id]: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs mt-1"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() =>
                      verifyPrescriptionAdmin(
                        rx.id,
                        'Approved',
                        rxNotesMap[rx.id] ||
                          'Verified Schedule H Rx. Approved by Dr. Ananya Rao.'
                      )
                    }
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve &amp; Send WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      verifyPrescriptionAdmin(
                        rx.id,
                        'Rejected',
                        rxNotesMap[rx.id] ||
                          'Doctor signature or date unclear. Please send clearer photo on WhatsApp.'
                      )
                    }
                    className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5 border border-red-200 transition"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold text-gray-900">
              All Hybrid Orders ({orders.length})
            </h2>
            <div className="flex gap-2">
              {['all', 'delivery', 'pickup'].map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setOrderStatusFilter(mode)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold capitalize ${
                    orderStatusFilter === mode
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-gray-700'
                  }`}
                >
                  {mode === 'all' ? 'All Orders' : mode === 'pickup' ? '🏪 Store Pickup' : '🚚 Home Delivery'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {orders
              .filter(o => orderStatusFilter === 'all' || o.order_type === orderStatusFilter)
              .map(order => (
                <div
                  key={order.order_number}
                  className="p-5 rounded-2xl border border-gray-200 bg-slate-50 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-extrabold text-base text-gray-900">
                        Order #{order.order_number}
                      </span>
                      <span
                        className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                          order.order_type === 'pickup'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.order_type === 'pickup' ? '🏪 Store Pickup' : '🚚 Home Delivery'}
                      </span>
                      <span className="text-xs font-extrabold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                        {order.order_status}
                      </span>
                    </div>

                    <div className="text-sm font-extrabold text-gray-900">
                      ₹{order.total_amount.toFixed(2)} • {order.payment_method}
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 grid sm:grid-cols-2 gap-2">
                    <div>
                      <strong>Customer:</strong> {order.customer_name} (WhatsApp: +91{' '}
                      {order.whatsapp_number})
                    </div>
                    <div>
                      <strong>Store Hub:</strong> {order.store_name}
                    </div>
                  </div>

                  {/* Quick Status Update Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-200">
                    <div className="flex flex-wrap gap-1.5">
                      {(order.order_type === 'pickup'
                        ? ['Prescription Verified', 'Packed at Store', 'Ready for Pickup', 'Picked Up']
                        : ['Prescription Verified', 'Packed at Store', 'Out for Delivery', 'Delivered']
                      ).map(st => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => advanceOrderStatus(order.order_number, st)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                            order.order_status === st
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500'
                          }`}
                        >
                          Set: {st}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="text-xs font-bold text-gray-600 hover:text-blue-600 flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Invoice
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCT & INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Store-Wise Stock Table */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold text-gray-900">
                Store Inventory &amp; Pricing Control
              </h2>
              <select
                value={selectedStoreInvFilter}
                onChange={(e) => setSelectedStoreInvFilter(Number(e.target.value))}
                className="px-3 py-2 bg-slate-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800"
              >
                {stores.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.store_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 uppercase">
                    <th className="py-2.5 pr-3">Medicine &amp; Salt</th>
                    <th className="py-2.5 px-2">Batch / Exp</th>
                    <th className="py-2.5 px-2">Price (₹)</th>
                    <th className="py-2.5 px-2">Store Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => {
                    const inv =
                      p.inventory.find(
                        i => Number(i.store_id) === Number(selectedStoreInvFilter)
                      ) || p.inventory[0];
                    return (
                      <tr key={p.id}>
                        <td className="py-3 pr-3">
                          <div className="font-bold text-gray-900">{p.name}</div>
                          <div className="text-[11px] text-gray-500">{p.generic_name}</div>
                        </td>
                        <td className="py-3 px-2 text-gray-600">
                          <div>{inv.batch_number}</div>
                          <div className="text-[10px] text-emerald-700">{inv.expiry_date}</div>
                        </td>
                        <td className="py-3 px-2 font-bold text-gray-900">
                          ₹{p.selling_price}{' '}
                          <span className="text-gray-400 line-through font-normal">
                            ₹{p.mrp}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={inv.quantity}
                              onChange={(e) =>
                                updateProductStockAdmin(
                                  p.id,
                                  selectedStoreInvFilter,
                                  Number(e.target.value)
                                )
                              }
                              className="w-20 px-2.5 py-1.5 border border-gray-300 rounded-lg font-extrabold text-gray-900"
                            />
                            <span className="text-[11px] text-gray-500">packs</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Add New Product Form */}
          <form
            onSubmit={handleAddProduct}
            className="lg:col-span-4 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-3.5"
          >
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Add New Medicine to Catalog</span>
            </h3>
            <input
              type="text"
              placeholder="Medicine Brand Name (e.g. Ecosprin 75) *"
              value={newProd.name}
              onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
              required
            />
            <input
              type="text"
              placeholder="Generic Salt Composition (e.g. Aspirin 75mg) *"
              value={newProd.generic_name}
              onChange={(e) => setNewProd({ ...newProd, generic_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
              required
            />
            <select
              value={newProd.category_id}
              onChange={(e) => setNewProd({ ...newProd, category_id: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Manufacturer (e.g. USV Pvt Ltd)"
              value={newProd.manufacturer}
              onChange={(e) => setNewProd({ ...newProd, manufacturer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
            />
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400">MRP (₹)</label>
                <input
                  type="number"
                  value={newProd.mrp}
                  onChange={(e) => setNewProd({ ...newProd, mrp: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  value={newProd.selling_price}
                  onChange={(e) =>
                    setNewProd({ ...newProd, selling_price: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={newProd.prescription_required}
                onChange={(e) =>
                  setNewProd({ ...newProd, prescription_required: e.target.checked })
                }
                className="accent-blue-600"
              />
              <span>Schedule H — Prescription Required</span>
            </label>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-sm transition"
            >
              Add Medicine to All 5 Stores
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: STORE MANAGEMENT */}
      {activeTab === 'stores' && (
        <div className="grid md:grid-cols-2 gap-5">
          {stores.map(st => (
            <div
              key={st.id}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-gray-900">{st.store_name}</h3>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">
                  Ready in {st.pickup_ready_mins}m
                </span>
              </div>
              <p className="text-gray-600">{st.address}</p>
              <p className="text-gray-700">
                <strong>Pharmacist:</strong> {st.pharmacist_name}
              </p>
              <p className="text-gray-700">
                <strong>Drug License:</strong> {st.drug_license}
              </p>
              <p className="text-gray-500">
                <strong>Timings:</strong> {st.opening_time} – {st.closing_time} •{' '}
                <strong>Phone:</strong> {st.phone}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: WHATSAPP CAMPAIGN & MESSAGE LOGS */}
      {activeTab === 'whatsapp' && (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <form
            onSubmit={handleSendCampaign}
            className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4"
          >
            <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>Send WhatsApp Notification / Refill Alert</span>
            </h2>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                Recipient WhatsApp Number
              </label>
              <input
                type="text"
                value={waCampaign.toNumber}
                onChange={(e) => setWaCampaign({ ...waCampaign, toNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                Template Type
              </label>
              <select
                value={waCampaign.type}
                onChange={(e) => setWaCampaign({ ...waCampaign, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-bold"
              >
                <option value="REFILL_REMINDER">Monthly Refill Reminder</option>
                <option value="READY_FOR_PICKUP">Order Ready for Store Pickup</option>
                <option value="PRESCRIPTION_VERIFIED">Prescription Verified</option>
                <option value="HEALTH_TIP">Seasonal Health Tip (Opt-In)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                Message Content
              </label>
              <textarea
                rows={5}
                value={waCampaign.content}
                onChange={(e) => setWaCampaign({ ...waCampaign, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch WhatsApp Message Now</span>
            </button>
          </form>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-gray-900">
              WhatsApp API Message Delivery Logs ({whatsappMessages.length})
            </h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {whatsappMessages.map(msg => (
                <div
                  key={msg.id}
                  className="bg-[#DCF8C6]/60 border border-emerald-300 rounded-2xl p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-emerald-950">
                      {msg.title} → {msg.whatsapp_number}
                    </span>
                    <span className="text-emerald-800 font-bold">{msg.delivery_status}</span>
                  </div>
                  <pre className="font-mono text-xs whitespace-pre-wrap bg-white p-2.5 rounded-xl border border-emerald-200 text-gray-800">
                    {msg.message_content}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
